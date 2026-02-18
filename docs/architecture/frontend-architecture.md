# Frontend Architecture

Deep dive into the Ciyex EHR-UI — a Next.js application that serves as the primary interface for providers, staff, and administrators.

## Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | 5.9.3 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **Icons** | Lucide React | 0.563.0 |
| **Charts** | ApexCharts + react-apexcharts | Latest |
| **Calendar** | FullCalendar | 6.1.20 |
| **Video** | @jitsi/react-sdk | 1.4.4 |
| **Drag & Drop** | react-dnd + html5-backend | Latest |
| **File Upload** | react-dropzone | Latest |
| **Animations** | Framer Motion | 12.33.0 |
| **PDF Export** | jsPDF, html2pdf.js | Latest |
| **Font** | Outfit (Google Fonts) | 400-700 |

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (providers, font, metadata)
│   ├── (admin)/                  # Authenticated admin layout
│   │   └── layout.tsx            # AppSidebar + AppHeader + ProtectedRoute
│   ├── (full-width-pages)/       # Full-width layouts (auth, errors)
│   │   ├── (auth)/               # signin, signup, callback, select-practice
│   │   └── (error-pages)/        # 404
│   ├── dashboard/                # Main dashboard
│   ├── patients/                 # Patient list, chart, encounters
│   ├── appointments/             # FlowBoard scheduling
│   ├── all-encounters/           # Encounter list
│   ├── hub/                      # Ciyex Hub marketplace
│   ├── developer/                # Developer portal
│   ├── settings/                 # Configuration pages
│   ├── telehealth/               # Video consultations
│   ├── messaging/                # Secure messaging
│   ├── labs/                     # Lab orders & results
│   ├── reports/                  # Patient, appointment, encounter, payment reports
│   ├── inventory-management/     # Inventory, orders, suppliers
│   ├── recalls/                  # Patient recall board
│   └── api/                      # Next.js API routes
│
├── components/                   # Reusable components
│   ├── auth/                     # SignIn, SignUp, ProtectedRoute, PracticeSelection
│   ├── patients/                 # GenericFhirTab, DynamicFormRenderer, ClinicalSidebar
│   ├── encounter/                # EncountersTable, DynamicEncounterForm
│   ├── settings/                 # GenericSettingsPage, TabManager, FieldConfigEditor
│   ├── hub/                      # AppGrid, AppCard, CategoryFilter
│   ├── plugins/                  # PluginSlot, PluginRegistryContext, NativePluginLoader
│   ├── calendar/                 # FullCalendar, AppointmentModal
│   ├── codes/                    # Medical code browser
│   ├── inventory-management/     # Inventory components
│   ├── telehealth/               # Jitsi integration
│   ├── ui/                       # Primitives: button, modal, dialog, table, select, etc.
│   └── ecommerce/                # Dashboard cards and charts
│
├── context/                      # React Context providers
│   ├── SidebarContext             # Sidebar collapse/expand state
│   ├── ThemeContext               # Dark/light mode
│   └── MenuContext                # Dynamic menu data from API
│
├── layout/                       # Layout components
│   ├── AppSidebar.tsx            # Dynamic sidebar from MenuContext
│   └── AppHeader.tsx             # Top header with breadcrumbs
│
└── utils/                        # Utilities
    ├── fetchWithAuth.ts          # Authenticated fetch wrapper
    ├── apiClient.ts              # API client with retry
    └── auth.ts                   # Token management
```

## Key Patterns

### 1. Authentication Flow (PKCE OAuth2)

```
User → /signin → Redirect to Keycloak (with PKCE challenge)
                                ↓
Keycloak authenticates → Redirect to /callback (with auth code)
                                ↓
/callback → POST /api/auth/keycloak-callback (code + PKCE verifier)
                                ↓
Backend exchanges code → Returns JWT
                                ↓
