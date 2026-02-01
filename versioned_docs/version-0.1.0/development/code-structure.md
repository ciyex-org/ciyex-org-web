# Code Structure

Overview of the project directory structure and organization.

## Backend Service (`ciyex`)

Standard Spring Boot layered architecture.

```
src/main/java/com/qiaben/ciyex/
├── config/             # Configuration classes (Security, Swagger, caching)
├── controller/         # REST Controllers (API layer)
├── dto/                # Data Transfer Objects (Request/Response)
├── entity/             # JPA Entities (Database Access)
├── exception/          # Global exception handling
├── repository/         # Spring Data JPA Repositories
├── security/           # JWT, Keycloak, Auth logic
├── service/            # Business logic layer
└── util/               # Utility classes
```

### Key Packages
- `features/`: Feature-sliced design for complex modules (e.g., `features/billing/`).
- `integration/`: External service clients (Stripe, Twilio).

## Frontend App (`ciyex-ehr-ui`)

Next.js App Router structure.

```
src/
├── app/                # App Router pages/layouts
│   ├── (auth)/         # Auth routes (login, register)
│   ├── (dashboard)/    # Protected dashboard routes
│   └── api/            # Next.js API routes (BFF)
├── components/         # React components
│   ├── ui/             # Reusable UI kit (buttons, inputs)
│   └── features/       # Feature-specific components
├── lib/                # Libraries and utils
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

## Infrastructure (`kube-terraform`)

Terraform modules for IaC.

```
├── modules/
│   ├── eks/            # EKS Cluster
│   ├── rds/            # Postgres RDS
│   └── vpc/            # Networking
├── environments/
│   ├── dev/            # Dev configuration
│   └── prod/           # Prod configuration
└── scripts/            # Helper scripts
```

## FHIR Server (`ciyex-hapi-fhir`)

HAPI FHIR implementation.

```
src/main/java/ca/uhn/fhir/jpa/starter/
├── interceptor/        # Custom interceptors (Auth, Logging)
├── provider/           # Resource providers
└── model/              # Custom resource definitions
```
