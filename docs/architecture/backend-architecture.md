# Backend Architecture

Deep dive into the ciyex-api Spring Boot backend service — the core of the Ciyex EHR platform.

## Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Spring Boot | 4.0.1 |
| **Language** | Java | 21 |
| **Build Tool** | Gradle | Latest |
| **Database** | PostgreSQL | 17.7 |
| **ORM** | Spring Data JPA + Hibernate | 7.x |
| **Migrations** | Flyway | Latest |
| **Authentication** | Spring Security + OAuth2 Resource Server | 6.x |
| **Configuration** | Spring Cloud Config Server + Vault | 2025.1.1 |
| **FHIR** | HAPI FHIR Client | 8.2.1 |
| **Caching** | Caffeine | 3.2.2 |
| **PDF** | OpenPDF + OpenHTML2PDF | Latest |
| **AI** | Azure OpenAI SDK | 1.0.0-beta.16 |
| **Storage** | AWS S3 SDK | 2.32.26 |
| **Payments** | Stripe SDK | 24.18.0 |

## Package Structure

```
org.ciyex.ehr/
├── config/               # Spring Boot configuration
│   ├── SecurityConfig    # OAuth2/JWT + route authorization
│   ├── CorsConfig        # CORS settings
│   ├── WebConfig         # Interceptor registration
│   ├── S3Configuration   # AWS S3 client
│   └── WebSocketConfig   # STOMP WebSocket
│
├── controller/           # 52 REST controllers
│   ├── PatientController             # /api/patients
│   ├── EncounterController           # /api/{patientId}/encounters
│   ├── ProviderController            # /api/providers
│   ├── ScheduleController            # Scheduling endpoints
│   ├── PatientBillingController      # /api/patient-billing/{patientId}
│   ├── InvoiceController             # Invoice management
│   ├── AllClaimsController           # /api/all-claims
│   ├── EligibilityController         # /api/eligibility
│   ├── CodeController                # /api/codes
│   ├── DocumentController            # Document management
│   ├── AiController                  # AI endpoints
│   ├── TelehealthController          # Telehealth integration
│   ├── UserController                # /api/users
│   ├── NotificationController        # /api/notifications
│   ├── AuthController                # Authentication endpoints
│   └── portal/                       # Patient-facing controllers
│       ├── PortalAuthController      # /api/portal/auth
│       ├── PortalPatientController   # /api/portal/patient
│       └── PortalApprovalController  # /api/portal/approvals
│
├── fhir/                 # Generic FHIR integration
│   ├── GenericFhirResourceController # /api/fhir-resource/{tabKey}
│   ├── GenericFhirResourceService    # FHIR CRUD business logic
│   ├── FhirPathMapper               # Bidirectional form ↔ FHIR mapping
│   ├── FhirClientService            # HAPI FHIR client with partitions
│   └── FhirClientConfig             # FHIR client configuration
│
├── marketplace/          # App marketplace integration
│   ├── entity/
│   │   ├── AppInstallation           # Installed apps per org
│   │   ├── AppUsageEvent             # Usage tracking events
│   │   ├── AppUsageDaily             # Daily usage aggregates
│   │   └── AppLaunchLog              # HIPAA audit logs
│   ├── service/
│   │   ├── AppInstallationService    # App lifecycle management
│   │   ├── SmartLaunchService        # SMART on FHIR launching
│   │   ├── CdsHooksService           # CDS Hooks orchestration
│   │   ├── AppUsageService           # Usage analytics
│   │   └── KeycloakSmartClientService # Dynamic OAuth2 client registration
│   ├── controller/
│   │   ├── AppInstallationController # /api/app-installations
│   │   ├── SmartLaunchController     # /api/smart-launch
│   │   ├── SmartConfigurationController # /.well-known/smart-configuration
│   │   ├── CdsHooksController        # /api/cds-hooks
│   │   ├── AppContextController      # /api/app-context
│   │   ├── AppUsageController        # /api/app-usage
│   │   └── InternalWebhookController # /api/internal (HMAC verified)
│   └── dto/                          # Request/Response DTOs
│
├── tabconfig/            # Configuration-driven UI
│   ├── entity/
│   │   ├── TabFieldConfig            # FHIR field mappings per tab
│   │   ├── TabConfig                 # Legacy tab layout config
│   │   ├── CustomTab                 # Org-specific custom tabs
│   │   ├── PracticeType              # Practice type definitions
│   │   └── Specialty                 # Medical specialties
│   ├── service/
│   │   ├── TabFieldConfigService     # Tab field CRUD + resolution
│   │   └── SpecialtyService          # Specialty management
│   ├── controller/
│   │   ├── TabFieldConfigController  # Tab field config API
│   │   └── SpecialtyController       # Specialty API
│   └── repository/                   # Data access layer
│
├── menu/                 # Dynamic navigation system
│   ├── entity/
│   │   ├── Menu                      # Menu container (ehr-sidebar, etc.)
│   │   ├── MenuItem                  # Individual menu entries
│   │   └── MenuOrgOverride           # Per-org menu customizations
│   ├── service/
│   │   └── MenuService               # Menu resolution with org overrides
│   └── controller/
│       └── MenuController            # Menu API
│
├── eligibility/          # Insurance eligibility verification
│   ├── entity/EligibilityTransaction # Eligibility check records
│   ├── service/EligibilityService    # Eligibility business logic
│   ├── controller/EligibilityController
│   └── edi/                          # EDI processing utilities
│
├── interceptor/          # Request interceptors
│   ├── RequestContextInterceptor     # Multi-tenancy context setup
│   ├── FhirTenantInterceptor        # FHIR partition tagging
│   └── SessionTimeoutInterceptor     # Session management
│
├── security/
│   └── KeycloakJwtAuthenticationConverter  # JWT → Spring Security roles
│
├── service/              # Core business services
│   ├── PatientService                # Patient CRUD
│   ├── EncounterService              # Encounter management
│   ├── ProviderService               # Provider management
│   ├── ScheduleService               # Scheduling
│   ├── AppointmentService            # Appointments
│   ├── DocumentService               # Document storage
│   ├── PatientInvoiceService         # Invoicing
│   ├── PatientClaimService           # Claims
│   ├── EligibilityService            # Eligibility checks
│   ├── CodeService                   # Code lookups
│   ├── NotificationService           # Notifications
│   ├── ai/                           # AI integration
│   └── portal/                       # Portal services
│
├── dto/                  # Data transfer objects
│   └── integration/
│       └── RequestContext            # ThreadLocal tenant context
│
├── client/               # External service clients
│   ├── CommServiceClient             # ciyex-comm integration
│   └── TelehealthServiceClient       # Telehealth integration
│
├── exception/
│   └── GlobalExceptionHandler        # Standard error responses
│
├── aspect/
│   └── TenantSchemaAspect            # Tenant schema switching
│
├── mapper/               # Data mapping utilities
├── util/                 # Utilities (EncryptionUtil, SqlIdentifier, etc.)
└── enums/                # PaymentMethod, PortalStatus
```

