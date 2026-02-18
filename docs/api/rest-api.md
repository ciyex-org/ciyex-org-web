# REST API Reference

Complete reference for the Ciyex EHR REST API across all microservices.

## Overview

Ciyex EHR exposes REST APIs across three backend services. All APIs use JSON and require JWT authentication (except public endpoints).

| Service | Base URL | Purpose |
|---------|----------|---------|
| **ciyex-api** | `http://localhost:8080` | Core EHR — patients, encounters, scheduling, billing, FHIR |
| **ciyex-marketplace** | `http://localhost:8081` | App marketplace — catalog, subscriptions, developer portal |
| **ciyex-codes** | `http://localhost:8084` | Medical codes — ICD-10, CPT, HCPCS, CDT, SNOMED, LOINC |

## Authentication

### OAuth2 with Keycloak (PKCE)

The primary authentication flow uses OAuth2 PKCE via Keycloak:

```
Browser → Keycloak (PKCE challenge) → Auth Code → /api/auth/keycloak-callback → JWT
```

### Required Headers

```http
Authorization: Bearer {jwt_token}
X-Org-Alias: {organization_alias}
```

The `X-Org-Alias` header identifies the current organization for multi-tenant scoping. It's automatically injected by the frontend's `fetchWithAuth` utility.

### Auth Endpoints

```http
# Exchange Keycloak auth code for JWT
POST /api/auth/keycloak-callback
Content-Type: application/json
{"code": "auth_code", "codeVerifier": "pkce_verifier", "redirectUri": "..."}

# Refresh access token
POST /api/auth/refresh

# Health check
GET /api/auth/health
```

## Response Format

All responses use the `ApiResponse<T>` wrapper:

```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... }
}
```