Store JWT in localStorage → Navigate to /select-practice or /dashboard
```

**Key components**:
- `SignInForm` — Initiates PKCE flow to Keycloak
- `/callback` page — Handles OAuth redirect and token exchange
- `PracticeSelection` — Multi-org selection after auth
- `ProtectedRoute` — HOC that checks localStorage for token
- `SessionManager` — Handles token refresh

### 2. Data Fetching (fetchWithAuth)

The primary API utility automatically injects auth and tenant context:

```typescript
// fetchWithAuth.ts
export async function fetchWithAuth(input: string, init?: RequestInit): Promise<Response> {
  const token = localStorage.getItem("token");
  const tenantName = extractTenantFromJWT(token);
  const orgId = localStorage.getItem("orgId");

  const headers = {
    "Accept": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(tenantName && { "X-Tenant-Name": tenantName }),
    ...(orgId && { "X-Org-Id": orgId }),
  };

  const base = getEnv("NEXT_PUBLIC_API_URL") || "http://localhost:8080";
  const url = input.startsWith('/') ? `${base}${input}` : input;

  const res = await fetch(url, { credentials: "include", ...init, headers });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  }
  return res;
}
```

**Higher-level client** with automatic retry:

```typescript
// apiClient.ts
export const api = {
  get: (url, options?) => apiClient(url, { ...options, method: 'GET' }),
  post: (url, data?, options?) => apiClient(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data?, options?) => apiClient(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url, options?) => apiClient(url, { ...options, method: 'DELETE' }),
};
```

### 3. Dynamic Patient Chart (FHIR Tabs)

The patient chart renders tabs dynamically from backend configuration:

```
Patient Chart (/patients/[id])
├── Dashboard tab (hardcoded)
│   ├── AllergiesSummary
│   ├── MedicalProblemsSummary
│   ├── InsuranceSummary
│   └── Recent Activity
│
├── Dynamic FHIR Tabs (from tab_field_config API)
│   ├── Clinical category:
│   │   ├── Encounters → GenericFhirTab
│   │   ├── Problems → GenericFhirTab
│   │   ├── Allergies → GenericFhirTab
│   │   ├── Medications → GenericFhirTab
│   │   ├── Vitals → GenericFhirTab
│   │   └── Labs → GenericFhirTab
│   ├── General category:
│   │   ├── Demographics → GenericFhirTab
│   │   ├── Appointments → GenericFhirTab
│   │   ├── Documents → GenericFhirTab
│   │   └── Insurance → GenericFhirTab
│   └── Financial category:
│       ├── Billing → GenericFhirTab
│       └── Transactions → GenericFhirTab
│
└── Plugin-Contributed Tabs (from installed apps)
    └── e.g., "Care Gaps" tab from demo-care-gaps app
```

**GenericFhirTab** fetches data from `/api/fhir-resource/{tabKey}/patient/{patientId}` and renders a form using `DynamicFormRenderer` based on the field configuration.

### 4. Configuration-Driven Settings

Settings pages are generated dynamically — no custom React code per settings page:

```typescript
// GenericSettingsPage.tsx
export default function GenericSettingsPage({ pageKey }: { pageKey: string }) {
  // 1. Fetch tab field config for pageKey
  const config = useFetch(`/api/tab-field-config/${pageKey}`);

  // 2. Fetch FHIR resources using config.fhirResources
  const data = useFetch(`/api/fhir-resource/${pageKey}`);

  // 3. Render form fields from config.fieldConfig
  return <DynamicFormRenderer fields={config.fieldConfig} data={data} />;
}
```

**Adding a new settings page** = INSERT a row in `tab_field_config` with the fields and FHIR mappings. The UI automatically picks it up.

### 5. Dynamic Sidebar Menu

The sidebar is database-driven via the Menu API:

```typescript
// AppSidebar.tsx
const SIDEBAR_ICON_MAP: Record<string, LucideIcon> = {
  Calendar, Users, Package, BarChart3, Settings, Store, Code2,
  LayoutDashboard, ShoppingCart, FileText, Stethoscope, ...
};

