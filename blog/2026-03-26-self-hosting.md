---
slug: self-hosting-guide
title: "Self-Hosting Ciyex: Own Your Healthcare Infrastructure"
authors: [dev_lead]
tags: [deployment, guide, devops]
image: /img/blog/hero-self-hosting.svg
---

Self-hosting your EHR is not just a technical choice. It is a statement about data sovereignty, compliance control, and long-term independence. When you self-host Ciyex, you own your infrastructure, your data, and your destiny. No vendor can raise your prices, discontinue your product, or hold your patient data hostage. This guide walks you through everything you need to get Ciyex running on your own infrastructure, from a Docker Compose development setup to a production Kubernetes deployment.

<!-- truncate -->

## Why Self-Hosting Matters

Before diving into the technical details, it is worth understanding why organizations choose to self-host their healthcare software.

**Data Sovereignty**

When you self-host, patient data never leaves your control. It resides on servers you own or lease, in data centers you choose, under policies you define. For organizations subject to state-level data residency requirements, serving tribal nations with data sovereignty concerns, or operating in international contexts with strict data localization laws, self-hosting is often the only compliant option.

**Compliance Control**

HIPAA compliance requires that you understand and control how PHI is stored, accessed, and transmitted. When you self-host, you configure every security control directly. You know exactly which ports are open, which encryption algorithms are in use, and who has access to the underlying infrastructure. There is no reliance on a vendor's assurances.

**Cost Predictability**

Cloud-hosted EHR services charge recurring per-provider fees that increase over time. Self-hosting converts that recurring cost into a one-time infrastructure investment plus predictable operational costs. For organizations with access to IT staff (even part-time), the long-term economics strongly favor self-hosting.

**Resilience**

A self-hosted deployment continues to function during internet outages. For rural clinics and organizations in areas with unreliable connectivity, this resilience is not a luxury. It is a clinical necessity.

## Hardware Requirements

Ciyex is designed to run efficiently on modest hardware. Here are the recommended specifications for different deployment sizes:

### Small Practice (1-5 providers)

| Component | Minimum | Recommended |
|---|---|---|
| CPU | 4 cores | 8 cores |
| RAM | 8 GB | 16 GB |
| Storage | 100 GB SSD | 250 GB SSD |
| Network | 10 Mbps | 100 Mbps |

### Medium Practice (5-20 providers)

| Component | Minimum | Recommended |
|---|---|---|
| CPU | 8 cores | 16 cores |
| RAM | 16 GB | 32 GB |
| Storage | 250 GB SSD | 500 GB SSD |
| Network | 100 Mbps | 1 Gbps |

### Large Organization (20+ providers)

For larger deployments, a Kubernetes cluster with multiple nodes is recommended. See the production Kubernetes section below.

## Docker Compose Quickstart

The fastest way to get Ciyex running is with Docker Compose. This approach is suitable for development, evaluation, and small production deployments.

### Prerequisites

- Docker Engine 24.0 or later
- Docker Compose v2.20 or later
- At least 8 GB of available RAM
- 50 GB of free disk space

### Step 1: Clone the Repository

```bash
git clone https://github.com/ciyex-org/ciyex.git
cd ciyex
```

### Step 2: Configure Environment Variables

Create a `.env` file with your deployment-specific configuration:

```bash
# .env file for Ciyex deployment

# Database
POSTGRES_USER=ciyex
POSTGRES_PASSWORD=your-secure-password-here
POSTGRES_DB=ciyex_db

# Keycloak (Identity Provider)
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=your-keycloak-admin-password
KC_DB_PASSWORD=your-keycloak-db-password

# Application
SPRING_PROFILES_ACTIVE=production
JWT_ISSUER_URI=https://your-domain.com/realms/ciyex

# FHIR Server
HAPI_FHIR_SERVER_ADDRESS=http://hapi-fhir:8080/fhir

# Encryption key for sensitive data at rest
DATA_ENCRYPTION_KEY=your-256-bit-encryption-key

# External URL (how users will access the system)
CIYEX_BASE_URL=https://ehr.your-clinic.org
```

### Step 3: Launch the Stack

```bash
docker compose up -d
```

This starts all required services:

- **ciyex-api**: The main application server (Spring Boot)
- **ciyex-ui**: The frontend application (React/Next.js)
- **hapi-fhir**: The FHIR server for clinical data storage
- **postgres**: The relational database
- **keycloak**: The identity and access management server
- **config-server**: The centralized configuration service

