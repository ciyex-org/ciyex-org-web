# Ciyex Hub

Ciyex Hub is the integrated app marketplace that lets practices discover, install, and manage healthcare apps from within the EHR.

## Overview

Ciyex Hub provides:

- **App Catalog** — Browse and search curated healthcare apps
- **One-Click Install** — Install apps directly from the marketplace
- **App Configuration** — Configure installed apps per-organization
- **Usage Tracking** — Monitor app usage and analytics
- **Developer Portal** — Build and publish custom apps

## Available Apps

Ciyex Hub launches with these first-party apps:

| App | Category | Pricing | Description |
|-----|----------|---------|-------------|
| **Ciyex Medical Codes** | Clinical Reference | Free | ICD-10, CPT, HCPCS, CDT, SNOMED, LOINC codes |
| **Ciyex Communications** | Communication | Free | Email, SMS, fax, and in-app notifications |
| **Ciyex Credentialing** | Operations | $49/mo | Provider credentialing and verification |
| **Ciyex File Storage** | Infrastructure | Free | HIPAA-compliant document storage |
| **Patient Payments** | Revenue Cycle | 2.9% + $0.30 | Online patient payment collection |
| **Ciyex Telehealth** | Telehealth | Free | HIPAA-compliant video consultations |
| **Ciyex RCM** | Revenue Cycle | 4% of collections | Full revenue cycle management |
| **Ciyex Screen Builder** | Platform | $29/mo | Low-code form and workflow designer |
| **Ask Ciya** | AI | Per-use | AI-powered clinical assistant |
| **Care Gaps** | Clinical | Free | Identify and close care gaps |

## Browsing Apps

Navigate to **Ciyex Hub** from the sidebar (Store icon) to browse the app catalog.

### Search & Filter

- **Search** — Type to search by app name or description
- **Category filter** — Filter by category (Clinical, Billing, Communication, etc.)
- **Featured apps** — Curated featured apps appear at the top

### App Detail Page

Click any app to see:

- Full description and features
- Screenshots and media
- Pricing plans
- Reviews and ratings
- FHIR resources used
- Extension points contributed

## Installing Apps

### From the Catalog

1. Navigate to `/hub` and find the app
2. Click **Install** on the app card or detail page
3. Select a pricing plan (if applicable)
4. The app is instantly available in your EHR

### What Happens on Install

When you install an app:

1. **Marketplace** creates a subscription record
2. **Webhook** fires to ciyex-api with `subscription.created` event
3. **ciyex-api** creates an `app_installations` record for your org
4. **UI extensions** become active (new tabs, toolbar buttons, etc.)

### App Lifecycle Events

| Event | Trigger | Effect |
|-------|---------|--------|
| `subscription.created` | App installed | Installation record created, features enabled |
| `subscription.cancelled` | App uninstalled | Status set to `uninstalled` |
| `subscription.paused` | Subscription paused | Status set to `suspended` |

## Managing Installed Apps

Navigate to `/hub/installed` to see all installed apps for your organization.

For each installed app you can:

- **Configure** — Update app-specific settings
- **View Usage** — See usage metrics and analytics
- **Uninstall** — Remove the app from your practice

### App Configuration

Many apps support per-org configuration stored in the `config` JSONB column:

```json
{
  "notifications": {
    "emailEnabled": true,
    "smsEnabled": false
  },
  "defaults": {
    "language": "en",
    "timezone": "America/New_York"
  }
}
```

Configuration is managed via the app detail page after installation.

## Plugin Architecture

Installed apps can extend the EHR UI through named **extension points** (slots):

| Slot | Location | Description |
|------|----------|-------------|
| `patient-chart:tab` | Patient Chart | Adds a custom tab |
| `patient-chart:banner-alert` | Patient Chart | Alert banner above chart |
| `patient-chart:action-bar` | Patient Chart | Toolbar buttons |
| `patient-chart:sidebar-widget` | Patient Chart | Sidebar widget |
| `patient-chart:summary-card` | Patient Dashboard | Summary card |
| `encounter:form-footer` | Encounter Form | Footer section |
| `encounter:toolbar` | Encounter View | Toolbar buttons |
| `settings:nav-item` | Settings Page | Navigation entry |

### How Plugins Work

```
1. App installed → extension_points stored in app_installations
2. NativePluginLoader registers bundled plugins at startup
3. PluginRegistryContext maintains registry of active contributions
4. PluginSlot components render matching contributions at each location
```

### Example: Care Gaps Plugin

The Care Gaps app contributes a patient chart tab:

```typescript
<PluginSlot name="patient-chart:tab" context={{ patientId, orgAlias }} />
// Renders "Care Gaps" tab from the demo-care-gaps app
```

## SMART on FHIR

Third-party apps can use SMART on FHIR for secure, context-aware launches:

```
GET /api/smart-launch/.well-known/smart-configuration
→ Returns authorization endpoints, scopes, capabilities

POST /api/smart-launch/{appSlug}
→ Generates launch context with patient/encounter context
```

### Supported Scopes

- `patient/*.read` — Read patient data
- `patient/*.write` — Write patient data
- `user/*.read` — Read user data
- `launch` — Launch context
- `launch/patient` — Patient launch context

## CDS Hooks

Installed apps can provide Clinical Decision Support via CDS Hooks:

```
GET /api/cds-hooks/cds-services
→ Returns available CDS services from installed apps

POST /api/cds-hooks/{hookId}
→ Invokes CDS hook and returns cards/suggestions
```

### Supported Hooks

- `patient-view` — Triggered when a patient chart is opened
- `order-select` — Triggered during order entry
- `encounter-start` — Triggered when an encounter begins

## App Launch Auditing

Every app launch is logged for HIPAA compliance:

```sql
-- app_launch_logs table
{
  "app_slug": "ask-ciya",
  "launched_by": "dr.smith@practice.com",
  "patient_id": "123",
  "encounter_id": "456",
  "launch_type": "native",  -- native, smart, external
  "launched_at": "2024-02-18T10:30:00Z"
}
```

## API Reference

```http
# List installed apps
GET /api/app-installations

# Check if app is installed
GET /api/app-installations/{appSlug}/installed

# Install app
POST /api/app-installations
{"appId":"uuid","appSlug":"ask-ciya","appName":"Ask Ciya","appCategory":"AI"}

# Log app launch
POST /api/app-installations/{appSlug}/launch
{"patientId":"123","launchType":"native"}

# Update app config
PUT /api/app-installations/{appSlug}/config
{"emailEnabled":true}

# Uninstall app
DELETE /api/app-installations/{appSlug}

# Browse marketplace catalog
GET {MARKETPLACE_URL}/api/v1/apps
```

## Next Steps

- [REST API Reference](../api/rest-api.md) — Full endpoint listing
- [Architecture Overview](../architecture.md) — System architecture
- [FHIR Integration](../architecture/fhir-integration.md) — Generic FHIR resource pattern
