# FHIR Integration

Complete guide to HL7 FHIR R4 integration in Ciyex EHR using HAPI FHIR.

## Overview

Ciyex EHR includes a fully integrated HAPI FHIR server providing HL7 FHIR R4 compliant API for healthcare interoperability. This enables seamless data exchange with other healthcare systems, EHRs, and health information exchanges (HIEs).

## Architecture

```mermaid
graph TB
    subgraph "External Systems"
        EHR[Other EHR Systems]
        HIE[Health Information Exchange]
        APP[Third-Party Apps]
    end
    
    subgraph "Ciyex EHR"
        UI[Next.js UI]
        API[Spring Boot API]
        FHIR[HAPI FHIR Server]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
    end
    
    EHR -->|FHIR R4| FHIR
    HIE -->|FHIR R4| FHIR
    APP -->|FHIR R4| FHIR
    UI --> API
    UI --> FHIR
    API --> FHIR
    FHIR --> DB
    API --> DB
```

## FHIR Server Details

- **Version**: HAPI FHIR 8.2.1
- **FHIR Version**: R4 (4.0.1)
- **Base URL**: `https://fhir.example.com/fhir`
- **Capabilities**: Full CRUD operations, search, transactions
- **Authentication**: OAuth2/OIDC via Keycloak

## Supported Resources

### Patient Resources

| Resource | Support | Description |
|----------|---------|-------------|
| **Patient** | ✅ Full | Patient demographics |
| **Person** | ✅ Full | Person information |
| **RelatedPerson** | ✅ Full | Related persons (family, caregivers) |
| **Practitioner** | ✅ Full | Healthcare providers |
| **PractitionerRole** | ✅ Full | Provider roles and specialties |
| **Organization** | ✅ Full | Healthcare organizations |
| **Location** | ✅ Full | Physical locations |

### Clinical Resources

| Resource | Support | Description |
|----------|---------|-------------|
| **Encounter** | ✅ Full | Patient visits |
| **Condition** | ✅ Full | Diagnoses and problems |
| **Observation** | ✅ Full | Vitals, lab results |
| **Procedure** | ✅ Full | Procedures performed |
| **AllergyIntolerance** | ✅ Full | Allergies |
| **MedicationRequest** | ✅ Full | Prescriptions |
| **MedicationStatement** | ✅ Full | Medication history |
| **Immunization** | ✅ Full | Vaccinations |
| **DiagnosticReport** | ✅ Full | Lab and imaging reports |
| **DocumentReference** | ✅ Full | Clinical documents |

### Administrative Resources

| Resource | Support | Description |
|----------|---------|-------------|
| **Appointment** | ✅ Full | Appointments |
| **Schedule** | ✅ Full | Provider schedules |
| **Slot** | ✅ Full | Available time slots |
| **Coverage** | ✅ Full | Insurance coverage |
| **Claim** | ⚠️ Partial | Insurance claims |

## Authentication

### OAuth2 Token

```http
POST https://aran-stg.zpoa.com/realms/master/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=ciyex-fhir
&client_secret=YOUR_CLIENT_SECRET
&scope=system/*.read system/*.write
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 300,
  "scope": "system/*.read system/*.write"
}
```

### Using Token

