# System Architecture

This document provides a comprehensive overview of the Ciyex EHR system architecture, including all components, their interactions, and deployment patterns.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Browser]
        MOBILE[Mobile App<br/>Future]
    end
    
    subgraph "Load Balancing & Ingress"
        LB[Load Balancer<br/>NGINX Ingress]
        SSL[SSL/TLS<br/>Cert-Manager]
    end
    
    subgraph "Application Layer"
        UI1[Next.js UI<br/>Instance 1]
        UI2[Next.js UI<br/>Instance 2]
        API1[Spring Boot API<br/>Instance 1]
        API2[Spring Boot API<br/>Instance 2]
        FHIR1[HAPI FHIR<br/>Instance 1]
        FHIR2[HAPI FHIR<br/>Instance 2]
    end
    
    subgraph "Authentication & Authorization"
        KC[Keycloak<br/>Aran ID]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL<br/>Primary)]
        PG_REPLICA[(PostgreSQL<br/>Replica)]
    end
    
    subgraph "Storage & Cache"
        S3[AWS S3<br/>Documents]
        CACHE[Redis<br/>Cache]
    end
    
    subgraph "External Services"
        STRIPE[Stripe<br/>Payments]
        JITSI[Jitsi<br/>Video]
        SMTP[SMTP<br/>Email]
        SMS[Twilio/Telnyx<br/>SMS]
        AI[Azure OpenAI<br/>AI Features]
    end
    
    subgraph "Monitoring & Logging"
        PROM[Prometheus<br/>Metrics]
        GRAF[Grafana<br/>Dashboards]
        LOKI[Loki<br/>Logs]
    end
    
    subgraph "Backup & DR"
        VELERO[Velero<br/>K8s Backup]
        LONGHORN[Longhorn<br/>Storage]
    end
    
    WEB --> LB
    MOBILE -.-> LB
    LB --> SSL
    SSL --> UI1
    SSL --> UI2
    UI1 --> API1
    UI2 --> API2
    UI1 --> FHIR1
    UI2 --> FHIR2
    API1 --> KC
    API2 --> KC
    FHIR1 --> KC
    FHIR2 --> KC
    API1 --> PG
    API2 --> PG
    FHIR1 --> PG
    FHIR2 --> PG
    PG --> PG_REPLICA
    API1 --> S3
    API2 --> S3
    API1 --> CACHE
    API2 --> CACHE
    API1 --> STRIPE
    API1 --> JITSI
    API1 --> SMTP
    API1 --> SMS
    API1 --> AI
    PROM --> API1
    PROM --> API2
    PROM --> FHIR1
    GRAF --> PROM
    LOKI --> UI1
    LOKI --> API1
    VELERO --> LONGHORN