// Menu items loaded from MenuContext (API: GET /api/menus)
// Icons resolved from string → Lucide component via SIDEBAR_ICON_MAP
// 3-level hierarchy: top → level2 → level3
// Per-org overrides applied server-side
```

### 6. Plugin Architecture

Apps installed from Ciyex Hub can extend the EHR UI:

```typescript
// PluginSlot — renders plugin contributions at named locations
<PluginSlot name="patient-chart:tab" context={{ patientId, orgAlias }} />
<PluginSlot name="patient-chart:banner-alert" context={{ patientId }} />
<PluginSlot name="encounter:toolbar" context={{ encounterId }} />
```

**Available extension points**:

| Slot Name | Location | Description |
|-----------|----------|-------------|
| `patient-chart:tab` | Patient Chart | Custom tab |
| `patient-chart:banner-alert` | Patient Chart | Alert banner |
| `patient-chart:action-bar` | Patient Chart | Toolbar buttons |
| `patient-chart:sidebar-widget` | Patient Chart | Sidebar widget |
| `patient-chart:summary-card` | Patient Dashboard | Summary card |
| `encounter:form-footer` | Encounter Form | Footer section |
| `encounter:toolbar` | Encounter View | Toolbar buttons |
| `settings:nav-item` | Settings Page | Nav entry |

**Plugin lifecycle**:
1. App installed via Hub → `app_installations.extension_points` populated
2. `NativePluginLoader` registers bundled plugins at startup
3. `PluginRegistryContext` maintains registry of all active contributions
4. `PluginSlot` components query registry and render matching contributions

### 7. State Management

Uses React Context (no Redux/Zustand):

| Context | Purpose |
|---------|---------|
| `SidebarContext` | Sidebar collapse, hover, mobile state |
| `ThemeContext` | Dark/light mode toggle |
| `MenuContext` | Dynamic menu data from API |
| `PluginRegistryContext` | Plugin contributions registry |
| `TenantContext` | Current org/practice info |

### 8. UI Components

Custom-built components (not shadcn/ui) in `src/components/ui/`:

- `button/` — Button variants with Tailwind
- `modal/`, `dialog.tsx` — Modal dialogs
- `table/` — Data table with sorting/pagination
- `select.tsx`, `input.tsx` — Form controls
- `dropdown/` — Dropdown menus
- `badge/` — Status badges
- `alert/` — Alert messages
- `avatar/` — User avatars
- `tabs.tsx` — Tab navigation
- `card.tsx` — Card containers

**Styling**: Tailwind CSS v4 with custom color tokens, dark mode via `dark:` prefix, responsive with standard breakpoints.

## Key Pages

### Dashboard (`/dashboard`)

- Summary metric cards (patients, consultations, appointments)
- Monthly consultations chart (ApexCharts line chart)
- Consultation target progress
- Statistics chart
- Recent patients & appointments table

### Patient List (`/patients`)

- Search with autocomplete
- Pagination (5/10/25/50 per page)
- Recent patients quick-access sidebar
- Create new patient button → `/patients/new`
- Click patient → `/patients/[id]` (chart)

### Appointments (`/appointments`)

- FlowBoard appointment management
- FullCalendar integration (day/week/month views)
- Appointment modal for create/edit
- Provider availability display

### Ciyex Hub (`/hub`)

- Browse marketplace apps with search and category filters
- Featured apps section
- Installed apps management (`/hub/installed`)
- App comparison (`/hub/compare`)
- App detail pages (`/hub/[slug]`)
- Usage analytics (`/hub/usage`)

### Developer Portal (`/developer`)

- Dashboard with quick stats
- API key management
- App submission workflow
- FHIR sandbox environments
- Team management
- Analytics dashboard
- Webhook delivery logs
- Admin review queue

### Settings (`/settings`)

- Generic settings pages (`/settings/p/[pageKey]`)
- Encounter section configuration
- Patient chart layout configuration
- Sidebar menu customization
- Regional/practice settings

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:8080        # ciyex-api URL
NEXT_PUBLIC_MARKETPLACE_URL=http://localhost:8081 # Marketplace API URL
NEXT_PUBLIC_CODES_URL=http://localhost:8084       # ciyex-codes URL
```

## Next Steps

- [Backend Architecture](backend-architecture.md) — Spring Boot patterns
- [FHIR Integration](fhir-integration.md) — Generic FHIR resource pattern
- [System Architecture](../architecture.md) — Full system overview
