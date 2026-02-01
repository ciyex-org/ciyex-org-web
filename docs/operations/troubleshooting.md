# Troubleshooting Guide

Common issues and solutions for Ciyex EHR deployment and operation.

## Quick Diagnostics

### Health Check

```bash
# Check application health
curl http://localhost:8080/actuator/health

# Expected response
{
  "status": "UP",
  "components": {
    "db": {"status": "UP"},
    "diskSpace": {"status": "UP"},
    "ping": {"status": "UP"}
  }
}
```

### Check Logs

```bash
# Backend logs
kubectl logs -f deployment/ciyex-api -n ciyex-prod

# Frontend logs
kubectl logs -f deployment/ciyex-ui -n ciyex-prod

# Database logs
kubectl logs -f statefulset/postgres -n ciyex-prod
```

## Application Issues

### Application Won't Start

**Symptoms**:
- Pod in CrashLoopBackOff
- Application exits immediately
- Health check fails

**Common Causes**:

1. **Database Connection Failed**
   ```bash
   # Check error
   kubectl logs deployment/ciyex-api | grep -i "connection"
   
   # Verify database is running
   kubectl get pods -l app=postgres
   
   # Test connection
   kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "SELECT 1"
   ```

2. **Missing Environment Variables**
   ```bash
   # Check pod environment
   kubectl describe pod ciyex-api-xxx | grep -A 20 "Environment"
   
   # Verify secrets exist
   kubectl get secrets
   ```

3. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :8080
   
   # Kill the process
   kill -9 <PID>
   ```

**Solutions**:
```bash
# Fix database connection
kubectl edit secret postgres-credentials
# Update password

# Restart application
kubectl rollout restart deployment/ciyex-api
```

### Slow Performance

**Symptoms**:
- API responses take >5 seconds
- UI feels sluggish
- High CPU/memory usage

**Diagnostics**:
```bash
# Check resource usage
kubectl top pods

# Check database performance
kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "
  SELECT pid, now() - pg_stat_activity.query_start AS duration, query
  FROM pg_stat_activity
  WHERE state = 'active'
  ORDER BY duration DESC;
"

# Check slow queries
kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "
  SELECT calls, total_time, mean_time, query
  FROM pg_stat_statements
  ORDER BY mean_time DESC
  LIMIT 10;
"
```

**Solutions**:

1. **Scale Up Pods**
   ```bash
   kubectl scale deployment ciyex-api --replicas=4
   ```

2. **Add Database Indexes**
   ```sql
   CREATE INDEX idx_patients_lastname ON patients(last_name);
   CREATE INDEX idx_appointments_date ON appointments(appointment_date);
   ```

3. **Enable Caching**
   ```yaml
   # application.yml
   spring:
     cache:
       type: caffeine
       caffeine:
         spec: maximumSize=1000,expireAfterWrite=10m
   ```

4. **Increase Resources**
   ```yaml
   resources:
     requests:
       memory: "2Gi"
       cpu: "1000m"
     limits:
       memory: "4Gi"
       cpu: "2000m"
   ```

### Memory Leaks

**Symptoms**:
- Memory usage continuously increases
- OutOfMemoryError
- Pod restarts frequently

**Diagnostics**:
```bash
# Check memory usage over time
kubectl top pod ciyex-api-xxx --containers

# Get heap dump
kubectl exec ciyex-api-xxx -- jcmd 1 GC.heap_dump /tmp/heap.hprof

# Copy heap dump
kubectl cp ciyex-api-xxx:/tmp/heap.hprof ./heap.hprof

# Analyze with VisualVM or Eclipse MAT
```

**Solutions**:
```yaml
# Adjust JVM settings
env:
- name: JAVA_OPTS
  value: "-Xms1g -Xmx2g -XX:+UseG1GC -XX:MaxGCPauseMillis=200"
```

## Database Issues

### Connection Pool Exhausted

**Error**:
```
HikariPool-1 - Connection is not available, request timed out after 30000ms
```

**Solutions**:
```yaml
# Increase pool size
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
```

### Database Locks

**Symptoms**:
- Queries hanging
- Timeouts on write operations

**Diagnostics**:
```sql
-- Check for locks
SELECT 
  pid,
  usename,
  pg_blocking_pids(pid) as blocked_by,
  query as blocked_query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;

