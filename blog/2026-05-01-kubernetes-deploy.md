---
slug: deployment-on-k8s
title: "Deploying Ciyex on Kubernetes"
authors: [dev_lead]
tags: [devops, kubernetes, deployment]
---

Ready for production? Here is how to deploy Ciyex for high availability using Kubernetes.

<!-- truncate -->

## Architecture
Ciyex on K8s consists of:
*   **Ingress Controller**: NGINX handling SSL termination.
*   **ReplicaSets**: Multiple instances of the backend API for failover.
*   **StatefulSets**: Postgres database with persistent volume claims (PVC).

## Helm Charts
We evaluate our official [Helm Chart](https://github.com/ciyex-org/charts).

```bash
helm repo add ciyex https://charts.ciyex.org
helm install my-ehr ciyex/ciyex-platform
```

## Scaling
By default, the backend scales based on CPU usage. During peak clinic hours (8am - 5pm), HPA (Horizontal Pod Autoscaler) spins up new pods to handle the load.