## Critical Architecture Patterns

### 1. Generic FHIR Resource Pattern

The most important architectural decision: **ALL clinical resources go through a single generic controller** — no custom API endpoints per resource type.

```
         ┌──────────────────────────────┐
         │  GenericFhirResourceController│
         │  /api/fhir-resource/{tabKey}  │
         └──────────┬───────────────────┘
                    │
         ┌──────────▼───────────────────┐
         │  GenericFhirResourceService   │
         │  Resolves TabFieldConfig      │
         └──────────┬───────────────────┘
                    │
         ┌──────────▼───────────────────┐
         │     FhirPathMapper            │
         │  Form data ↔ FHIR resources  │
         └──────────┬───────────────────┘
                    │
         ┌──────────▼───────────────────┐
         │     FhirClientService         │
         │  HAPI FHIR R4 client          │
         │  Partitioned by org_alias     │
         └──────────────────────────────┘
```

**Endpoints**:

```java
// Patient-scoped (chart tabs)
GET    /api/fhir-resource/{tabKey}/patient/{patientId}
GET    /api/fhir-resource/{tabKey}/patient/{patientId}/{resourceId}
POST   /api/fhir-resource/{tabKey}/patient/{patientId}
PUT    /api/fhir-resource/{tabKey}/patient/{patientId}/{resourceId}
DELETE /api/fhir-resource/{tabKey}/patient/{patientId}/{resourceId}

// Organization-scoped (settings pages)
GET    /api/fhir-resource/{tabKey}
POST   /api/fhir-resource/{tabKey}
PUT    /api/fhir-resource/{tabKey}/{resourceId}
DELETE /api/fhir-resource/{tabKey}/{resourceId}
```

**Adding a new resource type** requires only a database INSERT — no Java code:

```sql
INSERT INTO tab_field_config (tab_key, label, fhir_resources, field_config, ...) VALUES (
  'allergies',
  'Allergies',
  '[{"resourceType": "AllergyIntolerance", "searchParams": "patient={patientId}"}]',
  '{"substance": {"label": "Substance", "type": "text", "fhirMapping": {"resource": "AllergyIntolerance", "path": "code.text"}}}'
);
```

### 2. FhirPathMapper — Bidirectional Form ↔ FHIR Mapping

The `FhirPathMapper` translates between flat form data (key-value maps) and HAPI FHIR R4 resources:

**Supported path patterns**:

| Pattern | Example | Description |
|---------|---------|-------------|
| Simple | `status` | Direct field access |
| Nested | `name[0].given[0]` | Nested object with index |
| Coded | `code.coding[0].code` | CodeableConcept |
| Extension | `extension[url=http://...].valueString` | FHIR extensions |
| Where-filter | `telecom.where(system='phone').value` | Conditional access |
| Reference | `subject.reference` | Resource references |
| Quantity | `valueQuantity.value` | With unit support |

**Field mapping example** (from TabFieldConfig):

```json
{
  "weight": {
    "label": "Weight",
    "type": "decimal",
    "fhirMapping": {
      "resource": "Observation",
      "path": "component.where(code.coding.code='29463-7').valueQuantity.value",
      "unit": "kg",
      "loincCode": "29463-7"
    }
  }
}
```