```http
GET /fhir/Patient/123
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

## FHIR Operations

### Create Resource

```http
POST /fhir/Patient
Authorization: Bearer {token}
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "identifier": [
    {
      "system": "http://example.com/mrn",
      "value": "MRN-2024-00123"
    }
  ],
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "Michael"]
    }
  ],
  "gender": "male",
  "birthDate": "1985-06-15",
  "telecom": [
    {
      "system": "phone",
      "value": "555-123-4567",
      "use": "home"
    },
    {
      "system": "email",
      "value": "john.doe@example.com"
    }
  ],
  "address": [
    {
      "use": "home",
      "line": ["123 Main St"],
      "city": "Springfield",
      "state": "IL",
      "postalCode": "62701",
      "country": "USA"
    }
  ]
}
```

**Response**:
```json
{
  "resourceType": "Patient",
  "id": "123",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2024-10-15T10:30:00Z"
  },
  "identifier": [...],
  "name": [...],
  "gender": "male",
  "birthDate": "1985-06-15"
}
```

### Read Resource

```http
GET /fhir/Patient/123
Authorization: Bearer {token}
Accept: application/fhir+json
```

### Update Resource

```http
PUT /fhir/Patient/123
Authorization: Bearer {token}
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "id": "123",
  "identifier": [...],
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "Michael", "Jr."]
    }
  ],
  "gender": "male",
  "birthDate": "1985-06-15"
}
```

### Delete Resource

```http
DELETE /fhir/Patient/123
Authorization: Bearer {token}
```

## Search Operations

### Basic Search

```http
GET /fhir/Patient?name=John&birthdate=1985-06-15
Authorization: Bearer {token}
```

### Search Parameters

#### Patient Search

```http
# By name
GET /fhir/Patient?name=Doe

# By identifier
GET /fhir/Patient?identifier=MRN-2024-00123

# By birthdate
GET /fhir/Patient?birthdate=1985-06-15

# By gender
GET /fhir/Patient?gender=male

# Combined
GET /fhir/Patient?name=John&birthdate=1985-06-15&gender=male
```

#### Observation Search

```http
# By patient
GET /fhir/Observation?patient=Patient/123

# By code
GET /fhir/Observation?code=http://loinc.org|8867-4

# By date
GET /fhir/Observation?date=ge2024-01-01

# Combined
GET /fhir/Observation?patient=Patient/123&code=8867-4&date=ge2024-01-01
```

### Search Modifiers

```http
# Exact match
GET /fhir/Patient?name:exact=John

# Contains
GET /fhir/Patient?name:contains=oh

# Case-insensitive
GET /fhir/Patient?name:text=john

# Missing
GET /fhir/Patient?email:missing=false
```

### Pagination

```http
GET /fhir/Patient?_count=20&_offset=0
```

### Include/Revinclude

```http
# Include related resources
GET /fhir/Encounter?_include=Encounter:patient

