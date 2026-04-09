---
slug: deployment-on-k8s
title: "Deploying Ciyex on Kubernetes: A Production Guide"
authors: [dev_lead]
tags: [devops, kubernetes, deployment]
image: /img/blog/hero-kubernetes.svg
---

Healthcare software has unique deployment requirements. It must be highly available because clinics cannot afford downtime during patient visits. It must be secure because it handles protected health information. It must be auditable because regulators need to verify what is running and when it changed. Kubernetes, combined with GitOps practices, provides the foundation for meeting all of these requirements. This guide walks through how Ciyex is deployed in production using Kubernetes, Helm, ArgoCD, and supporting infrastructure.

<!-- truncate -->

## Architecture Overview

A production Ciyex deployment on Kubernetes consists of the following components:

- **ciyex-api**: The Spring Boot backend, running as a Deployment with multiple replicas
- **ehr-ui**: The React frontend, served as static files through an Nginx container
- **ciyex-hapi-fhir**: The HAPI FHIR R4 server with custom interceptors for multi-tenant partition enforcement
- **ciyex-codes**: The medical code reference service (ICD-10, CPT, HCPCS, LOINC, SNOMED)
- **marketplace**: The Ciyex Hub app catalog and subscription service
- **telehealth**: The Jitsi-based telehealth integration service
- **ciyex-files**: The Vaultik file storage service for patient documents
- **PostgreSQL**: StatefulSet with persistent volume claims for data durability
- **Keycloak**: Identity provider, running as a separate Deployment
- **Ingress Controller**: NGINX Ingress for TLS termination and routing

Each service runs in its own Deployment with defined resource requests and limits, health checks, and rolling update strategies.

## Namespace Organization

We use separate namespaces to isolate workloads:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ciyex-platform
  labels:
    app.kubernetes.io/part-of: ciyex
---
apiVersion: v1
kind: Namespace
metadata:
  name: ciyex-data
  labels:
    app.kubernetes.io/part-of: ciyex
---
apiVersion: v1
kind: Namespace
metadata:
  name: ciyex-monitoring
  labels:
    app.kubernetes.io/part-of: ciyex
```

Application services run in `ciyex-platform`, databases and stateful services in `ciyex-data`, and monitoring infrastructure in `ciyex-monitoring`. Network policies restrict cross-namespace communication to defined paths.

## Helm Charts

Ciyex provides official Helm charts for simplified deployment:

```bash
helm repo add ciyex https://charts.ciyex.org
helm repo update

# Install with default values
helm install ciyex-platform ciyex/ciyex-platform \
  --namespace ciyex-platform \
  --create-namespace

# Install with custom values
helm install ciyex-platform ciyex/ciyex-platform \
  --namespace ciyex-platform \
  --create-namespace \
  -f my-values.yaml
```

A typical `values.yaml` customization includes:

```yaml
ciyexApi:
  replicas: 3
  resources:
    requests:
      cpu: 500m
      memory: 1Gi
    limits:
      cpu: 2000m
      memory: 2Gi
  env:
    SPRING_PROFILES_ACTIVE: production
    FHIR_SERVER_URL: http://ciyex-hapi-fhir.ciyex-platform.svc.cluster.local:8080/fhir

postgresql:
  enabled: true
  auth:
    postgresPassword: "${POSTGRES_PASSWORD}"
  primary:
    persistence:
      size: 100Gi
      storageClass: ssd-encrypted

keycloak:
  enabled: true
  replicas: 2
  database:
    vendor: postgres
    hostname: postgresql.ciyex-data.svc.cluster.local

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: app.example-clinic.org
      paths:
        - path: /api
          service: ciyex-api
        - path: /
          service: ehr-ui
  tls:
    - secretName: ciyex-tls
      hosts:
        - app.example-clinic.org
