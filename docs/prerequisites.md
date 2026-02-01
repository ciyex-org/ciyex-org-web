# Prerequisites

Complete list of prerequisites for developing, deploying, and running Ciyex EHR.

## Development Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Purpose | Download |
|----------|----------------|-------------|---------|----------|
| **Java** | 21 | 21.0.1+ | Backend runtime | [Adoptium](https://adoptium.net/) |
| **Node.js** | 20.0 | 22.0+ | Frontend runtime | [nodejs.org](https://nodejs.org/) |
| **pnpm** | 8.0 | Latest | Package manager | `npm install -g pnpm` |
| **PostgreSQL** | 15.0 | 16.0+ | Database | [postgresql.org](https://www.postgresql.org/) |
| **Git** | 2.30 | Latest | Version control | [git-scm.com](https://git-scm.com/) |
| **Gradle** | 8.0 | 8.5+ | Build tool (included in wrapper) | [gradle.org](https://gradle.org/) |

### Optional Development Tools

| Software | Purpose | Download |
|----------|---------|----------|
| **Docker** | Container runtime | [docker.com](https://www.docker.com/) |
| **Docker Compose** | Multi-container orchestration | Included with Docker Desktop |
| **Redis** | Caching (optional for local dev) | [redis.io](https://redis.io/) |
| **VS Code** | Code editor | [code.visualstudio.com](https://code.visualstudio.com/) |
| **IntelliJ IDEA** | Java IDE | [jetbrains.com](https://www.jetbrains.com/idea/) |
| **Postman** | API testing | [postman.com](https://www.postman.com/) |
| **pgAdmin** | PostgreSQL GUI | [pgadmin.org](https://www.pgadmin.org/) |

## Production Prerequisites

### Infrastructure

#### Kubernetes Cluster

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| **Kubernetes Version** | 1.28 | 1.29+ | K3s or standard K8s |
| **Control Plane Nodes** | 1 | 3 | High availability |
| **Worker Nodes** | 2 | 3+ | Application workloads |
| **CPU per Node** | 4 cores | 8 cores | |
| **RAM per Node** | 16GB | 32GB | |
| **Disk per Node** | 100GB SSD | 200GB NVMe | |
| **Network** | 1 Gbps | 10 Gbps | |

#### Database

| Component | Minimum | Recommended | Notes |
|-----------|---------|-------------|-------|
| **PostgreSQL Version** | 15.0 | 16.0+ | |
| **CPU** | 4 cores | 8 cores | |
| **RAM** | 8GB | 16GB+ | |
| **Storage** | 100GB SSD | 500GB NVMe | |
| **IOPS** | 3000 | 10000+ | |
| **Connections** | 100 | 200+ | |

#### Storage

| Component | Minimum | Recommended | Purpose |
|-----------|---------|-------------|---------|
| **S3-Compatible Storage** | 100GB | 500GB+ | Documents, images |
| **Backup Storage** | 200GB | 1TB+ | Database backups |
| **Longhorn Storage** | 100GB per node | 200GB per node | Persistent volumes |

### Required Services

#### Authentication

- **Keycloak Server**
  - Version: 22.0+
  - Realm configured
  - Client created
  - Groups configured

#### External Services

| Service | Purpose | Provider Options |
|---------|---------|------------------|
| **SMTP Server** | Email notifications | SendGrid, AWS SES, Mailgun |
| **SMS Gateway** | SMS notifications | Twilio, Telnyx |
| **Video Conferencing** | Telehealth | Jitsi Meet (self-hosted or cloud) |
| **Payment Processing** | Billing | Stripe |
| **Object Storage** | Documents | AWS S3, OVH S3, MinIO |

### SSL/TLS Certificates

- **Domain Names** - Registered domains for each environment
- **SSL Certificates** - Let's Encrypt or commercial CA
- **Cert-Manager** - Automated certificate management in Kubernetes

## Deployment Tools

### Required

| Tool | Minimum Version | Purpose | Download |
|------|----------------|---------|----------|
| **Terraform** | 1.5.0 | Infrastructure as Code | [terraform.io](https://www.terraform.io/) |
| **kubectl** | 1.28 | Kubernetes CLI | [kubernetes.io](https://kubernetes.io/docs/tasks/tools/) |
| **Helm** | 3.12 | Kubernetes package manager | [helm.sh](https://helm.sh/) |

### Optional

| Tool | Purpose | Download |
|------|---------|----------|
| **k9s** | Kubernetes TUI | [k9scli.io](https://k9scli.io/) |
| **kubectx** | Context switching | [github.com](https://github.com/ahmetb/kubectx) |
| **stern** | Multi-pod log tailing | [github.com](https://github.com/stern/stern) |
| **Lens** | Kubernetes IDE | [k8slens.dev](https://k8slens.dev/) |

## Access Requirements

### Development

- **GitHub Access** - Clone repositories
- **Local Admin** - Install software
- **Database Access** - Create databases and users

### Production

| Access Type | Purpose | Required For |
|-------------|---------|--------------|
| **SSH Access** | Server management | Infrastructure team |
| **kubectl Access** | Kubernetes management | DevOps team |
| **Database Access** | Database administration | DBA team |
| **Registry Access** | Push/pull container images | CI/CD pipeline |
| **DNS Management** | Configure domains | Infrastructure team |
| **Cloud Provider** | Manage cloud resources | Infrastructure team |

## Credentials & Secrets

### Development

```bash
# Database
DB_USERNAME=ciyex
DB_PASSWORD=ciyex123

# Keycloak (optional for local)
KEYCLOAK_CLIENT_SECRET=local-secret

# S3 (optional for local)
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
```

### Production

Required secrets (store in Kubernetes secrets or vault):

```bash
# Database
POSTGRES_PASSWORD=<secure-password>

# Keycloak
KEYCLOAK_CLIENT_SECRET=<client-secret>

# S3
AWS_ACCESS_KEY_ID=<access-key>
AWS_SECRET_ACCESS_KEY=<secret-key>

# SMTP
SMTP_PASSWORD=<smtp-password>

# SMS
TWILIO_AUTH_TOKEN=<auth-token>

# Stripe
STRIPE_SECRET_KEY=<secret-key>

# Jitsi
JITSI_APP_SECRET=<app-secret>

# Grafana
GRAFANA_ADMIN_PASSWORD=<admin-password>
```

## Network Requirements

### Ports

#### Development

| Port | Service | Protocol | Access |
|------|---------|----------|--------|
| 3000 | Next.js UI | HTTP | localhost |
| 8080 | Spring Boot API | HTTP | localhost |
| 5432 | PostgreSQL | TCP | localhost |
| 6379 | Redis | TCP | localhost (optional) |

#### Production

| Port | Service | Protocol | Access |
|------|---------|----------|--------|
| 80 | HTTP | HTTP | Public |
| 443 | HTTPS | HTTPS | Public |
| 6443 | Kubernetes API | HTTPS | Private |
| 5432 | PostgreSQL | TCP | Private |
| 6379 | Redis | TCP | Private |

### Firewall Rules

**Inbound**:
- Allow 80/443 from internet (HTTPS traffic)
- Allow 6443 from DevOps IPs (Kubernetes API)
- Allow 22 from admin IPs (SSH)

**Outbound**:
- Allow 443 to internet (API calls, updates)
- Allow 25/587 to SMTP servers (Email)
- Allow 5432 between nodes (Database replication)

### DNS Records

```
# Production
app.example.com          → Load Balancer IP
api.example.com          → Load Balancer IP
fhir.example.com         → Load Balancer IP

# Staging
app-stage.example.com    → Staging Load Balancer IP
api-stage.example.com    → Staging Load Balancer IP

# Development
app-dev.example.com      → Dev Load Balancer IP
api-dev.example.com      → Dev Load Balancer IP
```

## Resource Estimates

### Small Practice (1-10 providers)

**Infrastructure**:
- 3 Kubernetes nodes (4 CPU, 16GB RAM each)
- 1 PostgreSQL instance (4 CPU, 8GB RAM, 100GB storage)
- 100GB S3 storage

**Monthly Cost**: ~$300-500 (cloud) or ~$150-250 (bare metal)

### Medium Practice (10-50 providers)

**Infrastructure**:
- 5 Kubernetes nodes (8 CPU, 32GB RAM each)
- 1 PostgreSQL instance (8 CPU, 16GB RAM, 500GB storage)
- 500GB S3 storage

**Monthly Cost**: ~$800-1200 (cloud) or ~$400-600 (bare metal)

### Large Practice (50+ providers)

**Infrastructure**:
- 10+ Kubernetes nodes (16 CPU, 64GB RAM each)
- PostgreSQL cluster (16 CPU, 32GB RAM, 1TB+ storage)
- 2TB+ S3 storage

**Monthly Cost**: ~$2000-4000 (cloud) or ~$1000-2000 (bare metal)

## Compliance Requirements

### HIPAA

- **Business Associate Agreement** - With cloud provider
- **Encryption** - At rest and in transit
- **Audit Logging** - ONC-compliant audit trails
- **Access Controls** - Role-based access control
- **Backup & DR** - Regular backups and disaster recovery plan

### GDPR (if applicable)

- **Data Processing Agreement** - With cloud provider
- **Right to Erasure** - Patient data deletion capability
- **Data Portability** - Export patient data
- **Consent Management** - Track patient consent

## Skill Requirements

### Development Team

- **Backend Developer**
  - Java 21
  - Spring Boot 4.0
  - PostgreSQL
  - REST API design
  - FHIR knowledge (optional)

- **Frontend Developer**
  - React 18
  - Next.js 16
  - TypeScript
  - Tailwind CSS
  - Healthcare UI/UX

### Operations Team

- **DevOps Engineer**
  - Kubernetes
  - Terraform
  - CI/CD (Jenkins, GitHub Actions)
  - Monitoring (Prometheus, Grafana)
  - Linux administration

- **Database Administrator**
  - PostgreSQL administration
  - Backup and recovery
  - Performance tuning
  - Replication setup

### Security Team

- **Security Engineer**
  - HIPAA compliance
  - Penetration testing
  - Security auditing
  - Incident response

## Verification Checklist

Before starting development:

- [ ] Java 21 installed and verified (`java -version`)
- [ ] Node.js 20+ installed (`node -v`)
- [ ] pnpm installed (`pnpm -v`)
- [ ] PostgreSQL 15+ installed and running
- [ ] Git configured with credentials
- [ ] GitHub access to repositories
- [ ] IDE installed and configured
- [ ] Docker installed (optional)

Before deploying to production:

- [ ] Kubernetes cluster provisioned
- [ ] kubectl access configured
- [ ] Helm installed
- [ ] Terraform installed
- [ ] Domain names registered
- [ ] SSL certificates configured
- [ ] Keycloak server setup
- [ ] Database server provisioned
- [ ] S3 storage configured
- [ ] SMTP server configured
- [ ] Monitoring setup (Prometheus/Grafana)
- [ ] Backup solution configured
- [ ] All secrets stored securely
- [ ] Firewall rules configured
- [ ] DNS records created
- [ ] HIPAA compliance reviewed

## Next Steps

- [Local Development Setup](installation/local-setup.md) - Set up development environment
- [Kubernetes Deployment](deployment/kubernetes.md) - Deploy to production
- [Security Best Practices](security/best-practices.md) - Secure your deployment