```

## Component Overview

### Frontend Layer

#### Next.js UI Application
- **Technology**: Next.js 16, React 18, Tailwind CSS 4.0
- **Features**:
  - Server-side rendering (SSR) for better SEO
  - Static site generation (SSG) for performance
  - API routes for backend proxy
  - Responsive design for all devices
- **Key Components**:
  - Patient management interface
  - Appointment scheduler
  - Clinical documentation forms
  - Telehealth video interface
  - Billing and payments UI

### Backend Layer

#### Spring Boot API
- **Technology**: Spring Boot 4.0, Java 21
- **Architecture Pattern**: Layered architecture
  - **Controllers**: REST endpoints
  - **Services**: Business logic
  - **Repositories**: Data access
  - **Entities**: Domain models
- **Key Features**:
  - RESTful API
  - OAuth2 resource server
  - Multi-schema support
  - Audit logging
  - File upload/download
  - Payment processing
  - Email/SMS notifications

#### HAPI FHIR Server
- **Technology**: HAPI FHIR 8.2.1 (R4)
- **Features**:
  - Full FHIR R4 compliance
  - Multi-tenant partitioning
  - Custom interceptors
  - SMART on FHIR support
- **Resources Supported**:
  - Patient, Practitioner, Organization
  - Encounter, Observation, Condition
  - MedicationRequest, AllergyIntolerance
  - Appointment, Schedule
  - And more...

### Authentication & Authorization

#### Keycloak (Aran ID)
- **Features**:
  - OAuth2/OIDC provider
  - Single Sign-On (SSO)
  - User federation
  - Group-based access control
  - Multi-factor authentication
- **Integration**:
  - JWT token validation
  - Role and group mapping
  - Custom claims support

### Data Layer

#### PostgreSQL Database
- **Version**: PostgreSQL 15+
- **Architecture**: Multi-schema
  - `public` schema: Shared configuration
  - `practice_1`, `practice_2`, etc.: Practice-specific data
- **Features**:
  - ACID compliance
  - Row-level security
  - Full-text search
  - JSON/JSONB support
- **Backup Strategy**:
  - Continuous WAL archiving
  - Daily full backups
  - Point-in-time recovery

#### Redis Cache
- **Purpose**: Session management, caching
- **Use Cases**:
  - API response caching
  - Rate limiting
  - Real-time features

### Storage

#### AWS S3
- **Purpose**: Document storage
- **Stored Items**:
  - Patient documents
  - Medical images
  - Lab reports
  - Message attachments
  - Backup archives

#### Longhorn
- **Purpose**: Persistent volumes for Kubernetes
- **Features**:
  - Distributed block storage
  - Snapshot and backup
  - Disaster recovery
  - Volume replication

## Deployment Architecture

### Single-Schema Per Instance (Recommended)

```mermaid
graph TB
    subgraph "Practice 1 Deployment"
        UI1[Next.js UI<br/>practice1.example.com]
        API1[Spring Boot API<br/>api-practice1.example.com]
        FHIR1[HAPI FHIR<br/>fhir-practice1.example.com]
    end
    
    subgraph "Practice 2 Deployment"
        UI2[Next.js UI<br/>practice2.example.com]
        API2[Spring Boot API<br/>api-practice2.example.com]
        FHIR2[HAPI FHIR<br/>fhir-practice2.example.com]
    end
    
    subgraph "Shared Services"
        KC[Keycloak]
        PG[(PostgreSQL)]
        S3[AWS S3]
    end
    
    UI1 --> API1
    UI1 --> FHIR1
    UI2 --> API2
    UI2 --> FHIR2
    API1 --> KC
    API2 --> KC
    API1 --> PG
    API2 --> PG
    FHIR1 --> PG
    FHIR2 --> PG
    API1 --> S3
    API2 --> S3
    
    style UI1 fill:#e1f5ff
    style API1 fill:#e1f5ff
    style FHIR1 fill:#e1f5ff
    style UI2 fill:#fff3e0
    style API2 fill:#fff3e0
    style FHIR2 fill:#fff3e0
```

**Benefits**:
- Complete process isolation
- Independent scaling per practice
- Simpler troubleshooting
- Better security and compliance
- No tenant header required

### Multi-Tenant (Legacy)

```mermaid
graph TB
    subgraph "Shared Deployment"
        UI[Next.js UI<br/>app.example.com]
        API[Spring Boot API<br/>api.example.com]
        FHIR[HAPI FHIR<br/>fhir.example.com]
    end
    
    subgraph "Shared Services"
        KC[Keycloak]
        PG[(PostgreSQL)]
    end
    
    UI -->|X-Tenant-Name: practice1| API
    UI -->|X-Tenant-Name: practice2| API
    API --> KC
    API -->|SET search_path| PG
    FHIR --> PG
```

**Drawbacks**:
- Shared resources and memory
- Complex tenant resolution
- Header-based routing risk
- Harder to troubleshoot

> See [Deployment Models](deployment-models.md) for detailed comparison.

## Data Flow

### Patient Creation Flow

```mermaid
sequenceDiagram
    participant UI as Next.js UI
    participant API as Spring Boot API
    participant KC as Keycloak
    participant DB as PostgreSQL
    participant FHIR as HAPI FHIR
    
    UI->>KC: Login (username/password)
    KC->>UI: JWT Token
    
    UI->>API: POST /api/patients (JWT)
    API->>KC: Validate JWT
    KC->>API: Token Valid + Claims
    API->>DB: INSERT INTO practice_1.patients
    DB->>API: Patient Created
    API->>FHIR: POST /fhir/Patient
    FHIR->>DB: Store FHIR Resource
    DB->>FHIR: Success
    FHIR->>API: FHIR Patient ID
    API->>UI: Patient Created Response