### Step 4: Verify the Deployment

```bash
# Check that all containers are running
docker compose ps

# Expected output:
# NAME          STATUS    PORTS
# ciyex-api     Up        0.0.0.0:8080->8080/tcp
# ciyex-ui      Up        0.0.0.0:3000->3000/tcp
# hapi-fhir     Up        0.0.0.0:8090->8080/tcp
# postgres      Up        0.0.0.0:5432->5432/tcp
# keycloak      Up        0.0.0.0:8443->8443/tcp
# config-server Up        0.0.0.0:8888->8888/tcp

# Check application health
curl -s http://localhost:8080/actuator/health | jq .
# Expected: {"status":"UP"}
```

### Step 5: Initial Setup

Navigate to `https://your-domain.com` in your browser. The first-time setup wizard walks you through:

1. Creating your organization profile
2. Setting up the first administrator account
3. Configuring basic clinical settings
4. Importing provider information

## Production Kubernetes Deployment

For larger organizations or those requiring high availability, Kubernetes provides the orchestration, scaling, and resilience needed for production healthcare workloads.

### Cluster Requirements

A production Ciyex deployment requires a Kubernetes cluster with:

- **Minimum 3 worker nodes** for high availability
- **Each node**: 4 CPU cores, 16 GB RAM minimum
- **Persistent storage**: A StorageClass that supports ReadWriteOnce volumes (e.g., local-path, longhorn, or cloud provider volumes)
- **Ingress controller**: NGINX Ingress or Traefik for TLS termination
- **cert-manager**: For automated TLS certificate management

### Namespace Setup

```bash
# Create a dedicated namespace for Ciyex
kubectl create namespace ciyex

# Create secrets for sensitive configuration
kubectl create secret generic ciyex-db-credentials \
  --namespace ciyex \
  --from-literal=postgres-password='your-secure-password' \
  --from-literal=postgres-user='ciyex'

kubectl create secret generic ciyex-keycloak-credentials \
  --namespace ciyex \
  --from-literal=admin-password='your-keycloak-password' \
  --from-literal=db-password='your-kc-db-password'
```

### Core Services Deployment

```yaml
# ciyex-api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ciyex-api
  namespace: ciyex
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ciyex-api
  template:
    metadata:
      labels:
        app: ciyex-api
    spec:
      containers:
        - name: ciyex-api
          image: ghcr.io/ciyex-org/ciyex-api:latest
          ports:
            - containerPort: 8080
          env:
            - name: SPRING_PROFILES_ACTIVE
              value: "production"
            - name: SPRING_DATASOURCE_URL
              value: "jdbc:postgresql://postgres:5432/ciyex_db"
            - name: SPRING_DATASOURCE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: ciyex-db-credentials
                  key: postgres-password
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "2Gi"
              cpu: "2000m"
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ciyex-api
  namespace: ciyex
spec:
  selector:
    app: ciyex-api
  ports:
    - port: 8080
      targetPort: 8080
```

### Ingress with TLS

```yaml
# ciyex-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ciyex-ingress
  namespace: ciyex
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
    - hosts:
        - ehr.your-clinic.org
      secretName: ciyex-tls
  rules:
    - host: ehr.your-clinic.org
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: ciyex-api
                port:
                  number: 8080
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ciyex-ui
                port:
                  number: 3000
```

## Backup Strategies

Protecting patient data requires a comprehensive backup strategy. Healthcare data loss is not just an inconvenience; it can be a patient safety issue and a HIPAA violation.

### Database Backups

```bash
# Automated daily PostgreSQL backup script
# /opt/ciyex/scripts/backup-db.sh

BACKUP_DIR="/opt/ciyex/backups/db"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup
pg_dump -h localhost -U ciyex -F c \
  -f "${BACKUP_DIR}/ciyex_db_${TIMESTAMP}.dump" \
  ciyex_db

# Encrypt the backup
gpg --symmetric --cipher-algo AES256 \
  --batch --passphrase-file /opt/ciyex/secrets/backup-key \
  "${BACKUP_DIR}/ciyex_db_${TIMESTAMP}.dump"

# Remove unencrypted backup
rm "${BACKUP_DIR}/ciyex_db_${TIMESTAMP}.dump"

# Clean up backups older than retention period
find "${BACKUP_DIR}" -name "*.dump.gpg" \
  -mtime +${RETENTION_DAYS} -delete

echo "Backup completed: ciyex_db_${TIMESTAMP}.dump.gpg"
```

