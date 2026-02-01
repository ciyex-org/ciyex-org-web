# Audit Logging

Comprehensive audit logging for ONC and HIPAA compliance.

## Requirement
Every access to Protected Health Information (PHI) must be logged.
- **Who**: User ID
- **What**: Resource accessed (e.g., Patient/123)
- **When**: Timestamp
- **Action**: Read/Write/Delete
- **Where**: Source IP

## Architecture

1. **Application Event**: Spring Boot publishes an `AuditLogEvent`.
2. **Async Listener**: Captures event to minimize latency.
3. **Persistence**:
   - **Hot Storage**: PostgreSQL `audit_logs` table (Recent access).
   - **Cold Storage**: JSON logs shipped to S3/CloudWatch (Long-term retention).

## Database Schema

```sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    org_id BIGINT,
    action VARCHAR(20),     -- READ, CREATE, UPDATE
    resource_type VARCHAR(50), -- PATIENT, ENCOUNTER
    resource_id VARCHAR(50),
    ip_address VARCHAR(45),
    timestamp TIMESTAMP
);
```

## Implementation

### Automatic Entity Listeners
Using Hibernate Envers or JPA EntityListeners.

```java
@EntityListeners(AuditListener.class)
public class Patient { ... }
```

### Manual Logging
For sensitive read operations (viewing a chart).

```java
auditService.log(
    currentUser,
    Action.READ,
    "Patient",
    patientId,
    "Viewed patient dashboard"
);
```

## Viewing Logs
Administrators can view audit logs via the **Compliance Dashboard**.
Logs are immutable and cannot be deleted by standard users.

## Retention Policy
- **Minimum**: 6 years (HIPAA requirement).
- **Archiving**: Logs > 1 year are moved to S3 Glacier.
