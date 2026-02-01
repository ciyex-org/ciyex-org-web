# Database Setup

Configuring PostgreSQL for Ciyex EHR.

## Requirements
- PostgreSQL 16+
- PostGIS (Optional, for location features)

## Installation

### Local (Mac/Linux)
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Docker
```bash
docker run --name ciyex-postgres -e POSTGRES_PASSWORD=secret -d -p 5432:5432 postgres:16
```

## Configuration

1. **Create Database**:
   ```sql
   CREATE DATABASE ciyexdb;
   CREATE USER ciyex WITH ENCRYPTED PASSWORD 'secret';
   GRANT ALL PRIVILEGES ON DATABASE ciyexdb TO ciyex;
   ```

2. **Extensions** (Run as Superuser):
   ```sql
   \c ciyexdb
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
   ```

## Connection Settings

Update `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ciyexdb
    username: ciyex
    password: secret
```

## Troubleshooting

- **Connection Refused**: Check if Postgres is running and port 5432 is open.
- **Authentication Failed**: Verify username/password in `pg_hba.conf` or connection string.