Schedule this script with cron for automated daily backups:

```bash
# Run backup daily at 2:00 AM
0 2 * * * /opt/ciyex/scripts/backup-db.sh >> /var/log/ciyex-backup.log 2>&1
```

### FHIR Server Backups

The HAPI FHIR server stores clinical data in its own PostgreSQL database. Back it up using the same approach, ensuring that both databases are backed up in coordination to maintain consistency.

### Off-Site Backup Replication

For disaster recovery, replicate backups to an off-site location:

```bash
# Sync encrypted backups to off-site storage
# Using rclone for provider-agnostic cloud storage sync
rclone sync /opt/ciyex/backups/ remote:ciyex-backups/ \
  --transfers 4 \
  --checkers 8 \
  --log-file /var/log/rclone-backup.log
```

## Monitoring

Production deployments require monitoring to detect and respond to issues before they affect clinical operations.

### Health Checks

Ciyex exposes Spring Boot Actuator health endpoints that provide detailed system status:

```bash
# Overall health status
curl -s https://ehr.your-clinic.org/api/actuator/health | jq .

# Database connectivity
curl -s https://ehr.your-clinic.org/api/actuator/health/db | jq .

# Disk space
curl -s https://ehr.your-clinic.org/api/actuator/health/diskSpace | jq .
```

### Prometheus Metrics

Ciyex exports metrics in Prometheus format for integration with standard monitoring stacks:

```yaml
# prometheus-scrape-config.yaml
scrape_configs:
  - job_name: "ciyex-api"
    metrics_path: "/actuator/prometheus"
    static_configs:
      - targets: ["ciyex-api:8080"]
    scrape_interval: 15s
```

Key metrics to monitor:

- **JVM memory usage**: Ensure heap utilization stays below 80%
- **Database connection pool**: Monitor active and idle connections
- **HTTP request latency**: Alert on P95 latency above 2 seconds
- **Error rate**: Alert on HTTP 5xx rate above 1%

### Alerting

Configure alerts for critical conditions:

- Database connection failures
- Disk usage above 85%
- Application health check failures
- TLS certificate expiration within 14 days
- Backup job failures

## Update Process

Keeping Ciyex up to date ensures access to security patches, bug fixes, and new features.

### Docker Compose Updates

```bash
# Pull the latest images
docker compose pull

# Apply the update with zero-downtime restart
docker compose up -d --no-deps --build ciyex-api
docker compose up -d --no-deps --build ciyex-ui

# Verify the update
docker compose ps
curl -s http://localhost:8080/actuator/info | jq .version
```

### Kubernetes Updates

For Kubernetes deployments, update the image tag in your deployment manifest and apply:

```bash
# Update the deployment with the new image tag
kubectl set image deployment/ciyex-api \
  ciyex-api=ghcr.io/ciyex-org/ciyex-api:0.5.0 \
  --namespace ciyex

# Monitor the rollout
kubectl rollout status deployment/ciyex-api \
  --namespace ciyex

# If issues are detected, roll back immediately
kubectl rollout undo deployment/ciyex-api \
  --namespace ciyex
```

Flyway database migrations run automatically on application startup, so schema updates are applied as part of the deployment process. Always back up the database before applying updates that include migrations.

## Security Hardening Checklist

Before going live with a self-hosted deployment, verify the following:

- [ ] All default passwords have been changed
- [ ] TLS is enabled on all external endpoints
- [ ] Database ports are not exposed externally
- [ ] Firewall rules restrict access to necessary ports only
- [ ] Audit logging is enabled and logs are shipped to secure storage
- [ ] Automated backups are running and verified
- [ ] MFA is enabled for all administrator accounts
- [ ] Operating system security updates are applied
- [ ] Container images are scanned for vulnerabilities
- [ ] Network policies restrict pod-to-pod communication in Kubernetes

## Join the Self-Hosting Community

Self-hosting is not a solitary endeavor. The Ciyex community includes system administrators, DevOps engineers, and IT directors at healthcare organizations who share knowledge, troubleshoot issues, and collaborate on infrastructure improvements.

Join the conversation on [GitHub Discussions](https://github.com/ciyex-org/ciyex/discussions) or explore the [HIPAA Compliance Guide](/blog/hipaa-compliance-guide) for detailed security configuration guidance.

Your infrastructure. Your data. Your control.
