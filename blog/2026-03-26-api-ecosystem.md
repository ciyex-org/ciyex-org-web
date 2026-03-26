---
slug: building-on-ciyex-api
title: "Building on the Ciyex API: Creating Health Apps That Matter"
authors: [dev_lead]
tags: [engineering, fhir, development, guide]
image: /img/blog/hero-api-ecosystem.svg
---

The most impactful healthcare applications are not built in isolation. They are built on platforms that provide rich clinical data, secure authentication, and standardized interfaces. Ciyex exposes a comprehensive FHIR R4 API, a SMART on FHIR app launch framework, and a marketplace ecosystem that allows developers to build health applications that integrate deeply with the clinical workflow. This guide covers everything you need to start building.

<!-- truncate -->

## The Ciyex API Architecture

Ciyex is built on a layered API architecture that provides multiple levels of integration:

- **FHIR R4 REST API**: The foundational layer, providing standard CRUD operations on all FHIR resource types (Patient, Encounter, Observation, Condition, MedicationRequest, and more).
- **Generic Resource API**: A configurable layer that maps form fields to FHIR resources via `tab_field_config`, enabling dynamic clinical forms without custom endpoints.
- **App Proxy API**: A gateway layer that routes requests to installed marketplace applications, enabling seamless integration of third-party services.
- **Webhook Events**: Real-time notifications for clinical events (new patient, encounter created, lab result received) that allow applications to respond to workflow triggers.

## Getting Started with FHIR R4

The FHIR (Fast Healthcare Interoperability Resources) standard defines how healthcare data is structured and exchanged. Ciyex implements FHIR R4, the current normative release, as its primary data model.

### Authentication

All API requests require a valid OAuth2 access token issued by the Keycloak identity provider. Tokens are obtained through the standard OpenID Connect authorization code flow:

```bash
# Step 1: Direct the user to the authorization endpoint
# (This happens in the browser)
https://auth.ciyex.org/realms/ciyex/protocol/openid-connect/auth?
  client_id=your-app-client-id&
  response_type=code&
  scope=openid fhirUser launch/patient&
  redirect_uri=https://your-app.com/callback&
  state=random-state-value&
  aud=https://api.ciyex.org/fhir

# Step 2: Exchange the authorization code for tokens
curl -X POST "https://auth.ciyex.org/realms/ciyex/protocol/openid-connect/token" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "client_id=your-app-client-id" \
  -d "redirect_uri=https://your-app.com/callback"
```

The access token includes SMART on FHIR scopes that define exactly which resources and operations the application is authorized to perform.

### Reading Patient Data

With a valid token, you can query FHIR resources using standard REST operations:

```bash
# Fetch a specific patient by ID
curl -X GET "https://api.ciyex.org/fhir/sunrise-family-medicine/Patient/12345" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/fhir+json"

# Search for patients by name
curl -X GET "https://api.ciyex.org/fhir/sunrise-family-medicine/Patient?family=Smith&given=John" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/fhir+json"

# Get all observations for a patient
curl -X GET "https://api.ciyex.org/fhir/sunrise-family-medicine/Observation?patient=Patient/12345&_sort=-date&_count=50" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/fhir+json"
```

The response follows the standard FHIR Bundle format:

```json
{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 3,
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "12345",
        "name": [
          {
            "family": "Smith",
            "given": ["John", "Robert"]
          }
        ],
        "birthDate": "1985-03-15",
        "gender": "male"
      }
    }
  ]
}
```

### Creating and Updating Resources

Write operations use standard HTTP methods:

```bash
# Create a new Observation (e.g., blood pressure reading)
curl -X POST "https://api.ciyex.org/fhir/sunrise-family-medicine/Observation" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/fhir+json" \
  -d '{
    "resourceType": "Observation",
    "status": "final",
    "category": [{
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/observation-category",
        "code": "vital-signs"
      }]
    }],
    "code": {
      "coding": [{
        "system": "http://loinc.org",
        "code": "85354-9",
        "display": "Blood pressure panel"
      }]
    },
    "subject": {
      "reference": "Patient/12345"
    },
    "effectiveDateTime": "2026-09-01T10:30:00Z",
    "component": [
      {
        "code": {
          "coding": [{
            "system": "http://loinc.org",
            "code": "8480-6",
            "display": "Systolic blood pressure"
          }]
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
          "coding": [{
            "system": "http://loinc.org",
            "code": "8462-4",
            "display": "Diastolic blood pressure"
          }]
        },
        "valueQuantity": {
          "value": 80,
          "unit": "mmHg",
          "system": "http://unitsofmeasure.org",
          "code": "mm[Hg]"
        }
      }
    ]
  }'
```

## SMART on FHIR App Launch

SMART on FHIR is the standard framework for launching third-party applications within an EHR context. Ciyex fully supports the SMART App Launch Framework (v2.0), enabling applications to launch with clinical context already established.

### Launch Sequence

When a user launches your application from within Ciyex, the following sequence occurs:

