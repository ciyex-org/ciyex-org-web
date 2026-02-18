# Quick Start Guide

Get Ciyex EHR up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21+** — [Download from Adoptium](https://adoptium.net/)
- **Node.js 22+** — [Download from nodejs.org](https://nodejs.org/)
- **pnpm** — Install with `npm install -g pnpm`
- **PostgreSQL 17** — [Download from postgresql.org](https://www.postgresql.org/download/)
- **Docker** (optional) — [Download from docker.com](https://www.docker.com/)
- **Git** — [Download from git-scm.com](https://git-scm.com/)

## Architecture Overview

Ciyex runs as multiple microservices. For local development you need at minimum:

| Service | Port | Database | Required |
|---------|------|----------|----------|
| **ciyex-api** | 8080 | `ask_ciya_dev` | Yes |
| **EHR-UI** (Next.js) | 3000 | — | Yes |
| **HAPI FHIR Server** | 8090 | `hapi_fhir` | Yes |
| **ciyex-marketplace** | 8081 | `marketplace` | Optional |
| **ciyex-codes** | 8084 | `ciyex_codes` | Optional |

All backend services fetch configuration from Spring Cloud Config Server at `https://config.apps-prod.us-east.in.hinisoft.com`.

## Step 1: Clone the Repository

```bash
git clone https://github.com/qiaben/ciyex-services.git
cd ciyex-services
```

The monorepo structure:
```
ciyex-services/
├── EHR/ciyex-api/          # Core backend (Spring Boot)
├── ciyex-org-web/           # Frontend (Next.js)
├── marketplace/ciyex-marketplace/  # Marketplace service
├── ciyex-codes/             # Medical codes service
└── ciyex-hapi-fhir/         # FHIR server
```

## Step 2: Setup PostgreSQL Databases

### Option A: Using Docker (Recommended)

```bash
docker run -d \
  --name ciyex-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:17-alpine
```

Then create the databases:

```bash
psql -U postgres -h localhost -c "CREATE DATABASE ask_ciya_dev;"
psql -U postgres -h localhost -c "CREATE DATABASE hapi_fhir;"
psql -U postgres -h localhost -c "CREATE DATABASE marketplace;"
psql -U postgres -h localhost -c "CREATE DATABASE ciyex_codes;"
```

### Option B: Using Local PostgreSQL

```bash
# Connect with -h localhost (peer auth fails without it)
psql -U postgres -h localhost
```

```sql
CREATE DATABASE ask_ciya_dev;
CREATE DATABASE hapi_fhir;
CREATE DATABASE marketplace;
CREATE DATABASE ciyex_codes;
```

## Step 3: Setup Backend (ciyex-api)

```bash
cd EHR/ciyex-api

# Create .env file (loaded by bootRun Gradle task)
cat > .env << 'EOF'
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ask_ciya_dev
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
FHIR_SERVER_URL=http://localhost:8090
KEYCLOAK_BASE_URL=https://dev.aran.me
KEYCLOAK_REALM=ciyex
EOF

# Build (skip tests for first run)
./gradlew clean build -x test

# Run the backend
./gradlew bootRun
```

The backend starts on **http://localhost:8080** and connects to Config Server for additional configuration. Flyway migrations run automatically on startup.

## Step 4: Setup FHIR Server

```bash
cd ciyex-hapi-fhir/interceptor

# Build the custom HAPI FHIR image
./gradlew clean shadowJar
docker build -t ciyex-hapi-fhir:latest .

# Run HAPI FHIR server
docker run -d \
  --name ciyex-fhir \
  -p 8090:8080 \
  -e spring.datasource.url=jdbc:postgresql://host.docker.internal:5432/hapi_fhir \
  -e spring.datasource.username=postgres \
  -e spring.datasource.password=postgres \
  ciyex-hapi-fhir:latest
```

FHIR server will be available at **http://localhost:8090/fhir**.

## Step 5: Setup Frontend (EHR-UI)

Open a new terminal:

```bash
cd ciyex-org-web

# Install dependencies
pnpm install

# Create environment file
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_MARKETPLACE_URL=http://localhost:8081
NEXT_PUBLIC_CODES_URL=http://localhost:8084
EOF

# Start the development server
pnpm run dev
```

The frontend starts on **http://localhost:3000**.

## Step 6: Access the Application

1. Open your browser and navigate to **http://localhost:3000**
2. You'll be redirected to the Keycloak login page at `dev.aran.me`
3. Log in with your Keycloak credentials
4. Select a practice if you have access to multiple organizations
5. You should see the dashboard

## Step 7 (Optional): Start Additional Services

### Marketplace Service

```bash
cd marketplace/ciyex-marketplace

cat > .env << 'EOF'
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/marketplace
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
EOF

./gradlew bootRun
```

Starts on **http://localhost:8081**.

### Medical Codes Service

```bash
cd ciyex-codes

cat > .env << 'EOF'
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ciyex_codes
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
EOF

./gradlew bootRun
```

Starts on **http://localhost:8084**. First startup loads ICD-10 (98K codes), HCPCS (8.3K codes), and CDT (683 codes) via Flyway migrations.

## Verify Installation

After logging in, verify:

1. Dashboard loads with metric cards
2. Navigate to Patients and create a test patient
3. Open the patient chart — dynamic FHIR tabs should render
4. Navigate to Settings — configuration-driven settings pages load
5. Navigate to Ciyex Hub — marketplace apps appear (requires marketplace service)

## Common Issues

### Port Already in Use

```bash
lsof -i :8080
kill -9 <PID>
```

### Database Connection Error

- Verify PostgreSQL is running: `pg_isready -h localhost`
- Use `-h localhost` — peer authentication fails without it
- Check credentials in `.env` file

### Config Server Connection

If the backend can't reach Config Server, it falls back to local config. Ensure you have network access to `https://config.apps-prod.us-east.in.hinisoft.com`.

### Frontend Build Errors

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Java Version Issues

```bash
java -version
# Should be 21 or higher

# Use SDKMAN to manage versions
sdk install java 21.0.1-tem
sdk use java 21.0.1-tem
```

## Next Steps

- [Core Features](features/patient-management.md) — Explore patient management
- [FHIR Integration](architecture/fhir-integration.md) — Understand the FHIR architecture
- [Architecture Overview](architecture.md) — System architecture deep dive
- [Development Guide](development/getting-started.md) — Development workflow