```

## GitOps with ArgoCD

Ciyex uses **ArgoCD** for continuous deployment, following the GitOps pattern where the Git repository is the single source of truth for the desired cluster state.

### How It Works

1. A developer merges a pull request into the `main` branch
2. **GitHub Actions** builds the application, runs tests, creates a Docker image tagged with the commit SHA, and pushes it to the container registry
3. **ArgoCD Image Updater** monitors the container registry for new image tags matching a configured pattern
4. When a new tag is detected, ArgoCD Image Updater updates the image reference in the Git repository (or in the ArgoCD Application spec)
5. ArgoCD detects the change and reconciles the cluster state, performing a rolling update

No human runs `kubectl apply` or `kubectl set image` in production. Every deployment is traceable to a Git commit, reviewable in pull request history, and automatically rolled out.

### ArgoCD Application Definition

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ciyex-api-prod
  namespace: argocd
  annotations:
    argocd-image-updater.argoproj.io/image-list: api=ghcr.io/ciyex-org/ciyex-api
    argocd-image-updater.argoproj.io/api.update-strategy: semver
    argocd-image-updater.argoproj.io/api.allow-tags: regexp:^0\\.0\\.\\d+-alpha\\.\\d+$
spec:
  project: default
  source:
    repoURL: https://github.com/ciyex-org/ciyex-k8s-manifests
    targetRevision: main
    path: environments/prod/ciyex-api
  destination:
    server: https://kubernetes.default.svc
    namespace: ciyex-platform
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

The `argocd-image-updater` annotations tell ArgoCD which container images to watch and what tag pattern to accept. The `selfHeal: true` option ensures that any manual changes to the cluster (accidental `kubectl edit`, for instance) are automatically reverted to match the Git-defined state.

## Horizontal Pod Autoscaling

Clinic workloads are inherently variable. Morning hours see a surge of appointment check-ins and charting. Lunch breaks are quiet. Afternoon brings another wave. The HPA scales the API pods based on CPU utilization:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ciyex-api-hpa
  namespace: ciyex-platform
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ciyex-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Pods
          value: 1
          periodSeconds: 60
```

The `stabilizationWindowSeconds` prevents rapid scale-down that could cause service disruption. The system waits 5 minutes of sustained low utilization before removing a pod, ensuring that brief quiet periods do not trigger unnecessary scaling events.

## PostgreSQL with Persistent Volumes

PostgreSQL runs as a StatefulSet with persistent volume claims to ensure data durability across pod restarts and rescheduling:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql
  namespace: ciyex-data
spec:
  serviceName: postgresql
  replicas: 1
  template:
    spec:
      containers:
        - name: postgresql
          image: postgres:17
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: pgdata
              mountPath: /var/lib/postgresql/data
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgresql-credentials
                  key: password
  volumeClaimTemplates:
    - metadata:
        name: pgdata
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: ssd-encrypted
        resources:
          requests:
            storage: 100Gi
```

For production deployments requiring high availability, we recommend using a PostgreSQL operator (such as CloudNativePG or Zalando's postgres-operator) that handles automated failover, backup scheduling, and point-in-time recovery.

## TLS with cert-manager

TLS certificates are provisioned automatically using **cert-manager** with Let's Encrypt:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ops@ciyex.org
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
      - http01:
          ingress:
            class: nginx
```

When an Ingress resource references a TLS secret that does not yet exist, cert-manager automatically requests a certificate from Let's Encrypt, validates domain ownership via HTTP-01 challenge, and stores the certificate as a Kubernetes Secret. Certificates are renewed automatically before expiration.

## Monitoring with Prometheus and Grafana

Observability is critical for healthcare infrastructure. Ciyex exports metrics using Spring Boot Actuator's Micrometer integration, which Prometheus scrapes:

- **JVM metrics**: heap usage, garbage collection, thread counts
- **HTTP metrics**: request rates, response times (p50, p95, p99), error rates
- **Database metrics**: connection pool utilization, query times
- **Custom metrics**: FHIR operations per second, authentication failures, tenant context mismatches

Grafana dashboards provide real-time visibility into system health, and alerting rules notify the operations team of anomalies before they impact clinical users.

## Environment Separation

Ciyex maintains strict environment separation with dedicated Kubernetes clusters:

| Environment | Cluster | Purpose |
|---|---|---|
| Development | kube-dev | Feature development and integration testing |
| Staging | kube-stage | Pre-production validation and performance testing |
| Production | kube-prod | Live clinical workloads |

ArgoCD runs on the production cluster and manages deployments across all three environments. Each environment has its own set of ArgoCD Applications, its own configuration values, and its own database instances. There is no shared state between environments.

This separation ensures that a broken deployment in development cannot impact staging or production, and that test data never contaminates production databases.

## Getting Started

For organizations ready to deploy Ciyex on Kubernetes, the recommended path is:

1. Review the Helm chart values and customize for your environment
2. Set up a Kubernetes cluster (managed services like EKS, GKE, or AKS simplify operations)
3. Install cert-manager and an Ingress controller
4. Deploy using the Helm chart
5. Configure Keycloak with your organization's identity requirements
6. Set up ArgoCD for ongoing automated deployments

The Ciyex deployment documentation at [docs.ciyex.org/deployment](https://docs.ciyex.org/deployment) provides detailed instructions for each step, including cloud-provider-specific guidance and troubleshooting.
