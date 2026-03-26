---
slug: understanding-fhir
title: "Understanding FHIR: The Language of Modern Healthcare"
authors: [dev_lead]
tags: [fhir, interoperability, standards]
image: /img/blog/hero-fhir.svg
---

Interoperability, the ability of different healthcare systems to exchange and use data, has been the central challenge of health IT for decades. HL7 v2 messages, CDA documents, and proprietary formats have created a landscape where patient data is trapped in silos. FHIR (Fast Healthcare Interoperability Resources) is the standard that finally makes seamless data exchange practical. Ciyex is built on FHIR from the ground up, not as an afterthought or an integration layer, but as the core data model.

<!-- truncate -->

## What FHIR Actually Is

FHIR R4 is a standard published by HL7 International that defines how healthcare data should be structured, stored, and exchanged. Unlike its predecessors (HL7 v2 and CDA), FHIR was designed for the modern web. It uses familiar technologies: REST APIs, JSON, and HTTP. A developer who has built any web application can read a FHIR API response and understand it immediately.

At its core, FHIR defines **Resources**, which are standardized data structures for every concept in healthcare:

- **Patient**: Demographics, contact information, identifiers
- **Observation**: Vital signs, lab results, social history (e.g., smoking status)
- **Encounter**: A clinical visit, with dates, participants, and status
- **Condition**: Diagnoses and problems, coded with ICD-10 or SNOMED CT
- **MedicationRequest**: Prescriptions, with dosage, frequency, and pharmacy details
- **AllergyIntolerance**: Known allergies and adverse reactions
- **DiagnosticReport**: Structured lab reports with references to component Observations

Each resource has a defined structure, required fields, and terminology bindings. A blood pressure Observation, for example, uses LOINC code `85354-9` and has two components: systolic (`8480-6`) and diastolic (`8462-4`). This standardization means that a blood pressure recorded in Ciyex is immediately understood by any other FHIR-compliant system.

## How Ciyex Uses FHIR Internally

Ciyex does not store clinical data in custom relational tables and then translate to FHIR on demand. Instead, we run a **HAPI FHIR R4 server** as the system of record for all clinical data. HAPI FHIR is the open source reference implementation of the FHIR specification, written in Java and maintained by Smile CDR.

When a nurse records vital signs in the Ciyex UI, the following happens:

1. The frontend collects the values (heart rate, blood pressure, temperature, etc.)
2. The `GenericFhirResourceService` maps the form data to a FHIR Observation using `FhirPathMapper`
3. The Observation is POSTed to the HAPI FHIR server, partitioned to the current organization
4. HAPI FHIR validates the resource, assigns an ID, and persists it

Here is what a vital signs Observation looks like as a FHIR resource:

```json
{
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
  "encounter": {
    "reference": "Encounter/67890"
  },
  "component": [
    {
      "code": {
        "coding": [{"system": "http://loinc.org", "code": "8480-6", "display": "Systolic"}]
      },
      "valueQuantity": {"value": 120, "unit": "mmHg"}
    },
    {
      "code": {
        "coding": [{"system": "http://loinc.org", "code": "8462-4", "display": "Diastolic"}]
      },
      "valueQuantity": {"value": 80, "unit": "mmHg"}
    }
  ]
}
```

## Partitioned Multi-Tenancy

In a platform that serves multiple healthcare organizations, data isolation is essential. Ciyex configures HAPI FHIR with **partitioned multi-tenancy**, where each organization's data is stored in a separate logical partition. The partition identifier is the organization's alias, derived from the authenticated user's JWT:

```
GET /sunrise-family-medicine/Patient?name=Johnson
GET /lakeside-pediatrics/Observation?category=vital-signs
```

A custom `TenantPartitionInterceptor` (version 0.0.29 and later) enforces two rules on every request:

1. **Partition enforcement**: The request must target the partition matching the user's JWT organization claim. Cross-partition queries are rejected.
2. **SMART scope enforcement**: The user must have the appropriate SMART on FHIR scope for the requested operation (`patient/Patient.read`, `patient/Observation.write`, etc.).

This dual enforcement happens at the FHIR server level, independent of any application-layer checks. Even if a bug in the API gateway fails to validate permissions, the FHIR server itself will reject unauthorized access.

## SMART on FHIR Applications

The [SMART on FHIR](https://smarthealthit.org/) framework defines how third-party applications can be launched within an EHR context. It builds on OAuth2 to provide:

- **Contextual launch**: The app receives the current patient, encounter, and user context
- **Scoped access**: The app can only access resources it has been granted permission for
- **Standalone and EHR-embedded modes**: Apps can run inside the EHR UI or independently

Ciyex supports SMART on FHIR app launches through the `SmartLaunchController`, which generates HMAC-signed tokens containing the launch context. This enables a growing ecosystem of specialized applications (clinical decision support tools, patient education modules, research data collection) that integrate seamlessly with the EHR.

## CDS Hooks: Clinical Decision Support at the Point of Care

[CDS Hooks](https://cds-hooks.hl7.org/) is a companion specification that triggers clinical decision support at specific points in the clinical workflow. When a provider opens a patient's chart, prescribes a medication, or orders a lab test, Ciyex can call external CDS services that return:

- **Information cards**: "This patient is due for a flu vaccine"
- **Warning cards**: "Drug interaction detected between Warfarin and Aspirin"
- **Suggestion cards**: "Consider ordering HbA1c for this diabetic patient"

CDS Hooks works with FHIR resources as its data format, creating a natural integration point for evidence-based clinical guidance.

## The 21st Century Cures Act and Information Blocking

The 21st Century Cures Act, signed into law in 2016 and enforced through ONC regulations effective since 2021, prohibits **information blocking**: practices that restrict the access, exchange, or use of electronic health information. The ONC's rules specifically require that certified EHR systems provide a standardized FHIR API for patient access.

Because Ciyex is FHIR-native, compliance with these regulations is inherent. Patients can:

- Access their health data through any FHIR-capable application
- Connect their records to consumer health apps (Apple Health, Google Health Connect)
- Share their data with other providers without faxing or mailing paper records
- Download their complete medical history in a structured, machine-readable format

This is not just a regulatory checkbox. It is a fundamental shift in who controls health data: the patient.

## Why FHIR-Native Matters

Many EHR systems claim "FHIR support" by bolting a translation layer onto a proprietary data model. This approach has several problems:

- **Data loss in translation**: Proprietary fields that do not map to FHIR resources are silently dropped
- **Performance overhead**: Every API call requires real-time data transformation
- **Inconsistency**: The FHIR API returns a different view of the data than the application UI shows
- **Maintenance burden**: Two data models must be kept in sync as both evolve

By making FHIR the native storage format, Ciyex eliminates all of these issues. The data in the FHIR API is the same data displayed in the clinical interface. There is no translation, no reconciliation, and no possibility of divergence.

For developers building on Ciyex, this means that the FHIR API is not a secondary interface. It is the primary interface. Every clinical workflow in the platform ultimately reads from and writes to FHIR resources, making the system inherently interoperable with the broader healthcare ecosystem.
