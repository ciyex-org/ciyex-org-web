# Quick Start Guide

Get Ciyex EHR up and running on your local machine in 15 minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21+** - [Download from Adoptium](https://adoptium.net/)
- **Node.js 20+** - [Download from nodejs.org](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm`
- **PostgreSQL 15+** - [Download from postgresql.org](https://www.postgresql.org/download/)
- **Docker** (optional) - [Download from docker.com](https://www.docker.com/)
- **Git** - [Download from git-scm.com](https://git-scm.com/)

## Step 1: Clone the Repositories

```bash
# Create a workspace directory
mkdir ciyex-workspace
cd ciyex-workspace

# Clone the main backend repository
git clone https://github.com/ciyex-org/ciyex.git

# Clone the frontend repository
git clone https://github.com/ciyex-org/ciyex-ehr-ui.git

# Clone the FHIR server repository (optional)
git clone https://github.com/ciyex-org/ciyex-hapi-fhir.git
```

## Step 2: Setup PostgreSQL Database

### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker run -d \
  --name ciyex-postgres \
  -e POSTGRES_DB=ciyexdb \
  -e POSTGRES_USER=ciyex \
  -e POSTGRES_PASSWORD=ciyex123 \
  -p 5432:5432 \
  postgres:15-alpine
```

### Option B: Using Local PostgreSQL

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database and user
CREATE DATABASE ciyexdb;
CREATE USER ciyex WITH PASSWORD 'ciyex123';
GRANT ALL PRIVILEGES ON DATABASE ciyexdb TO ciyex;

-- Create schema for practice
\c ciyexdb
CREATE SCHEMA practice_1;
GRANT ALL ON SCHEMA practice_1 TO ciyex;
```

## Step 3: Setup Backend (Spring Boot)

```bash
cd ciyex

# Configure database connection
cat > src/main/resources/application-local.yml << EOF
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ciyexdb
    username: ciyex
    password: ciyex123

ciyex:
  schema:
    name: practice_1

keycloak:
  enabled: false  # Disable for local development
EOF

# Build the application
./gradlew clean build -x test

# Run the backend
./gradlew bootRun --args='--spring.profiles.active=local'
```

The backend will start on **http://localhost:8080**

## Step 4: Setup Frontend (Next.js)

Open a new terminal:

```bash
cd ciyex-ehr-ui

# Install dependencies
pnpm install

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_ENABLED=false
PORT=3000
EOF

# Start the development server
pnpm run dev
```

The frontend will start on **http://localhost:3000**

## Step 5: Access the Application

1. Open your browser and navigate to **http://localhost:3000**
2. You should see the Ciyex EHR login page

### Create Initial Admin User

Since Keycloak is disabled, you'll need to create a user directly in the database:

```sql
-- Connect to the database
psql -U ciyex -d ciyexdb

-- Switch to practice schema
SET search_path TO practice_1;

-- Create admin user (password: admin123)
INSERT INTO users (id, email, password, first_name, last_name, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin',
  'User',
  'ADMIN',
  NOW(),
  NOW()
);
```

### Login

- **Email**: admin@example.com
- **Password**: admin123

## Step 6: Verify Installation

After logging in, you should be able to:

1. ✅ Access the dashboard
2. ✅ Navigate to different modules
3. ✅ Create a test patient
4. ✅ Schedule an appointment

## Optional: Setup FHIR Server

If you need FHIR capabilities:

```bash
cd ciyex-hapi-fhir/interceptor

# Build the custom HAPI FHIR image
./gradlew clean shadowJar
docker build -t ciyex-hapi-fhir:latest .

# Run HAPI FHIR server
docker run -d \
  --name ciyex-fhir \
  -p 8081:8080 \
  -e spring.datasource.url=jdbc:postgresql://host.docker.internal:5432/ciyexdb \
  -e spring.datasource.username=ciyex \
  -e spring.datasource.password=ciyex123 \
  -e hapi.fhir.partition_enabled=false \
  ciyex-hapi-fhir:latest
```

FHIR server will be available at **http://localhost:8081/fhir**

## Common Issues

### Port Already in Use

```bash
# Check what's using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Database Connection Error

- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `application-local.yml`
- Ensure database and schema exist

### Frontend Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Java Version Issues

```bash
# Check Java version
java -version

# Should be 21 or higher
# Use SDKMAN to manage Java versions
sdk install java 21.0.1-tem
sdk use java 21.0.1-tem
```

## Next Steps

Now that you have Ciyex EHR running locally:

1. **Explore Features** - Check out [Core Features](features/patient-management.md)
2. **Configure Keycloak** - Setup [Keycloak Authentication](integrations/keycloak.md)
3. **Deploy to Production** - Follow [Kubernetes Deployment](deployment/kubernetes.md)
4. **Customize** - Read the [Development Guide](development/code-structure.md)

## Development Workflow

### Start All Services

Create a convenience script `start-all.sh`:

```bash
#!/bin/bash

# Start PostgreSQL (if using Docker)
docker start ciyex-postgres

# Start backend in background
cd ciyex
./gradlew bootRun --args='--spring.profiles.active=local' &
BACKEND_PID=$!

# Wait for backend to start
sleep 10

# Start frontend
cd ../ciyex-ehr-ui
pnpm run dev &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:3000"
```

### Stop All Services

```bash
# Kill background processes
kill $BACKEND_PID $FRONTEND_PID

# Stop PostgreSQL
docker stop ciyex-postgres
```

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](operations/troubleshooting.md)
2. Search [GitHub Discussions](https://github.com/ciyex-org/ciyex/discussions)
3. Join our [Discord](https://discord.gg/ciyex)
4. Open an issue on [GitHub](https://github.com/ciyex-org/ciyex/issues)

---

**Congratulations!** 🎉 You now have Ciyex EHR running locally. Happy coding!
