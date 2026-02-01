# Performance Tuning

Guide to optimizing Ciyex EHR performance for scale.

## Database Optimization

### Indexing Strategies
The most effective way to improve query performance is proper indexing.

- **Foreign Keys**: Always index foreign key columns (e.g., `patient_id` on `appointments` table).
- **Search Fields**: Use GIN indexes for JSONB columns and `tsvector` for full-text search.
- **Composite Indexes**: For queries filtering by multiple columns (e.g., `organization_id` AND `status`).

```sql
-- GIN index for FHIR resources
CREATE INDEX idx_fhir_resource_content ON fhir_resources USING GIN (content);

-- Composite index for appointment queries
CREATE INDEX idx_appt_org_date ON appointments (organization_id, start_date);
```

### Connection Pooling
Tune HikariCP settings in `application.yml` based on your available CPU cores and load.

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20 # Roughly 2 * CPU cores
      minimum-idle: 5
      idle-timeout: 300000
```

## JVM Tuning

For production workloads, tune the specific JVM memory settings.

```bash
java -server -Xms4g -Xmx4g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+ParallelRefProcEnabled \
  -jar ciyex-api.jar
```

## Caching Strategy

### Application Caching (Caffeine)
Use local caffeine caching for reference data that rarely changes (e.g., specific configuration, simple lookups).

```java
@Cacheable("configurations")
public Configuration getConfig(String key) { ... }
```

### Distributed Caching (Redis)
For session management and shared cache across multiple instances, use Redis.

```yaml
spring:
  redis:
    host: redis-server
    port: 6379
```

## Frontend Optimization

### Next.js Optimization
- **Image Optimization**: Use `next/image` to serve properly sized images.
- **Route Prefetching**: Prefetch links visible in the viewport.
- **Bundle Analysis**: Use `@next/bundle-analyzer` to identify large dependencies.

### React.memo & useMemo
Prevent unnecessary re-renders of complex components (e.g., the Calendar or large Patient Lists).

```javascript
const PatientTable = React.memo(({ patients }) => {
  // Render expensive table
});
```

## Load Testing

Use **k6** or **JMeter** to simulate load before going to production.

```javascript
// k6 script example
import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '30s',
};

export default function () {
  http.get('http://api.ciyex.org/health');
}
```
