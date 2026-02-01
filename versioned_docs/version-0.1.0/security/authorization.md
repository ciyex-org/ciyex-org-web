# Authorization

Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) in Ciyex EHR.

## Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| `ROLE_ADMIN` | System Administrator | Full access to system config |
| `ROLE_PROVIDER` | Doctor/Nurse Practitioner | Clinical data write access |
| `ROLE_NURSE` | Nurse/Assistant | Clinical data read/limited write |
| `ROLE_STAFF` | Front Desk | Scheduling and Demographics only |
| `ROLE_PATIENT` | Patient | Own data only |

## Scope-Based Access

In addition to roles, we use Scopes (`scope`) to limit what a specific client app can do.
- `profile`: Read user profile
- `email`: Read email
- `fhir:read`: Read FHIR resources
- `fhir:write`: Write FHIR resources

## Implementation

### Method Security
We use Spring Security `@PreAuthorize` annotations.

```java
// Role check
@PreAuthorize("hasRole('PROVIDER')")
public void prescribeMedication() { ... }

// Permission check
@PreAuthorize("hasAuthority('SCOPE_fhir:write')")
public void createResource() { ... }

// Object-level security (ABAC)
@PostAuthorize("returnObject.patientId == authentication.name")
public LabResult getLabResult(Long id) { ... }
```

### Multi-Tenancy Isolation
Every database query is filtered by `organization_id`.
This is enforced via a Hibernate Filter or AOP Aspect to prevent cross-tenant data leaks.

```java
@Filter(name = "tenantFilter", condition = "organization_id = :tenantId")
```

## Policy Enforcement Point (PEP)
The API Gateway (or Ingress) acts as the first PEP, validating that a token is present.
The Application is the second PEP, validating permissions and data ownership.
