# Debugging Guide

Tips and techniques for troubleshooting Ciyex EHR.

## Backend Debugging

### IntelliJ IDEA
1. **Remote Debugging**:
   - Add JVM args: `-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005`
   - Connect IntelliJ Remote configuration to port `5005`.

### Logging
- Change log levels dynamically using Spring Boot Actuator (if enabled).
- `curl -X POST http://localhost:8080/actuator/loggers/com.ciyex -d '{"configuredLevel":"DEBUG"}'`

### Common Exceptions
- **LazyInitializationException**: You are accessing a lazy-loaded Hibernate collection outside a transaction. Add `@Transactional` to the service method.
- **DataIntegrityViolationException**: Check for duplicate keys or non-null constraints.

## Frontend Debugging

### React DevTools
- Inspect component hierarchy.
- View props and state.
- Profiler to check rendering performance.

### Chrome DevTools
- **Network Tab**: Check API payload and response headers.
- **Console**: Look for React warnings (e.g., missing keys).
- **Debugger**: using `debugger;` statement in code.

### Redux / Context
- If using Redux, use Redux DevTools to replay actions.
- For Context, use React DevTools to see provider values.

## Database Debugging

### Show SQL
Enable SQL logging in `application.yml`:

```yaml
spring:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

### Connection Leaks
Enable HikariCP leak detection.

```yaml
spring:
  datasource:
    hikari:
      leak-detection-threshold: 2000
```

## Container Debugging

### Inspect Container
```bash
docker exec -it ciyex-api /bin/sh
```

### View Logs
```bash
docker logs -f ciyex-api
```