Error responses:
```json
{
  "status": "error",
  "message": "Error description",
  "data": null
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request — invalid parameters |
| 401 | Unauthorized — missing/invalid token |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found |
| 409 | Conflict — duplicate resource |
| 422 | Unprocessable Entity — validation error |
| 500 | Internal Server Error |

## Pagination

List endpoints support Spring Data pagination:

```http
GET /api/patients?page=0&size=20&sort=lastName,asc
```

Response includes pagination metadata:
```json
{
  "data": {
    "content": [...],
    "pageable": { "pageNumber": 0, "pageSize": 20 },
    "totalElements": 150,
    "totalPages": 8,
    "last": false,
    "first": true
  }
}
```

## Authorization Rules

```
Public (permitAll):
  /api/auth/**              Authentication endpoints
  /api/public/**            Public resources
  /api/portal/auth/**       Patient portal login
  /api/portal/approvals/**  Patient approval workflows
  /api/internal/**          Service-to-service webhooks (HMAC verified)
  /actuator/**              Health checks

Role-Based:
  /api/admin/**             ADMIN only
  /api/provider/**          PROVIDER or ADMIN
  /api/portal/**            PATIENT, PROVIDER, or ADMIN

Authenticated:
  /api/app-installations/** Any authenticated user
  /api/smart-launch/**      Any authenticated user
  /api/cds-hooks/**         Any authenticated user
  Everything else           Any authenticated user
```

---

## ciyex-api Endpoints

### Patients

```http
GET    /api/patients                              # List patients (pageable)
GET    /api/patients/count                        # Get patient count
GET    /api/patients/{id}                         # Get patient by ID
GET    /api/patients/search?q={query}             # Search patients
POST   /api/patients                              # Create patient
PUT    /api/patients/{id}                         # Update patient
DELETE /api/patients/{id}                         # Delete patient
```

### Encounters

```http
GET    /api/{patientId}/encounters                # List encounters for patient
GET    /api/{patientId}/encounters/{id}           # Get encounter by ID
POST   /api/{patientId}/encounters                # Create encounter
PUT    /api/{patientId}/encounters/{id}           # Update encounter
DELETE /api/{patientId}/encounters/{id}           # Delete encounter
POST   /api/{patientId}/encounters/{id}/sign      # Sign encounter
POST   /api/{patientId}/encounters/{id}/unsign    # Unsign encounter
POST   /api/{patientId}/encounters/{id}/incomplete # Mark incomplete
GET    /api/encounters                            # List all encounters (org-wide)
GET    /api/encounters/report/encounterAll        # Encounter report data
```

### Encounter Codes & Diagnoses

```http
GET    /api/codes/{patientId}                              # All codes for patient
GET    /api/codes/{patientId}/{encounterId}                # Codes for encounter
GET    /api/codes/{patientId}/{encounterId}/{id}           # Get code by ID
POST   /api/codes/{patientId}/{encounterId}                # Create code
PUT    /api/codes/{patientId}/{encounterId}/{id}           # Update code
DELETE /api/codes/{patientId}/{encounterId}/{id}           # Delete code
POST   /api/codes/{patientId}/{encounterId}/{id}/esign     # E-sign code
GET    /api/codes/{patientId}/{encounterId}/{id}/print     # Print code PDF
```

### Providers

```http
GET    /api/providers                             # List providers
GET    /api/providers/count                       # Provider count
GET    /api/providers/{id}                        # Get provider by ID
POST   /api/providers                             # Create provider
PUT    /api/providers/{id}                        # Update provider
PUT    /api/providers/{id}/status                 # Update provider status
POST   /api/providers/{id}/reset-password         # Reset password
DELETE /api/providers/{id}                        # Delete provider
```

### Scheduling

```http
GET    /api/schedules                             # List schedules
GET    /api/schedules/{id}                        # Get schedule
POST   /api/schedules                             # Create schedule
PUT    /api/schedules/{id}                        # Update schedule
DELETE /api/schedules/{id}                        # Delete schedule
```

### Practices

```http
GET    /api/practices                             # List practices
GET    /api/practices/count                       # Practice count
GET    /api/practices/search?name={name}          # Search practices
GET    /api/practices/{id}                        # Get practice
GET    /api/practices/{id}/practice-settings      # Practice settings
GET    /api/practices/{id}/regional-settings      # Regional settings
POST   /api/practices                             # Create practice
PUT    /api/practices/{id}                        # Update practice
PUT    /api/practices/{id}/practice-settings      # Update practice settings
PUT    /api/practices/{id}/regional-settings      # Update regional settings
DELETE /api/practices/{id}                        # Delete practice
```

### Insurance & Coverage

```http
GET    /api/coverages                             # Search all coverages
GET    /api/coverages/{patientId}                 # Coverage for patient
GET    /api/coverages/{patientId}/{coverageId}    # Specific coverage item
POST   /api/coverages                             # Create coverage
PUT    /api/coverages/{patientId}                 # Update patient coverage
PUT    /api/coverages/{patientId}/{coverageId}    # Update specific coverage
DELETE /api/coverages/{patientId}                 # Delete patient coverage
DELETE /api/coverages/{patientId}/{coverageId}    # Delete specific coverage
```

### Billing & Invoices

```http
GET    /api/billing/invoices/{patientId}                         # Invoices for patient
GET    /api/billing/invoices/{patientId}/{encounterId}           # Invoices for encounter
GET    /api/billing/invoices/{patientId}/{encounterId}/{id}      # Get invoice
POST   /api/billing/invoices/{patientId}/{encounterId}           # Create invoice
PUT    /api/billing/invoices/{patientId}/{encounterId}/{id}      # Update invoice
DELETE /api/billing/invoices/{patientId}/{encounterId}/{id}      # Delete invoice
```

### Claims

```http
GET    /api/all-claims                            # List all claims
GET    /api/all-claims/patient-search             # Search patients for claims
GET    /api/all-claims/patient/{patientId}/claims # Claims for patient
GET    /api/all-claims/{claimId}/line-details     # Claim line details
PUT    /api/all-claims/{claimId}/status           # Change claim status
POST   /api/all-claims/{claimId}/void-recreate    # Void and recreate
POST   /api/all-claims/{claimId}/sends            # Send to insurance
PUT    /api/all-claims/{claimId}/convert-type     # Convert claim type
```

### Eligibility

```http
POST   /api/eligibility/check/{patientId}         # Check insurance eligibility
```

### Generic FHIR Resources

The core of the data layer — handles ALL FHIR resource types via configuration:

```http
# Patient-scoped (chart tabs)
GET    /api/fhir-resource/{tabKey}/patient/{patientId}                  # List resources
GET    /api/fhir-resource/{tabKey}/patient/{patientId}/{resourceId}     # Get resource
POST   /api/fhir-resource/{tabKey}/patient/{patientId}                  # Create resource
PUT    /api/fhir-resource/{tabKey}/patient/{patientId}/{resourceId}     # Update resource
DELETE /api/fhir-resource/{tabKey}/patient/{patientId}/{resourceId}     # Delete resource

# Non-patient-scoped (settings pages)
GET    /api/fhir-resource/{tabKey}                                      # List resources
GET    /api/fhir-resource/{tabKey}/{resourceId}                         # Get resource
POST   /api/fhir-resource/{tabKey}                                      # Create resource
PUT    /api/fhir-resource/{tabKey}/{resourceId}                         # Update resource
DELETE /api/fhir-resource/{tabKey}/{resourceId}                         # Delete resource
```

Tab keys include: `demographics`, `vitals`, `allergies`, `medications`, `immunizations`, `encounters`, `problem-list`, `procedures`, `lab-results`, `insurance`, `documents`, `appointments`, `referrals`, `billing`, `providers`, `facilities`, `services`, and more.

See [FHIR Integration](../architecture/fhir-integration.md) for complete details.

### Tab & Field Configuration

```http
GET    /api/tab-field-config/tabs                 # List all tab keys
GET    /api/tab-field-config/{tabKey}             # Get config for tab
GET    /api/tab-field-config/all                  # List all configs
GET    /api/tab-field-config/layout               # Get tab layout
PUT    /api/tab-field-config/{tabKey}             # Save org-specific override
PUT    /api/tab-field-config/layout               # Save org tab layout
DELETE /api/tab-field-config/{tabKey}             # Reset tab to defaults
DELETE /api/tab-field-config/layout               # Reset layout to defaults
```

### Tab Configuration (Practice Types)

```http
GET    /api/tab-config/practice-types             # List practice types
GET    /api/tab-config/practice-types/{code}      # Get practice type
POST   /api/tab-config/practice-types             # Create practice type
PUT    /api/tab-config/practice-types/{code}      # Update practice type
DELETE /api/tab-config/practice-types/{code}      # Delete practice type
GET    /api/tab-config/effective                  # Get effective config
PUT    /api/tab-config/org                        # Save org config
DELETE /api/tab-config/org                        # Delete org config
GET    /api/tab-config/custom-tabs                # List custom tabs
POST   /api/tab-config/custom-tabs                # Create custom tab
PUT    /api/tab-config/custom-tabs/{id}           # Update custom tab
DELETE /api/tab-config/custom-tabs/{id}           # Delete custom tab
```

### Dynamic Menus

```http
GET    /api/menus/{code}                          # Get menu with org overrides
GET    /api/menus/{code}/has-custom               # Check for customizations
GET    /api/menus/{code}/overrides                # Get org overrides
POST   /api/menus/{code}/items/{itemId}/hide      # Hide menu item
DELETE /api/menus/{code}/items/{itemId}/hide       # Unhide menu item
PUT    /api/menus/{code}/items/{itemId}/modify     # Modify menu item
POST   /api/menus/{code}/custom-items             # Add custom item
PUT    /api/menus/{code}/reorder                  # Reorder items
DELETE /api/menus/{code}/overrides                # Reset all overrides
POST   /api/menus/{code}/reset                    # Reset to defaults
```

### Org Configuration

```http
GET    /api/orgConfig                             # Get all org configs
GET    /api/orgConfig/map                         # Get configs as flat map
POST   /api/orgConfig                             # Create/update configs
POST   /api/orgConfig/json                        # Create/update (JSON)
PUT    /api/orgConfig                             # Update configs
DELETE /api/orgConfig/{key}                       # Delete config
```

### Documents

```http
GET    /api/documents/upload                      # List documents
GET    /api/documents/upload/patient/{patientId}  # Documents for patient
POST   /api/documents/upload                      # Upload document (multipart)
GET    /api/documents/upload/{id}/download        # Download document
DELETE /api/documents/upload/{id}                 # Delete document
```

### Notifications

```http
POST   /api/notifications/sms                     # Send SMS
POST   /api/notifications/email                   # Send email
POST   /api/notifications/both                    # Send SMS + email
POST   /api/notifications/patient/{id}            # Notify patient
```

### Specialties

```http
GET    /api/specialties                           # List specialties
GET    /api/specialties/{code}                    # Get specialty
POST   /api/specialties                           # Create specialty
PUT    /api/specialties/{code}                    # Update specialty
DELETE /api/specialties/{code}                    # Delete specialty
```

### Inventory

```http
GET    /api/orders                                # List orders (pageable)
GET    /api/orders/list                           # List all orders
GET    /api/orders/pending/count                  # Pending order count
GET    /api/orders/{id}                           # Get order
POST   /api/orders                                # Create order
PUT    /api/orders/{id}                           # Update order
PUT    /api/orders/{orderId}/receive              # Mark received
DELETE /api/orders/{id}                           # Delete order
```

### App Installations (Marketplace Integration)

```http
GET    /api/app-installations                     # List installed apps
GET    /api/app-installations/{appSlug}           # Get installation details
GET    /api/app-installations/{appSlug}/installed  # Check if installed
POST   /api/app-installations                     # Install app
POST   /api/app-installations/{appSlug}/launch    # Log app launch
PUT    /api/app-installations/{appSlug}/config    # Update app config
DELETE /api/app-installations/{appSlug}           # Uninstall app
```

### SMART on FHIR

```http
GET    /api/smart-launch/metadata                 # SMART configuration
POST   /api/smart-launch/{appSlug}                # Generate launch context
```

### CDS Hooks

```http
GET    /api/cds-hooks/cds-services                # Discovery endpoint
POST   /api/cds-hooks/{hookId}                    # Invoke CDS hook
```

### Session & Multi-Tenancy

```http
POST   /api/session/keep-alive                    # Keep session alive
GET    /api/tenants/accessible                    # Get accessible tenants
```

### User Management

```http
PUT    /api/users/email/{email}/profile           # Update user profile
PUT    /api/users/user/address                    # Update user address
POST   /api/users/change-password                 # Change password
```

### Patient Portal

```http
POST   /api/portal/auth/login                     # Portal login
POST   /api/portal/auth/register                  # Portal registration
GET    /api/portal/patient                        # Get portal patient
GET    /api/portal/demographics                   # Get demographics
PUT    /api/portal/demographics                   # Update demographics
GET    /api/portal/approvals                      # Get approvals
POST   /api/portal/approvals/{id}/approve         # Approve request
GET    /api/portal/documents                      # Get documents
GET    /api/portal/list-options                    # Get list options
```

### Medical Codes Proxy

```http
GET    /api/codes-proxy/{system}/search?q={query} # Search codes by system
GET    /api/codes-proxy/{system}/{code}           # Get specific code
```

### Internal Webhooks

```http
POST   /api/internal/marketplace-webhook          # Marketplace subscription events
```

Validated via HMAC-SHA256 signature in `X-Marketplace-Signature` header.

---

## ciyex-marketplace Endpoints

Base URL: `http://localhost:8081`

### App Catalog

```http
GET    /api/v1/apps                               # Browse all apps
GET    /api/v1/apps/{slug}                        # Get app details
GET    /api/v1/apps/{slug}/versions               # App versions
GET    /api/v1/apps/featured                      # Featured apps
GET    /api/v1/apps/categories                    # App categories
GET    /api/v1/apps/{slug}/reviews                # App reviews
POST   /api/v1/apps/{slug}/reviews                # Submit review
```

### Subscriptions

```http
GET    /api/v1/subscriptions                      # List subscriptions
POST   /api/v1/subscriptions                      # Create subscription
PUT    /api/v1/subscriptions/{id}                 # Update subscription
POST   /api/v1/subscriptions/{id}/cancel          # Cancel subscription
POST   /api/v1/subscriptions/{id}/pause           # Pause subscription
```

### Developer Portal

```http
GET    /api/v1/developer/apps                     # List developer's apps
POST   /api/v1/developer/apps                     # Submit new app
PUT    /api/v1/developer/apps/{slug}              # Update app
GET    /api/v1/developer/analytics                # App analytics
POST   /api/v1/developer/register                 # Register as developer
GET    /api/v1/developer/credentials              # Get API credentials
POST   /api/v1/developer/credentials              # Create API key
```

### Vendor Webhooks

```http
GET    /api/v1/webhooks                           # List webhook configs
POST   /api/v1/webhooks                           # Register webhook
PUT    /api/v1/webhooks/{id}                      # Update webhook
DELETE /api/v1/webhooks/{id}                      # Delete webhook
GET    /api/v1/webhooks/{id}/deliveries           # Delivery logs
```

### Stripe Integration

```http
POST   /api/v1/stripe/connect                     # Stripe Connect onboarding
GET    /api/v1/stripe/connect/status              # Connection status
POST   /api/v1/stripe/webhooks                    # Stripe webhook handler
```

### Admin

```http
GET    /api/v1/admin/submissions                  # Pending app submissions
PUT    /api/v1/admin/submissions/{id}/approve     # Approve submission
PUT    /api/v1/admin/submissions/{id}/reject      # Reject submission
GET    /api/v1/admin/analytics                    # Platform analytics
```

---

## ciyex-codes Endpoints

Base URL: `http://localhost:8084`

### Medical Codes

Code search endpoints are **public** (no auth required for GET):

```http
GET    /api/codes/{system}                        # List codes by system
GET    /api/codes/{system}/{code}                 # Get specific code
GET    /api/codes/{system}/search?q={query}       # Search within system
GET    /api/codes/search?q={query}                # Search across all systems
```

Supported systems: `icd10`, `cpt`, `hcpcs`, `cdt`, `snomed`, `loinc`, `ndc`

### Fee Schedules

```http
GET    /api/codes/fee-schedules                   # List fee schedules
GET    /api/codes/fee-schedules/{id}              # Get fee schedule
GET    /api/codes/fee-schedules/lookup/{cptCode}  # Look up fee for CPT
GET    /api/codes/fee-schedules/payer/{payerId}   # Fees by payer
POST   /api/codes/fee-schedules                   # Create fee schedule
PUT    /api/codes/fee-schedules/{id}              # Update fee schedule
DELETE /api/codes/fee-schedules/{id}              # Delete fee schedule
```

### Org Settings

```http
GET    /api/codes/settings                        # Get org code settings
PUT    /api/codes/settings                        # Update settings (CPT enabled, etc.)
```

### NCCI Edits

```http
GET    /api/codes/ncci/check?code1={}&code2={}    # Check NCCI PTP edit pair
GET    /api/codes/ncci/mue/{cptCode}              # Get MUE values
```

### Validation

```http
POST   /api/codes/validate                        # Validate code set
```

---

## Code Examples

### TypeScript (EHR-UI fetchWithAuth)

```typescript
import { fetchWithAuth } from '@/utils/fetchWithAuth';

// List patients
const response = await fetchWithAuth('/api/patients?page=0&size=20');
const data = await response.json();

// Create a FHIR resource (vitals)
const vitals = await fetchWithAuth('/api/fhir-resource/vitals/patient/123', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    weightKg: '75',
    bpSystolic: '120',
    bpDiastolic: '80'
  })
});

// Search medical codes (no auth needed)
const codes = await fetch('http://localhost:8084/api/codes/icd10/search?q=diabetes');
```

### cURL

```bash
# Get patients (with auth)
curl -X GET http://localhost:8080/api/patients \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Org-Alias: sunrise-family-medicine"

# Create FHIR resource
curl -X POST http://localhost:8080/api/fhir-resource/demographics/patient/123 \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Org-Alias: sunrise-family-medicine" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","dateOfBirth":"1985-06-15"}'

# Search ICD-10 codes (public)
curl http://localhost:8084/api/codes/icd10/search?q=hypertension

# Browse marketplace apps
curl http://localhost:8081/api/v1/apps
```

### Python

```python
import requests

BASE_URL = "http://localhost:8080"
HEADERS = {
    "Authorization": f"Bearer {token}",
    "X-Org-Alias": "sunrise-family-medicine"
}

# List patients
patients = requests.get(f"{BASE_URL}/api/patients", headers=HEADERS).json()

# Create encounter
encounter = requests.post(
    f"{BASE_URL}/api/123/encounters",
    headers={**HEADERS, "Content-Type": "application/json"},
    json={"type": "office-visit", "status": "in-progress"}
).json()
```

## Next Steps

- [FHIR Integration](../architecture/fhir-integration.md) — Generic FHIR resource pattern
- [Authentication](authentication-api.md) — Detailed auth flows
- [Webhooks](webhooks.md) — Event subscriptions
- [Backend Architecture](../architecture/backend-architecture.md) — Spring Boot patterns
