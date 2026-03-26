---
slug: data-migration-guide
title: "Migrating to Ciyex: A Step-by-Step Data Migration Guide"
authors: [dev_lead]
tags: [guide, fhir, interoperability, engineering]
image: /img/blog/hero-data-migration.svg
---

Switching EHR systems is one of the most daunting tasks a healthcare organization can undertake. Patient records, clinical histories, billing data, and scheduling information must all transfer accurately and completely. This guide walks through the entire migration process, from initial data export to final validation, with real code examples and practical strategies for minimizing risk.

<!-- truncate -->

## Understanding the Migration Landscape

Before writing a single line of migration code, you need to understand what you are working with. Healthcare data migration involves several categories of information:

- **Patient demographics**: Names, addresses, insurance information, emergency contacts
- **Clinical records**: Encounter notes, lab results, vital signs, medications, allergies, problem lists
- **Scheduling data**: Appointments (past and future), provider schedules, room assignments
- **Billing records**: Claims, payment history, account balances, fee schedules
- **Documents**: Scanned records, uploaded files, consent forms

Each category presents unique challenges. Clinical records are the most complex because they often contain unstructured data, custom fields, and provider-specific documentation patterns.

## Phase 1: Data Export from Your Existing EHR

### FHIR Bulk Data Export

If your current EHR supports FHIR R4, the Bulk Data Access specification (SMART Backend Services) provides a standardized export mechanism. This is the preferred approach because it produces data in a format that Ciyex can import directly.

```bash
# Initiate a Bulk Data Export from your existing EHR
# This is an async operation that returns a Content-Location header
curl -X GET "https://your-current-ehr.com/fhir/\$export" \
  -H "Authorization: Bearer $SOURCE_TOKEN" \
  -H "Accept: application/fhir+json" \
  -H "Prefer: respond-async" \
  -H "Content-Type: application/fhir+json" \
  -v

# Poll the status URL returned in the Content-Location header
curl -X GET "https://your-current-ehr.com/fhir/bulkstatus/12345" \
  -H "Authorization: Bearer $SOURCE_TOKEN"

# When complete, download the NDJSON files
# Each file contains resources of a single type
curl -o patients.ndjson "https://your-current-ehr.com/fhir/download/patients.ndjson" \
  -H "Authorization: Bearer $SOURCE_TOKEN"
```

The export produces NDJSON (Newline Delimited JSON) files, one per resource type. Common resource types include Patient, Encounter, Observation, Condition, MedicationRequest, AllergyIntolerance, and DocumentReference.

### CCD/CCDA Import

Many legacy EHR systems do not support FHIR but can export Consolidated Clinical Document Architecture (C-CDA) documents. These XML documents contain a patient's clinical summary and are widely supported as an exchange format.

Ciyex includes a C-CDA parser that converts these documents into FHIR resources:

```java
// CcdaToFhirConverter handles the transformation
// from C-CDA XML to FHIR R4 Bundle resources
public class CcdaToFhirConverter {

    public Bundle convertCcda(InputStream ccdaStream) {
        ClinicalDocument cda = CDAUtil.load(ccdaStream);
        Bundle bundle = new Bundle();
        bundle.setType(Bundle.BundleType.TRANSACTION);

        // Extract patient demographics
        Patient patient = extractPatient(cda);
        bundle.addEntry()
            .setResource(patient)
            .getRequest()
            .setMethod(Bundle.HTTPVerb.POST)
            .setUrl("Patient");

        // Extract conditions (problem list)
        List<Condition> conditions = extractConditions(cda, patient);
        for (Condition condition : conditions) {
            bundle.addEntry()
                .setResource(condition)
                .getRequest()
                .setMethod(Bundle.HTTPVerb.POST)
                .setUrl("Condition");
        }

        // Extract medications
        List<MedicationRequest> medications =
            extractMedications(cda, patient);
        for (MedicationRequest med : medications) {
            bundle.addEntry()
                .setResource(med)
                .getRequest()
                .setMethod(Bundle.HTTPVerb.POST)
                .setUrl("MedicationRequest");
        }

        return bundle;
    }
}
```

### Direct Database Export

For systems that support neither FHIR nor C-CDA export, direct database extraction is necessary. This requires understanding the source system's data model and writing custom transformation logic. Ciyex provides a migration framework that simplifies this process:

```sql
-- Example: Extract patient data from a legacy system
-- Map legacy fields to FHIR Patient resource structure
SELECT
    p.patient_id AS legacy_id,
    p.first_name,
    p.last_name,
    p.date_of_birth,
    p.gender,
    p.ssn_last_four,
    a.street_line_1,
    a.street_line_2,
    a.city,
    a.state,
    a.zip_code,
    ph.phone_number AS home_phone,
    ph.cell_number AS mobile_phone,
    p.email_address
FROM patients p
LEFT JOIN addresses a ON a.patient_id = p.patient_id
LEFT JOIN phone_numbers ph ON ph.patient_id = p.patient_id
WHERE p.status = 'ACTIVE';
```

## Phase 2: Patient Matching and Deduplication

When migrating data from multiple sources, or when patients exist in both the source and target systems, accurate patient matching is essential. Duplicate patient records create clinical safety risks and billing complications.

Ciyex uses a multi-factor matching algorithm:

