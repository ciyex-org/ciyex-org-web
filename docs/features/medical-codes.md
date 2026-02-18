# Medical Codes

Ciyex Medical Codes provides a comprehensive library of healthcare coding systems for clinical documentation, billing, and claim submission.

## Overview

The `ciyex-codes` service (port 8084) is a dedicated microservice that stores and serves medical reference codes. It supports multiple coding systems with versioning, org-specific settings, and claim validation.

## Supported Code Systems

| System | Codes | Description | Update Frequency |
|--------|-------|-------------|-----------------|
| **ICD-10-CM** | 98,000+ | Diagnosis codes | Annual (October) |
| **CPT** | 10,000+ | Procedure codes (AMA licensed) | Annual (January) |
| **HCPCS** | 8,300+ | Healthcare Common Procedure codes | Quarterly |
| **CDT** | 683 | Dental procedure codes | Annual (January) |
| **SNOMED CT** | 300,000+ | Clinical terminology | Biannual |
| **LOINC** | 90,000+ | Lab/observation codes | Biannual |
| **NDC** | 100,000+ | National Drug Codes | Monthly |

## Searching Codes

### From the EHR-UI

The code browser is accessible from:
- **Patient chart** — When adding diagnoses or procedures to encounters
- **Settings** — Code management in the settings panel
- **Direct navigation** — `/patients/codes`

### API Endpoints

Code search endpoints are **public** (no authentication required for GET requests):

```http
# Search within a code system
GET /api/codes/icd10/search?q=diabetes
GET /api/codes/cpt/search?q=office+visit
GET /api/codes/hcpcs/search?q=wheelchair

# Get a specific code
GET /api/codes/icd10/E11.9
GET /api/codes/cpt/99213

# Search across all systems
GET /api/codes/search?q=blood+pressure
```

### Search Examples

```bash
# Find diabetes diagnosis codes
curl http://localhost:8084/api/codes/icd10/search?q=diabetes

# Find office visit CPT codes
curl http://localhost:8084/api/codes/cpt/search?q=office+visit

# Find dental filling codes
curl http://localhost:8084/api/codes/cdt/search?q=filling
```

## CPT Code Licensing

CPT codes require an AMA license. The system enforces this per-organization:

- **`org_code_settings.cpt_enabled`** — Boolean toggle per org
- When disabled, CPT search returns an error directing the org to enable CPT
- Orgs must acknowledge the AMA license agreement before enabling

```http
# Check org code settings
GET /api/codes/settings

# Enable CPT (requires auth)
PUT /api/codes/settings
{"cptEnabled": true}
```

## Code Versioning

Code systems are updated periodically. The `code_system_versions` table tracks:

- Version identifier (e.g., "2026" for ICD-10 2026)
- Effective date range
- Release status (draft, active, retired)
- Number of codes in the version

## Multi-Tenancy

Codes use a hybrid visibility model:

| Scope | `org_alias` | Description |
|-------|-------------|-------------|
| Global | `__GLOBAL__` | Standard published codes, visible to all orgs |
| Org-specific | `{org_alias}` | Custom codes added by a specific practice |

Custom codes created by an org are only visible to that org. Standard codes (ICD-10, CPT, etc.) are loaded as global and visible to all.

## NCCI Edits

National Correct Coding Initiative (NCCI) edits validate claim code pairs:

```http
# Check if two CPT codes can be billed together
GET /api/codes/ncci/check?code1=99213&code2=99214

# Get Medically Unlikely Edits (MUE) for a code
GET /api/codes/ncci/mue/99213
```

NCCI PTP (Procedure-to-Procedure) edits flag:
- **Column 1/Column 2** code pairs that should not be billed together
- **Modifier indicators** — whether a modifier can bypass the edit
- **Effective dates** — when the edit applies

## Fee Schedules

Fee schedules define pricing per CPT code, per payer (insurance company), per org:

```http
# Look up fee for a CPT code
GET /api/codes/fee-schedules/lookup/99213

# Get fees by payer
GET /api/codes/fee-schedules/payer/{payerId}

# Create/update fee schedule entry
POST /api/codes/fee-schedules
{
  "cptCode": "99213",
  "payerId": "aetna-001",
  "allowedAmount": 95.50,
  "effectiveDate": "2024-01-01"
}
```

## Data Loading

Code data is loaded via Flyway migrations:

- **V3 (Java migration)** — Bulk loads ICD-10, HCPCS, CDT from CSV files
- Data files located in `src/main/resources/data/`:
  - `ICD10_2026.csv` — 98,000+ ICD-10-CM codes
  - `HCPCS_2025.csv` — 8,300+ HCPCS codes
  - `dental_cdt_2025.csv` — 683 CDT codes

## Integration with EHR

The ciyex-api proxies code lookups to ciyex-codes:

```http
# Proxied through ciyex-api
GET /api/codes-proxy/icd10/search?q=diabetes

# Direct to ciyex-codes
GET http://localhost:8084/api/codes/icd10/search?q=diabetes
```

The frontend uses the `NEXT_PUBLIC_CODES_URL` environment variable to call ciyex-codes directly for code browser features, and the proxy endpoint for inline code lookups during encounter documentation.

## Next Steps

- [Billing](billing.md) — Invoicing and claims with coded procedures
- [Clinical Documentation](clinical-docs.md) — Using codes in encounter notes
- [REST API Reference](../api/rest-api.md) — Full endpoint listing