1. **Launch request**: Ciyex sends a launch request to your application's registered launch URL with a `launch` parameter and the `iss` (FHIR server URL).
2. **Authorization**: Your application redirects the user to the Keycloak authorization endpoint with the launch context.
3. **Token exchange**: After user approval, your application exchanges the authorization code for access and refresh tokens.
4. **Context retrieval**: The token response includes context parameters such as `patient` (the currently selected patient ID) and `encounter` (the current encounter ID).
5. **API access**: Your application uses the access token to call the FHIR API within the granted scope.

```javascript
// Example: SMART on FHIR launch handler (Node.js)
const smart = require("fhirclient");

// Initialize the SMART client from the launch context
const client = await smart(req, res).ready();

// The client automatically includes the correct
// authorization headers and patient context
const patient = await client.request(
  `Patient/${client.patient.id}`
);

const conditions = await client.request(
  `Condition?patient=${client.patient.id}&clinical-status=active`
);

console.log(`Patient: ${patient.name[0].family}`);
console.log(`Active conditions: ${conditions.entry.length}`);
```

### OAuth2 Scopes

Ciyex implements granular SMART on FHIR scopes that control access at the resource level:

| Scope | Description |
|---|---|
| `patient/Patient.read` | Read the current patient's demographics |
| `patient/Observation.read` | Read observations for the current patient |
| `patient/Observation.write` | Create/update observations for the current patient |
| `user/Patient.read` | Read any patient the user has access to |
| `user/Encounter.write` | Create encounters for any patient |
| `launch/patient` | Receive patient context on launch |
| `launch/encounter` | Receive encounter context on launch |

Applications should request only the scopes they need. Requesting excessive scopes will trigger additional review during marketplace approval.

## The Ciyex Hub Marketplace

The Ciyex Hub is the marketplace where healthcare applications are discovered, installed, and managed. Building for the marketplace allows your application to reach every Ciyex deployment.

### Plugin Architecture

Ciyex uses a plugin architecture that allows applications to extend the clinical interface:

```typescript
// Example: Registering a patient chart tab plugin
// src/plugins/my-health-app/index.ts
import { PluginRegistration } from "@ciyex/plugin-sdk";

export function register(api: PluginRegistration) {
  // Add a tab to the patient chart
  api.contributeToSlot("patient-chart:tab", {
    key: "care-gaps",
    label: "Care Gaps",
    icon: "AlertCircle",
    component: () => import("./CareGapsTab"),
    order: 50,
  });

  // Add a navigation item to settings
  api.contributeToSlot("settings:nav-item", {
    key: "care-gaps-config",
    label: "Care Gaps Settings",
    component: () => import("./CareGapsSettings"),
  });
}
```

Plugins can contribute to predefined extension points (slots) throughout the Ciyex interface, including:

- `patient-chart:tab`: Add tabs to the patient chart
- `settings:nav-item`: Add pages to the settings section
- `sidebar:menu-item`: Add items to the navigation sidebar
- `encounter:action`: Add actions to the encounter workflow
- `dashboard:widget`: Add widgets to the provider dashboard

### Webhook Events

Applications can subscribe to webhook events to respond to clinical workflow triggers in real time:

```json
{
  "event": "encounter.completed",
  "timestamp": "2026-09-01T15:30:00Z",
  "orgAlias": "sunrise-family-medicine",
  "payload": {
    "encounterId": "enc-789",
    "patientId": "Patient/12345",
    "providerId": "Practitioner/67890",
    "encounterType": "office-visit"
  },
  "signature": "sha256=abc123..."
}
```

Webhook payloads are signed with HMAC-SHA256 using your application's webhook secret. Always verify the signature before processing events:

```java
// Verify webhook signature (Java)
public boolean verifyWebhookSignature(
        String payload,
        String signature,
        String secret) {
    Mac hmac = Mac.getInstance("HmacSHA256");
    SecretKeySpec keySpec =
        new SecretKeySpec(secret.getBytes(), "HmacSHA256");
    hmac.init(keySpec);
    byte[] hash = hmac.doFinal(payload.getBytes());
    String computed = "sha256="
        + Hex.encodeHexString(hash);
    return MessageDigest.isEqual(
        computed.getBytes(),
        signature.getBytes());
}
```

## Building Your First Health App

Here is a practical roadmap for building and publishing a health application on the Ciyex marketplace:

1. **Register as a developer** on the Ciyex Hub developer portal.
2. **Create your application** with a SMART on FHIR launch endpoint.
3. **Request appropriate scopes** based on the clinical data your app needs.
4. **Build your plugin** to integrate with the Ciyex UI using the extension point system.
5. **Test against the sandbox** environment, which provides synthetic patient data.
6. **Submit for review**: The Ciyex team reviews security, scope usage, and clinical safety.
7. **Publish**: Once approved, your app appears in the Ciyex Hub for organizations to install.

The healthcare ecosystem needs more developers building thoughtful, standards-based applications. Whether you are building a clinical decision support tool, a population health dashboard, a chronic disease management app, or a patient engagement platform, the Ciyex API provides the foundation you need to create something meaningful.

Get started with the [Ciyex Developer Documentation](https://docs.ciyex.org) or explore the [API sandbox](https://sandbox.ciyex.org).