```java
public class PatientMatcher {

    // Matching criteria with weighted scoring
    private static final double NAME_WEIGHT = 0.25;
    private static final double DOB_WEIGHT = 0.30;
    private static final double SSN_WEIGHT = 0.35;
    private static final double ADDRESS_WEIGHT = 0.10;

    // Threshold for considering two records a match
    private static final double MATCH_THRESHOLD = 0.85;

    public MatchResult findMatch(
            PatientRecord incoming,
            List<PatientRecord> existing) {

        for (PatientRecord candidate : existing) {
            double score = 0.0;

            score += NAME_WEIGHT
                * calculateNameSimilarity(
                    incoming.getName(),
                    candidate.getName());
            score += DOB_WEIGHT
                * (incoming.getDob().equals(candidate.getDob())
                    ? 1.0 : 0.0);
            score += SSN_WEIGHT
                * (incoming.getSsnLast4().equals(
                    candidate.getSsnLast4()) ? 1.0 : 0.0);
            score += ADDRESS_WEIGHT
                * calculateAddressSimilarity(
                    incoming.getAddress(),
                    candidate.getAddress());

            if (score >= MATCH_THRESHOLD) {
                return MatchResult.matched(candidate, score);
            }
        }
        return MatchResult.noMatch();
    }
}
```

Records that fall between the automatic match threshold and a lower "possible match" threshold are flagged for manual review. A clinical staff member reviews these records side by side and makes the final determination.

## Phase 3: Data Validation

Before loading data into production, every record must be validated. The validation process checks:

**Structural Validation**: Does each FHIR resource conform to the R4 specification? Are required fields present? Are coded values from valid value sets?

```bash
# Validate FHIR resources using the HAPI FHIR validator
java -jar validator_cli.jar \
  -ig hl7.fhir.us.core \
  -profile http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient \
  -output validation-report.json \
  patients.ndjson
```

**Clinical Validation**: Do the records make clinical sense? Common issues include:

- Medication end dates before start dates
- Lab results with values outside physiologically possible ranges
- Encounter dates in the future (unless they are scheduled appointments)
- Conditions with invalid ICD-10 codes or codes from outdated code sets

**Referential Integrity**: Do all references resolve correctly? An Observation that references a Patient must point to a Patient that exists in the migration dataset.

## Phase 4: Flyway Migration Scripts

Ciyex uses Flyway for database schema versioning. When migration requires structural changes or seed data for configuration, create versioned migration scripts:

```sql
-- V50__migration_legacy_data_mapping.sql
-- Create a mapping table to track legacy-to-new ID relationships
CREATE TABLE IF NOT EXISTS migration_id_mapping (
    id BIGSERIAL PRIMARY KEY,
    source_system VARCHAR(100) NOT NULL,
    source_id VARCHAR(255) NOT NULL,
    target_resource_type VARCHAR(100) NOT NULL,
    target_id VARCHAR(255) NOT NULL,
    migrated_at TIMESTAMP DEFAULT NOW(),
    org_alias VARCHAR(100) NOT NULL,
    UNIQUE(source_system, source_id, target_resource_type, org_alias)
);

-- Index for fast lookups during migration
CREATE INDEX idx_migration_source
    ON migration_id_mapping(source_system, source_id);
CREATE INDEX idx_migration_target
    ON migration_id_mapping(target_resource_type, target_id);
```

This mapping table is essential for two reasons. First, it allows you to trace any migrated record back to its source, which is critical for post-migration validation. Second, it enables incremental migration: you can run the migration in phases, and the mapping table prevents duplicate imports.

## Phase 5: Loading Data into Ciyex

With validated, deduplicated data ready, the loading process uses FHIR transaction bundles:

```bash
# Load a transaction bundle into the Ciyex FHIR server
# The bundle contains multiple resources that are processed atomically
curl -X POST "https://your-ciyex-instance/fhir/{orgAlias}" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/fhir+json" \
  -d @migration-bundle.json
```

For large datasets, batch the resources into bundles of 100 to 500 resources each. This balances throughput against memory consumption and provides natural checkpoints for the migration process.

## Rollback Strategies

Every migration must have a rollback plan. Ciyex supports several approaches:

- **Database snapshots**: Take a PostgreSQL snapshot before beginning the migration. If issues are discovered, restore to the snapshot.
- **FHIR resource versioning**: The HAPI FHIR server maintains version history for every resource. Individual resources can be reverted to previous versions.
- **Migration ID mapping**: The mapping table allows surgical removal of migrated data without affecting records that existed before migration.

```bash
# Create a PostgreSQL backup before migration
pg_dump -h localhost -U postgres -F c \
  -f pre_migration_backup.dump ciyex_db

# If rollback is needed
pg_restore -h localhost -U postgres -c \
  -d ciyex_db pre_migration_backup.dump
```

## Post-Migration Checklist

After migration completes, verify the following:

1. **Record counts match**: Compare total patients, encounters, and other resource counts between source and target.
2. **Spot-check clinical data**: Have providers review a sample of migrated charts for accuracy.
3. **Verify scheduled appointments**: Confirm that future appointments migrated correctly with the right providers and time slots.
4. **Test billing continuity**: Ensure that open claims and account balances transferred accurately.
5. **Validate document attachments**: Confirm that scanned documents and uploaded files are accessible.
6. **Run a parallel period**: Operate both systems simultaneously for a defined period, comparing outputs.

Data migration is inherently risky, but with careful planning, thorough validation, and robust rollback capabilities, the transition to Ciyex can be accomplished safely. The key is treating migration as a project, not an event, with clear phases, validation gates, and stakeholder sign-off at each step.

For questions about migration planning, reach out to the Ciyex community on [GitHub Discussions](https://github.com/ciyex-org/ciyex/discussions).
