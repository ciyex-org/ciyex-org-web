# Logging Guide

Centralized logging strategy for operations and debugging.

## Architecture

We use the **PLG Stack** (Prometheus, Loki, Grafana) or ELK (Elastic, Logstash, Kibana).

1. **App**: Outputs logs to `stdout` (JSON format).
2. **Collector**: Promtail (or Fluentd) reads container logs.
3. **Storage**: Loki stores logs efficiently.
4. **View**: Grafana for querying and dashboards.

## Log Format (JSON)

We use structured logging (LogstashJsonEncoder).

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "level": "INFO",
  "thread": "http-nio-8080-exec-1",
  "logger": "com.ciyex.service.PatientService",
  "message": "Patient created successfully",
  "context": {
    "traceId": "65b9e2...",
    "spanId": "a1b2...",
    "userId": "user-123",
    "orgId": "org-55"
  }
}
```

## Traceability
We use **OpenTelemetry** / **Micrometer Tracing** (formerly Sleuth).
- **Trace ID**: Unique ID per request. Configured to pass through to all downstream interactions (DB, external APIs).
- **MDC**: We inject `traceId`, `userId`, `ipAddress` into the Mapped Diagnostic Context (MDC) so they appear in every log line.

## Log Levels

- **ERROR**: System failures requiring immediate attention.
- **WARN**: Unexpected events but system continues (e.g., specific API failure).
- **INFO**: Milestones (Startup, Job completed).
- **DEBUG**: Developer info (SQL queries - verify enabled only in Dev).

## Configuration

**Loki (Helm Value)**:
```yaml
loki:
  auth_enabled: false
  commonConfig:
    replication_factor: 1
```

**Spring Boot**:
```yaml
logging:
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} - %msg%n" # Dev
    # Prod uses JSON appender
```
