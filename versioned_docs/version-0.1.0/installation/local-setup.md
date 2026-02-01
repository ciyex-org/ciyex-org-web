# Local Development Setup

This guide walks you through setting up Ciyex EHR for local development on your machine.

## Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Download |
|----------|----------------|-------------|----------|
| Java | 21 | 21.0.1+ | [Adoptium](https://adoptium.net/) |
| Node.js | 20.0 | 22.0+ | [nodejs.org](https://nodejs.org/) |
| pnpm | 8.0 | Latest | `npm install -g pnpm` |
| PostgreSQL | 15.0 | 16.0+ | [postgresql.org](https://www.postgresql.org/) |
| Git | 2.30 | Latest | [git-scm.com](https://git-scm.com/) |

### Optional Software

| Software | Purpose | Download |
|----------|---------|----------|
| Docker | Container runtime | [docker.com](https://www.docker.com/) |
| Redis | Caching (optional) | [redis.io](https://redis.io/) |
| VS Code | IDE | [code.visualstudio.com](https://code.visualstudio.com/) |
| IntelliJ IDEA | IDE | [jetbrains.com](https://www.jetbrains.com/idea/) |

## Step 1: Install Java 21

### Using SDKMAN (Recommended for Linux/Mac)

```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Java 21
sdk install java 21.0.1-tem
sdk use java 21.0.1-tem

# Verify installation
java -version
```

### Using Package Manager

**macOS (Homebrew)**:
```bash
brew install openjdk@21
```

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install openjdk-21-jdk
```

**Windows**:
Download and install from [Adoptium](https://adoptium.net/)

## Step 2: Install Node.js and pnpm

### Using nvm (Recommended)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 22
nvm install 22
nvm use 22

# Install pnpm globally
npm install -g pnpm

# Verify installations
node -v
pnpm -v
```

### Using Package Manager

**macOS (Homebrew)**:
```bash
brew install node@22
npm install -g pnpm
```

**Ubuntu/Debian**:
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm
```

## Step 3: Install PostgreSQL

### Using Docker (Recommended)

```bash
# Pull PostgreSQL image
docker pull postgres:16-alpine

# Create a volume for data persistence
docker volume create ciyex-postgres-data

# Run PostgreSQL container
docker run -d \
  --name ciyex-postgres \
  -e POSTGRES_DB=ciyexdb \
  -e POSTGRES_USER=ciyex \
  -e POSTGRES_PASSWORD=ciyex123 \
  -p 5432:5432 \
  -v ciyex-postgres-data:/var/lib/postgresql/data \
  postgres:16-alpine

# Verify it's running
docker ps | grep ciyex-postgres
```

### Using Package Manager

**macOS (Homebrew)**:
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install postgresql-16
sudo systemctl start postgresql
```

**Windows**:
Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)

## Step 4: Setup Database

### Create Database and Schema

```bash
# Connect to PostgreSQL
psql -U postgres -h localhost

# Or if using Docker
docker exec -it ciyex-postgres psql -U postgres
```

```sql
-- Create database
CREATE DATABASE ciyexdb;

-- Create user (if not using Docker)
CREATE USER ciyex WITH PASSWORD 'ciyex123';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ciyexdb TO ciyex;

-- Connect to the database
\c ciyexdb

-- Create schema for practice
CREATE SCHEMA practice_1;
GRANT ALL ON SCHEMA practice_1 TO ciyex;
GRANT ALL ON ALL TABLES IN SCHEMA practice_1 TO ciyex;
ALTER DEFAULT PRIVILEGES IN SCHEMA practice_1 GRANT ALL ON TABLES TO ciyex;

-- Verify
\dn
```

### Initialize Database Tables

The Spring Boot application will automatically create tables using Flyway migrations on first run.

## Step 5: Clone Repositories

```bash
# Create workspace directory
mkdir ~/ciyex-workspace
cd ~/ciyex-workspace

# Clone backend repository
git clone https://github.com/ciyex-org/ciyex.git
cd ciyex

# Checkout main branch
git checkout main
git pull origin main

# Go back to workspace
cd ..

# Clone frontend repository
git clone https://github.com/ciyex-org/ciyex-ehr-ui.git
cd ciyex-ehr-ui

# Checkout main branch
git checkout main
git pull origin main

# Go back to workspace
cd ..
```

## Step 6: Configure Backend

### Create Local Configuration

```bash
cd ~/ciyex-workspace/ciyex

# Create local configuration file
cat > src/main/resources/application-local.yml << 'EOF'
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ciyexdb
    username: ciyex
    password: ciyex123
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
  
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true

ciyex:
  schema:
    name: practice_1

keycloak:
  enabled: false  # Disable for local development

logging:
  level:
    com.qiaben.ciyex: DEBUG
    org.springframework.web: INFO
    org.hibernate.SQL: DEBUG
EOF
```

### Build the Backend

```bash
# Clean and build
./gradlew clean build -x test

# This will:
# - Download dependencies
# - Compile Java code
# - Run Flyway migrations
# - Create JAR file
```

## Step 7: Configure Frontend

```bash
cd ~/ciyex-workspace/ciyex-ehr-ui

# Install dependencies
pnpm install

# Create environment file
cat > .env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_FHIR_URL=http://localhost:8080/fhir

# Keycloak Configuration (disabled for local)
NEXT_PUBLIC_KEYCLOAK_ENABLED=false

# Development Settings
PORT=3000
NODE_ENV=development
EOF
```

## Step 8: Run the Application

### Terminal 1: Start Backend

```bash
cd ~/ciyex-workspace/ciyex

# Run with local profile
./gradlew bootRun --args='--spring.profiles.active=local'

# Wait for "Started CiyexApplication" message
# Backend will be available at http://localhost:8080
```

### Terminal 2: Start Frontend

```bash
cd ~/ciyex-workspace/ciyex-ehr-ui

# Run development server
pnpm run dev

# Frontend will be available at http://localhost:3000
```

## Step 9: Create Test User

Since Keycloak is disabled, create a test user directly in the database:

```sql
-- Connect to database
psql -U ciyex -d ciyexdb -h localhost

-- Switch to practice schema
SET search_path TO practice_1;

-- Create admin user
-- Password: admin123 (bcrypt hashed)
INSERT INTO users (
  id,
  email,
  password,
  first_name,
  last_name,
  role,
  is_active,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin',
  'User',
  'ADMIN',
  true,
  NOW(),
  NOW()
);

-- Create a provider user
-- Password: provider123
INSERT INTO users (
  id,
  email,
  password,
  first_name,
  last_name,
  role,
  is_active,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'provider@example.com',
  '$2a$10$7Z3qX8Kj9YvN5xPmR2tLOuH3vF6wE8sD9cB1aG4hJ5kL6mN7oP8qR',
  'John',
  'Provider',
  'PROVIDER',
  true,
  NOW(),
  NOW()
);

-- Verify users created
SELECT email, first_name, last_name, role FROM users;
```

## Step 10: Access the Application

1. Open browser: **http://localhost:3000**
2. Login with:
   - **Email**: admin@example.com
   - **Password**: admin123

## Development Tools Setup

### VS Code Extensions

Install recommended extensions:

```bash
code --install-extension vscjava.vscode-java-pack
code --install-extension vmware.vscode-spring-boot
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

### IntelliJ IDEA Setup

1. Open `ciyex` folder as project
2. Enable Lombok plugin
3. Enable Gradle auto-import
4. Set Java SDK to 21
5. Enable annotation processing

### Git Configuration

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Enable credential caching
git config --global credential.helper cache
```

## Verification Checklist

- [ ] Java 21 installed and verified
- [ ] Node.js 22+ and pnpm installed
- [ ] PostgreSQL running and accessible
- [ ] Database and schema created
- [ ] Backend repository cloned
- [ ] Frontend repository cloned
- [ ] Backend builds successfully
- [ ] Frontend dependencies installed
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can login with test user
- [ ] Can navigate to dashboard

## Troubleshooting

### Java Version Issues

```bash
# Check current Java version
java -version

# If wrong version, use SDKMAN
sdk list java
sdk use java 21.0.1-tem
```

### Port Already in Use

```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or use different port
./gradlew bootRun --args='--server.port=8081'
```

### Database Connection Failed

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# If using Docker
docker ps | grep postgres

# Check logs
docker logs ciyex-postgres
```

### Gradle Build Fails

```bash
# Clear Gradle cache
rm -rf ~/.gradle/caches

# Clean and rebuild
./gradlew clean build --refresh-dependencies
```

### Frontend Build Errors

```bash
# Clear node modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Next.js cache
rm -rf .next
pnpm run dev
```

## Next Steps

- [Environment Configuration](../reference/environment-variables.md) - Configure environment variables
- [Database Setup](database-setup.md) - Advanced database configuration
- [Development Workflow](../development/workflow.md) - Git workflow and best practices
- [Testing](../development/testing.md) - Run tests

## Getting Help

- [Troubleshooting Guide](../operations/troubleshooting.md)
- [GitHub Discussions](https://github.com/ciyex-org/ciyex/discussions)
- [Discord Community](https://discord.gg/ciyex)
