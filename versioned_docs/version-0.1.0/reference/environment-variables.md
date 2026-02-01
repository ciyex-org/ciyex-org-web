# Environment Variables

Complete reference for configuring Ciyex EHR environment variables.

## Overview

Ciyex EHR uses environment variables for configuration across different environments (development, staging, production). This guide covers all available environment variables and their usage.

## Backend (Spring Boot)

### Database Configuration

```bash
# PostgreSQL connection
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ciyexdb
SPRING_DATASOURCE_USERNAME=ciyex
SPRING_DATASOURCE_PASSWORD=your-secure-password

# Connection pool settings
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=20
SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE=5
SPRING_DATASOURCE_HIKARI_CONNECTION_TIMEOUT=30000
```

### Keycloak Configuration

```bash
# Keycloak server
KEYCLOAK_AUTH_SERVER_URL=https://aran-stg.zpoa.com
KEYCLOAK_REALM=master
KEYCLOAK_RESOURCE=ciyex-app
KEYCLOAK_CREDENTIALS_SECRET=your-client-secret

# JWT configuration
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRATION=3600
JWT_REFRESH_EXPIRATION=86400
```

### AWS Configuration

```bash
# S3 for document storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=ciyex-documents
AWS_S3_ENDPOINT=https://s3.us-east-1.amazonaws.com
```

### Stripe Configuration

```bash
# Stripe payment processing
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Email Configuration

```bash
# SMTP settings
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=noreply@ciyex.org
SPRING_MAIL_PASSWORD=your-app-password
SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true
SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true
```

### Application Settings

```bash
# Server configuration
SERVER_PORT=8080
SERVER_SERVLET_CONTEXT_PATH=/

# Application name
SPRING_APPLICATION_NAME=ciyex-api

# Active profile
SPRING_PROFILES_ACTIVE=prod

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_QIABEN_CIYEX=DEBUG
LOGGING_FILE_NAME=/var/log/ciyex/application.log
```

### FHIR Server Configuration

```bash
# HAPI FHIR server
FHIR_SERVER_URL=http://localhost:8081/fhir
FHIR_SERVER_ENABLED=true
```

### Telehealth Configuration

```bash
# Jitsi configuration
JITSI_DOMAIN=meet.jit.si
JITSI_ROOM_PREFIX=ciyex-
```

## Frontend (Next.js)

### API Configuration

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_TIMEOUT=30000
```

### Authentication

```bash
# Keycloak
NEXT_PUBLIC_KEYCLOAK_URL=https://aran-stg.zpoa.com
NEXT_PUBLIC_KEYCLOAK_REALM=master
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=ciyex-app
```

### Stripe

```bash
# Stripe publishable key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Telehealth

```bash
# Jitsi
NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si
```

### Analytics

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## HAPI FHIR Server

### Database

```bash
# PostgreSQL
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/fhirdb
SPRING_DATASOURCE_USERNAME=fhir
SPRING_DATASOURCE_PASSWORD=your-password
```

### FHIR Configuration

```bash
# FHIR version
HAPI_FHIR_VERSION=R4

# Server base URL
HAPI_FHIR_SERVER_ADDRESS=http://localhost:8081/fhir

# Enable subscriptions
HAPI_FHIR_SUBSCRIPTION_ENABLED=true
```

### Multi-Tenancy

```bash
# Enable multi-tenancy
HAPI_FHIR_PARTITIONING_ENABLED=true
HAPI_FHIR_PARTITIONING_MULTITENANCY_ENABLED=true
```

## Kubernetes Secrets

### Create Secrets

```bash
# Database credentials
kubectl create secret generic postgres-credentials \
  --from-literal=username=ciyex \
  --from-literal=password=your-password \
  --namespace=ciyex-prod

# JWT secret
kubectl create secret generic jwt-secret \
  --from-literal=secret=your-256-bit-secret \
  --namespace=ciyex-prod

# AWS credentials
kubectl create secret generic aws-credentials \
  --from-literal=access-key=your-access-key \
  --from-literal=secret-key=your-secret-key \
  --namespace=ciyex-prod

# Stripe credentials
kubectl create secret generic stripe-credentials \
  --from-literal=secret-key=sk_live_... \
  --from-literal=publishable-key=pk_live_... \
  --from-literal=webhook-secret=whsec_... \
  --namespace=ciyex-prod