# Reverse include
GET /fhir/Patient/123?_revinclude=Observation:patient
```

## FHIR Resource Examples

### Patient Resource

```json
{
  "resourceType": "Patient",
  "id": "123",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2024-10-15T10:30:00Z",
    "profile": ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"]
  },
  "identifier": [
    {
      "use": "official",
      "system": "http://example.com/mrn",
      "value": "MRN-2024-00123"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "Michael"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "555-123-4567",
      "use": "home"
    },
    {
      "system": "email",
      "value": "john.doe@example.com"
    }
  ],
  "gender": "male",
  "birthDate": "1985-06-15",
  "address": [
    {
      "use": "home",
      "type": "both",
      "line": ["123 Main St"],
      "city": "Springfield",
      "state": "IL",
      "postalCode": "62701",
      "country": "USA"
    }
  ],
  "maritalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
        "code": "M",
        "display": "Married"
      }
    ]
  },
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
              "code": "C",
              "display": "Emergency Contact"
            }
          ]
        }
      ],
      "name": {
        "family": "Doe",
        "given": ["Jane"]
      },
      "telecom": [
        {
          "system": "phone",
          "value": "555-987-6543"
        }
      ]
    }
  ]
}
```

### Observation Resource (Vitals)

```json
{
  "resourceType": "Observation",
  "id": "456",
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85354-9",
        "display": "Blood pressure panel"
      }
    ]
  },
  "subject": {
    "reference": "Patient/123"
  },
  "effectiveDateTime": "2024-10-15T10:30:00Z",
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8480-6",
            "display": "Systolic blood pressure"
          }
        ]
      },
      "valueQuantity": {
        "value": 120,
        "unit": "mmHg",
        "system": "http://unitsofmeasure.org",
        "code": "mm[Hg]"
      }
    },
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8462-4",
            "display": "Diastolic blood pressure"
          }
        ]
      },
      "valueQuantity": {
        "value": 80,
        "unit": "mmHg",
        "system": "http://unitsofmeasure.org",
        "code": "mm[Hg]"
      }
    }
  ]
}
```

### Condition Resource

```json
{
  "resourceType": "Condition",
  "id": "789",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "active"
      }
    ]
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        "code": "confirmed"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis",
          "display": "Encounter Diagnosis"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10-cm",
        "code": "E11.9",
        "display": "Type 2 diabetes mellitus without complications"
      },
      {
        "system": "http://snomed.info/sct",
        "code": "44054006",
        "display": "Diabetes mellitus type 2"
      }
    ]
  },
  "subject": {
    "reference": "Patient/123"
  },
  "onsetDateTime": "2020-03-15",
  "recordedDate": "2020-03-15T10:00:00Z"
}
```

## Bulk Data Export

### System-Level Export

```http
GET /fhir/$export
Authorization: Bearer {token}
Prefer: respond-async
```

### Patient-Level Export

```http
GET /fhir/Patient/$export
Authorization: Bearer {token}
Prefer: respond-async
```

### Group-Level Export

```http
GET /fhir/Group/123/$export
Authorization: Bearer {token}
Prefer: respond-async
```

**Response**:
```http
HTTP/1.1 202 Accepted
Content-Location: https://fhir.example.com/fhir/$export-poll-status?_jobId=abc123
```

### Check Export Status

```http
GET /fhir/$export-poll-status?_jobId=abc123
Authorization: Bearer {token}
```

## Multi-Tenancy

HAPI FHIR server supports multi-tenancy using partitions:

### Tenant Header

```http
GET /fhir/Patient/123
Authorization: Bearer {token}
X-Tenant-ID: practice_1
```

### Partition Configuration

```java
@Bean
public PartitionSettings partitionSettings() {
    PartitionSettings settings = new PartitionSettings();
    settings.setPartitioningEnabled(true);
    settings.setUnnamedPartitionMode(false);
    return settings;
}
```

## SMART on FHIR

Ciyex EHR supports SMART on FHIR for third-party app integration:

### Authorization Endpoint

```
https://aran-stg.zpoa.com/realms/master/protocol/openid-connect/auth
```

### Token Endpoint

```
https://aran-stg.zpoa.com/realms/master/protocol/openid-connect/token
```

### Scopes

- `patient/*.read` - Read patient data
- `patient/*.write` - Write patient data
- `user/*.read` - Read user data
- `user/*.write` - Write user data
- `launch` - Launch context
- `launch/patient` - Patient launch context

## Performance Optimization

### Indexing

HAPI FHIR automatically creates indexes for search parameters:

```sql
-- Example indexes
CREATE INDEX idx_patient_family ON patient_name (family_name);
CREATE INDEX idx_patient_birthdate ON patient (birth_date);
CREATE INDEX idx_observation_patient ON observation (patient_id);
```

### Caching

Enable caching for better performance:

```yaml
spring:
  cache:
    type: caffeine
    caffeine:
      spec: maximumSize=1000,expireAfterWrite=10m
```

## Troubleshooting

### Resource Not Found

**Error**:
```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "not-found",
      "diagnostics": "Resource Patient/999 not found"
    }
  ]
}
```

**Solution**: Verify resource ID exists

### Invalid Resource

**Error**:
```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "invalid",
      "diagnostics": "Invalid resource: birthDate is required"
    }
  ]
}
```

**Solution**: Validate resource against FHIR schema

### Authentication Failed

**Error**:
```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "security",
      "diagnostics": "Invalid or expired token"
    }
  ]
}
```

**Solution**: Refresh OAuth2 token

## Next Steps

- [REST API](rest-api.md) - Ciyex REST API
- [Patient Management](../features/patient-management.md) - Patient records
- [Keycloak Integration](../integrations/keycloak.md) - Authentication
- [SMART on FHIR](https://hl7.org/fhir/smart-app-launch/) - External documentation