-- Kill blocking query
SELECT pg_terminate_backend(pid);
```

### Database Full

**Error**:
```
ERROR: could not extend file: No space left on device
```

**Solutions**:
```bash
# Check disk usage
df -h

# Clean up old data
kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "
  DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '90 days';
  VACUUM FULL;
"

# Expand volume
kubectl edit pvc postgres-data
# Increase storage size
```

## Authentication Issues

### Cannot Login

**Symptoms**:
- "Invalid credentials" error
- Login button doesn't work
- Redirects to error page

**Diagnostics**:
```bash
# Check Keycloak connectivity
curl https://aran-stg.zpoa.com/realms/master/.well-known/openid-configuration

# Check backend logs
kubectl logs deployment/ciyex-api | grep -i "auth"

# Test login API
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password"}'
```

**Solutions**:

1. **Keycloak Down**
   ```bash
   # Check Keycloak status
   curl https://aran-stg.zpoa.com/health
   
   # Restart Keycloak
   kubectl rollout restart deployment/keycloak
   ```

2. **Wrong Credentials**
   ```bash
   # Reset password in Keycloak admin console
   # Or create test user
   kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "
     INSERT INTO users (email, password, role)
     VALUES ('test@example.com', 
             '\$2a\$10\$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
             'PROVIDER');
   "
   ```

3. **Token Expired**
   ```javascript
   // Frontend: Implement token refresh
   if (response.status === 401) {
     await refreshToken();
     // Retry request
   }
   ```

### JWT Token Invalid

**Error**:
```
JWT signature does not match locally computed signature
```

**Solutions**:
```bash
# Verify JWT secret matches
kubectl get secret jwt-secret -o jsonpath='{.data.secret}' | base64 -d

# Update secret if needed
kubectl create secret generic jwt-secret \
  --from-literal=secret=new-secret \
  --dry-run=client -o yaml | kubectl apply -f -

# Restart application
kubectl rollout restart deployment/ciyex-api
```

## Network Issues

### Cannot Access Application

**Symptoms**:
- Connection timeout
- DNS resolution fails
- 502 Bad Gateway

**Diagnostics**:
```bash
# Check ingress
kubectl get ingress -n ciyex-prod

# Check ingress controller
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# Test from inside cluster
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
  curl http://ciyex-api:8080/actuator/health

