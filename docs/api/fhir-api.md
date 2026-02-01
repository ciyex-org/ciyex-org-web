# FHIR API

Documentation for the Fast Healthcare Interoperability Resources (FHIR) R4 API.

## Overview

Ciyex includes a fully compliant **FHIR R4 Server** (based on HAPI FHIR).
Base URL: `/fhir`

## Capability Statement
`GET /fhir/metadata`
Returns the server's capabilities, supported resources, and search parameters.

## Supported Resources

### Patient
- `GET /fhir/Patient/{id}` - Read a patient.
- `GET /fhir/Patient?name=Smith` - Search by name.
- `POST /fhir/Patient` - Create a patient.

### Encounter
- `GET /fhir/Encounter?patient={id}` - List patient encounters.

### Observation
- `GET /fhir/Observation?patient={id}&category=vital-signs` - Get vitals.
- `GET /fhir/Observation?patient={id}&category=laboratory` - Get labs.

## Authentication
FHIR requests require the same Bearer Token as REST APIs.
Scopes: `user/Patient.read`, `user/Observation.write`.

## Interceptors
We utilize HAPI FHIR interceptors for:
- **Authorization**: Enforcing scopes.
- **Partitioning**: Multi-tenancy isolation (Tenant ID injected into Partition ID).
- **Validation**: Strict resource validation against profiles.

## Example: Create Patient

**Request**: `POST /fhir/Patient`
```json
{
  "resourceType": "Patient",
  "name": [
    {
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "gender": "male",
  "birthDate": "1980-01-01"
}
```

**Response**: `201 Created`
Location: `/fhir/Patient/123/_history/1`

## SMART on FHIR
Ciyex supports the SMART on FHIR launch sequence, allowing third-party apps to connect securely within the EHR context.
- **Standalone Launch**
- **EHR Launch**