```

### Use in Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ciyex-api
spec:
  template:
    spec:
      containers:
      - name: ciyex-api
        env:
        - name: SPRING_DATASOURCE_USERNAME
          valueFrom:
            secretKeyRef:
              name: postgres-credentials
              key: username
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-credentials
              key: password
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: secret
        - name: AWS_ACCESS_KEY_ID
          valueFrom:
            secretKeyRef:
              name: aws-credentials
              key: access-key
        - name: AWS_SECRET_ACCESS_KEY
          valueFrom:
            secretKeyRef:
              name: aws-credentials
              key: secret-key
```

## Environment-Specific Configurations

### Development

```bash
# .env.development
SPRING_PROFILES_ACTIVE=dev
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ciyexdb_dev
LOGGING_LEVEL_ROOT=DEBUG
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Staging

```bash
# .env.staging
SPRING_PROFILES_ACTIVE=staging
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-stage:5432/ciyexdb
LOGGING_LEVEL_ROOT=INFO
NEXT_PUBLIC_API_URL=https://api-stage.example.com
```

### Production

```bash
# .env.production
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-prod:5432/ciyexdb
LOGGING_LEVEL_ROOT=WARN
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Docker Compose

### Example Configuration

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-ciyexdb}
      POSTGRES_USER: ${POSTGRES_USER:-ciyex}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-password}
    ports:
      - "5432:5432"

  api:
    build: ./ciyex
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/${POSTGRES_DB:-ciyexdb}
      SPRING_DATASOURCE_USERNAME: ${POSTGRES_USER:-ciyex}
      SPRING_DATASOURCE_PASSWORD: ${POSTGRES_PASSWORD:-password}
      JWT_SECRET: ${JWT_SECRET}
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
    ports:
      - "8080:8080"
    depends_on:
      - postgres

  ui:
    build: ./ciyex-ehr-ui
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${STRIPE_PUBLISHABLE_KEY}
    ports:
      - "3000:3000"
    depends_on:
      - api
```

## Validation

### Required Variables

**Backend**:
- ✅ `SPRING_DATASOURCE_URL`
- ✅ `SPRING_DATASOURCE_USERNAME`
- ✅ `SPRING_DATASOURCE_PASSWORD`
- ✅ `JWT_SECRET`
- ✅ `KEYCLOAK_AUTH_SERVER_URL`

**Frontend**:
- ✅ `NEXT_PUBLIC_API_URL`
- ✅ `NEXT_PUBLIC_KEYCLOAK_URL`
- ✅ `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID`

### Validation Script

```bash
#!/bin/bash
# validate-env.sh

REQUIRED_VARS=(
  "SPRING_DATASOURCE_URL"
  "SPRING_DATASOURCE_USERNAME"
  "SPRING_DATASOURCE_PASSWORD"
  "JWT_SECRET"
  "KEYCLOAK_AUTH_SERVER_URL"
)

MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    MISSING_VARS+=("$var")
  fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
  echo "Error: Missing required environment variables:"
  printf '  - %s\n' "${MISSING_VARS[@]}"
  exit 1
fi

echo "All required environment variables are set"
```

## Security Best Practices

1. **Never Commit Secrets** - Use `.gitignore` for `.env` files
2. **Use Strong Secrets** - Generate random 256-bit keys
3. **Rotate Regularly** - Rotate secrets every 90 days
4. **Limit Access** - Use least privilege principle
5. **Use Secrets Managers** - AWS Secrets Manager, HashiCorp Vault
6. **Encrypt at Rest** - Encrypt Kubernetes secrets
7. **Audit Access** - Log secret access

## Generating Secrets

### JWT Secret

```bash
# Generate 256-bit secret
openssl rand -base64 32
```

### Database Password

```bash
# Generate strong password
openssl rand -base64 24
```

### Keycloak Client Secret

```bash
# Generate client secret
uuidgen
```

## Troubleshooting

### Missing Environment Variable

**Error**: `Environment variable not set`

**Solution**:
```bash
# Check if variable is set
echo $SPRING_DATASOURCE_URL

# Set variable
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ciyexdb

# Or add to .env file
echo "SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ciyexdb" >> .env
```

### Invalid Database URL

**Error**: `Could not connect to database`

**Solution**:
```bash
# Verify URL format
# jdbc:postgresql://[host]:[port]/[database]

# Test connection
psql -h localhost -p 5432 -U ciyex -d ciyexdb
```

## Next Steps

- [Local Setup](../installation/local-setup.md) - Development setup
- [Kubernetes Deployment](../deployment/kubernetes.md) - Production deployment
- [Security Best Practices](../security/best-practices.md) - Security guidelines
- [Troubleshooting](../operations/troubleshooting.md) - Common issues