# Check DNS
nslookup app.example.com
```

**Solutions**:

1. **Ingress Not Working**
   ```bash
   # Check ingress configuration
   kubectl describe ingress ciyex-ingress
   
   # Verify SSL certificate
   kubectl get certificate
   
   # Check cert-manager logs
   kubectl logs -n cert-manager deployment/cert-manager
   ```

2. **Service Not Found**
   ```bash
   # Check service exists
   kubectl get svc ciyex-api
   
   # Check endpoints
   kubectl get endpoints ciyex-api
   
   # If no endpoints, check pod labels
   kubectl get pods --show-labels
   ```

3. **Firewall Blocking**
   ```bash
   # Check firewall rules
   iptables -L -n
   
   # Allow HTTPS
   iptables -A INPUT -p tcp --dport 443 -j ACCEPT
   ```

### CORS Errors

**Error**:
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions**:
```java
// Backend: Configure CORS
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("https://app.example.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

## Kubernetes Issues

### Pod Not Starting

**Symptoms**:
- Pod stuck in Pending
- ImagePullBackOff
- CrashLoopBackOff

**Diagnostics**:
```bash
# Check pod status
kubectl describe pod ciyex-api-xxx

# Check events
kubectl get events --sort-by='.lastTimestamp'

# Check logs
kubectl logs ciyex-api-xxx --previous
```

**Solutions**:

1. **ImagePullBackOff**
   ```bash
   # Check image exists
   docker pull ghcr.io/ciyex-org/ciyex:latest
   
   # Verify registry credentials
   kubectl get secret regcred
   
   # Create registry secret
   kubectl create secret docker-registry regcred \
     --docker-server=ghcr.io \
     --docker-username=username \
     --docker-password=token
   ```

2. **Insufficient Resources**
   ```bash
   # Check node resources
   kubectl top nodes
   
   # Reduce resource requests
   kubectl edit deployment ciyex-api
   ```

3. **Volume Mount Failed**
   ```bash
   # Check PVC status
   kubectl get pvc
   
   # Check storage class
   kubectl get storageclass
   ```

### Service Unavailable

**Error**:
```
503 Service Temporarily Unavailable
```

**Diagnostics**:
```bash
# Check pod readiness
kubectl get pods -o wide

# Check readiness probe
kubectl describe pod ciyex-api-xxx | grep -A 10 "Readiness"

# Test readiness endpoint
kubectl exec ciyex-api-xxx -- curl localhost:8080/actuator/health/readiness
```

**Solutions**:
```yaml
# Adjust readiness probe
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 60  # Increase delay
  periodSeconds: 10
  failureThreshold: 5  # Increase threshold
```

## Data Issues

### Data Not Appearing

**Symptoms**:
- Empty lists
- Missing records
- Incorrect data

**Diagnostics**:
```bash
# Check database
kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "
  SELECT COUNT(*) FROM patients;
  SELECT COUNT(*) FROM appointments;
"

# Check schema
kubectl exec -it postgres-0 -- psql -U ciyex -d ciyexdb -c "
  SELECT current_setting('search_path');
"

# Check API response
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/patients
```

**Solutions**:

1. **Wrong Schema**
   ```yaml
   # Verify schema configuration
   env:
   - name: CIYEX_SCHEMA_NAME
     value: practice_1
   ```

2. **Missing Migrations**
   ```bash
   # Run Flyway migrations
   kubectl exec ciyex-api-xxx -- \
     java -jar app.jar --spring.flyway.enabled=true
   ```

### Data Corruption

**Symptoms**:
- Invalid data in database
- Constraint violations
- Foreign key errors

**Solutions**:
```bash
# Restore from backup
kubectl exec -it postgres-0 -- pg_restore \
  -U ciyex -d ciyexdb /backups/backup-2024-10-15.dump

# Or restore specific table
kubectl exec -it postgres-0 -- pg_restore \
  -U ciyex -d ciyexdb -t patients /backups/backup.dump
```

## Monitoring & Alerts

### No Metrics

**Symptoms**:
- Grafana shows no data
- Prometheus targets down

**Diagnostics**:
```bash
# Check Prometheus targets
kubectl port-forward -n monitoring svc/prometheus 9090:9090
# Open http://localhost:9090/targets

# Check metrics endpoint
curl http://localhost:8080/actuator/prometheus
```

**Solutions**:
```yaml
# Add Prometheus annotations
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "8080"
    prometheus.io/path: "/actuator/prometheus"
```

## Getting Help

### Collect Diagnostic Information

```bash
#!/bin/bash
# collect-diagnostics.sh

mkdir -p diagnostics
cd diagnostics

# Collect pod information
kubectl get pods -n ciyex-prod -o wide > pods.txt
kubectl describe pods -n ciyex-prod > pods-describe.txt

# Collect logs
kubectl logs -n ciyex-prod deployment/ciyex-api --tail=1000 > api-logs.txt
kubectl logs -n ciyex-prod deployment/ciyex-ui --tail=1000 > ui-logs.txt

# Collect events
kubectl get events -n ciyex-prod --sort-by='.lastTimestamp' > events.txt

# Collect configuration
kubectl get configmap -n ciyex-prod -o yaml > configmaps.yaml
kubectl get ingress -n ciyex-prod -o yaml > ingress.yaml

# Create archive
cd ..
tar -czf diagnostics-$(date +%Y%m%d-%H%M%S).tar.gz diagnostics/
```

### Support Channels

- **GitHub Issues**: https://github.com/ciyex-org/ciyex/issues
- **Discord**: https://discord.gg/ciyex
- **Email**: support@ciyex.org
- **Documentation**: https://ciyex.org/docs

## Next Steps

- [Monitoring](monitoring.md) - Set up monitoring
- [Backup & Restore](backup.md) - Backup procedures
- [Performance Tuning](performance.md) - Optimize performance
- [Security Best Practices](../security/best-practices.md) - Security guidelines
