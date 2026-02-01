# Scaling Strategies

Guide to handling growth in users and data.

## 1. Application Layer (Stateless)

### Horizontal Pod Autoscaling (HPA)
The API and Frontend layers are stateless. We use K8s HPA to scale pods based on CPU/Memory/Request count.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ciyex-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ciyex-api
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## 2. Database Layer (Stateful)

### Read Replicas
Offload heavy read operations (Reports, Dashboards) to Read Replicas.
Spring Boot routes `@Transactional(readOnly=true)` transactions to replicas.

### Partitioning
Large tables (Audit Logs, Observations) are partitioned by date or Tenant ID.

### Connection Pooling
Use **PgBouncer** ahead of Postgres to multiplex connections from hundreds of pods.

## 3. Caching Layer

- **Redis Cluster**: Scale Redis horizontally for session and data caching.
- **CDN (CloudFront)**: Offload static assets (JS, CSS, Images, Docs) to the edge.

## 4. Multi-Tenancy Scaling

### Database-per-Tenant vs Schema-per-Tenant
For massive organizations (Enterprise), we can move them to a dedicated Database Shard to isolate load.

## Load Testing Triggers
Trigger scaling events when:
- CPU > 70%
- Connection Pool usage > 80%
- API Latency p95 > 500ms