### 3. Multi-Tenancy via RequestContext

```java
// RequestContext (ThreadLocal per request)
public class RequestContext {
    private static final ThreadLocal<RequestContext> context = new ThreadLocal<>();
    private String authToken;
    private String orgName;       // Organization alias
    private boolean superAdmin;   // Can override org via header
}
```

**Resolution flow**:
1. JWT `organization` claim → primary org source
2. Super admins can override via `X-Org-Alias` header
3. Non-super-admins locked to their JWT org
4. ThreadLocal cleared in `afterCompletion()` to prevent leaks

**Usage in services**:
```java
String orgId = RequestContext.get().getOrgName();
List<AppInstallation> apps = repo.findByOrgIdAndStatus(orgId, "active");
```

### 4. Configuration-Driven UI (TabFieldConfig)

The **tab_field_config** table drives the entire UI form/tab rendering:

```
┌─────────────────────────────────────────────────────┐
│                  tab_field_config                     │
├─────────────┬───────────────────────────────────────┤
│ tab_key     │ "providers"                            │
│ org_id      │ "*" (global) or "specific-org"        │
│ practice_type│ "*" (all) or "dental"                │
│ fhirResources│ [{"resourceType": "Practitioner"}]   │
│ fieldConfig │ {"npi": {...}, "specialty": {...}}     │
│ label       │ "Providers"                            │
│ icon        │ "UserCog"                              │
│ category    │ "Settings"                             │
│ position    │ 10                                     │
└─────────────┴───────────────────────────────────────┘
```

**Resolution priority**: Org-specific config > Practice-type-specific > Global default

### 5. Dynamic Menu System

```
Menu (code='ehr-sidebar')
  ├── MenuItem (label='Dashboard', icon='LayoutDashboard', screenSlug='/dashboard')
  ├── MenuItem (label='Patients', icon='Users', screenSlug='/patients')
  ├── MenuItem (label='Appointments', icon='Calendar', screenSlug='/appointments')
  ├── MenuItem (label='Settings', icon='Settings', screenSlug='/settings')
  │     └── [children loaded dynamically from tab_field_config]
  └── MenuItem (label='Ciyex Hub', icon='Store', screenSlug='/hub')
```

**Org customization**: `MenuOrgOverride` can hide or modify menu items per org without changing the global menu.

### 6. API Response Pattern

All endpoints return a standardized `ApiResponse<T>` wrapper:

```java
// Success
{
  "success": true,
  "message": "Patients retrieved successfully",
  "data": [ ... ]
}

// Error
{
  "success": false,
  "message": "Patient not found",
  "data": null
}
```

Controller pattern:
```java
@RestController
@RequestMapping("/api/example")
@RequiredArgsConstructor
public class ExampleController {
    private final ExampleService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ExampleDto>>> list() {
        String orgId = RequestContext.get().getOrgName();
        var data = service.getAll(orgId);
        return ResponseEntity.ok(ApiResponse.ok("Retrieved", data));
    }
}
```

## Database Migrations

Flyway manages schema evolution with **53 versioned migrations** (V1–V53):

| Range | Focus |
|-------|-------|
| V1–V6 | Menu and tab configuration foundation |
| V7–V10 | Multi-tenancy and practice-type support |
| V11–V20 | UI restructuring and FHIR mapping support |
| V21–V30 | Settings, providers, field configurations |
| V31–V45 | Encounter configs, insurance, demographics |
| V46–V53 | Marketplace: app installations, SMART on FHIR, CDS Hooks, usage tracking |

## Marketplace Integration

### SMART on FHIR Support

- **Discovery**: `GET /api/public/.well-known/smart-configuration`
- **Launch**: `POST /api/smart-launch` — creates launch context with patient/encounter
- **Client Registration**: Dynamic Keycloak client creation per app installation

### CDS Hooks Support

- **Discovery**: `GET /api/cds-hooks/services` — lists all CDS services from installed apps
- **Invocation**: `POST /api/cds-hooks/invoke` — parallel invocation of matching services
- **Hook Types**: `patient-view`, `order-sign`, `order-select`

### Internal Webhooks

- **Endpoint**: `POST /api/internal/marketplace-webhook`
- **Security**: HMAC-SHA256 signature in `X-Marketplace-Signature` header
- **Events**: `subscription.created` → auto-install, `subscription.cancelled` → auto-uninstall

## External Service Integration

| Service | Client | Purpose |
|---------|--------|---------|
| **ciyex-codes** | REST client | Medical code lookups |
| **ciyex-comm** | `CommServiceClient` | Email, SMS, notifications |
| **Jitsi** | `TelehealthServiceClient` | Video consultations |
| **Stripe** | Stripe SDK | Payment processing |
| **AWS S3** | AWS SDK | Document storage |
| **Azure OpenAI** | Azure SDK | AI-powered features |

## Next Steps

- [Frontend Architecture](frontend-architecture.md) — Next.js patterns and plugin system
- [FHIR Integration](fhir-integration.md) — FhirPathMapper and GenericFhirResourceController deep dive
- [Deployment Models](deployment-models.md) — Compare deployment strategies