```

### Appointment Scheduling Flow

```mermaid
sequenceDiagram
    participant UI as Next.js UI
    participant API as Spring Boot API
    participant DB as PostgreSQL
    participant EMAIL as SMTP Service
    participant SMS as Twilio/Telnyx
    
    UI->>API: POST /api/appointments
    API->>DB: Check provider availability
    DB->>API: Available slots
    API->>DB: INSERT appointment
    DB->>API: Appointment created
    API->>EMAIL: Send confirmation email
    API->>SMS: Send SMS reminder
    API->>UI: Appointment confirmed
```

## Security Architecture

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as Next.js UI
    participant KC as Keycloak
    participant API as Spring Boot API
    
    User->>UI: Enter credentials
    UI->>KC: POST /realms/master/protocol/openid-connect/token
    KC->>KC: Validate credentials
    KC->>UI: Access Token + Refresh Token
    UI->>UI: Store tokens in localStorage
    UI->>API: API Request (Bearer Token)
    API->>KC: Validate token (JWK)
    KC->>API: Token valid + user info
    API->>API: Check permissions
    API->>UI: Response
```

### Authorization Layers

1. **Network Layer**: Kubernetes NetworkPolicies
2. **Ingress Layer**: NGINX authentication
3. **Application Layer**: Spring Security
4. **Data Layer**: PostgreSQL row-level security

## Monitoring & Observability

### Metrics Collection

```mermaid
graph LR
    APP[Applications] -->|Metrics| PROM[Prometheus]
    PROM -->|Query| GRAF[Grafana]
    PROM -->|Alerts| AM[Alertmanager]
    AM -->|Notifications| TEAMS[MS Teams]
    AM -->|Notifications| EMAIL[Email]
```

**Metrics Collected**:
- HTTP request rates and latencies
- Database connection pool stats
- JVM memory and GC metrics
- Custom business metrics

### Logging Architecture

```mermaid
graph LR
    APP[Applications] -->|Logs| LOKI[Loki]
    LOKI -->|Query| GRAF[Grafana]
    APP -->|Structured Logs| JSON[JSON Format]
```

**Log Levels**:
- ERROR: Application errors
- WARN: Warning conditions
- INFO: General information
- DEBUG: Detailed debugging (dev only)

## Scalability

### Horizontal Scaling

- **Frontend**: Scale UI pods based on CPU/memory
- **Backend**: Scale API pods based on request rate
- **FHIR**: Scale FHIR pods based on FHIR API usage
- **Database**: Read replicas for read-heavy workloads

### Vertical Scaling

- Increase pod resource limits
- Upgrade database instance size
- Optimize JVM heap settings

## Disaster Recovery

### Backup Strategy

1. **Database Backups**:
   - Continuous WAL archiving to S3
   - Daily full backups
   - 30-day retention

2. **Kubernetes Backups**:
   - Velero daily backups
   - Includes all resources and PVCs
   - 7-day retention

3. **Document Backups**:
   - S3 versioning enabled
   - Cross-region replication

### Recovery Procedures

- **RTO** (Recovery Time Objective): 4 hours
- **RPO** (Recovery Point Objective): 1 hour

See [Backup & Restore](../operations/backup.md) for detailed procedures.

## Performance Considerations

### Database Optimization
- Connection pooling (HikariCP)
- Query optimization and indexing
- Partitioning for large tables
- Read replicas for reporting

### Caching Strategy
- Redis for session data
- Application-level caching (Caffeine)
- HTTP caching headers
- CDN for static assets

### API Performance
- Async processing for long operations
- Pagination for large result sets
- Compression (gzip)
- Rate limiting

## Next Steps

- [Backend Architecture](backend-architecture.md) - Deep dive into Spring Boot
- [Frontend Architecture](frontend-architecture.md) - Deep dive into Next.js
- [FHIR Integration](fhir-integration.md) - HAPI FHIR details
- [Deployment Models](deployment-models.md) - Compare deployment options
