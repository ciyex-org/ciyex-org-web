# Docker Setup

Running Ciyex EHR using Docker Compose.

## Prerequisites
- Docker Engine
- Docker Compose

## Quick Start

1. **Clone Repo**:
   ```bash
   git clone https://github.com/ciyex-org/ciyex.git
   cd ciyex
   ```

2. **Start Services**:
   ```bash
   docker-compose up -d
   ```
   This spins up:
   - Postgres (DB)
   - Ciyex API (Backend)
   - Ciyex UI (Frontend)
   - MailHog (Email Test)

3. **Access**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8080`
   - MailHog: `http://localhost:8025`

## Docker Configuration

### Compose File (`docker-compose.yml`)

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: ciyexdb
      POSTGRES_PASSWORD: password

  api:
    build: .
    ports: ["8080:8080"]
    depends_on: [postgres]
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/ciyexdb
```

## Production Docker

For production, we use Multi-Stage builds to keep images small.

1. **Build**:
   ```bash
   docker build -t ciyex-api:prod .
   ```
2. **Run**:
   ```bash
   docker run -d -p 80:8080 \
     -e SPRING_PROFILES_ACTIVE=prod \
     ciyex-api:prod
   ```
