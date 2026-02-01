# Configuration Reference

Complete reference for all configuration options in Ciyex EHR.

## Backend Configuration (application.yml)

The backend is configured using `application.yml`. Below are all available properties.

### Server
| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | `8080` | Port the application runs on |
| `server.servlet.context-path` | `/` | Context path for the application |
| `server.compression.enabled` | `true` | Enable GZIP compression |

### Database
| Property | Default | Description |
|----------|---------|-------------|
| `spring.datasource.url` | - | JDBC URL for the database |
| `spring.datasource.username` | - | Database username |
| `spring.datasource.password` | - | Database password |
| `spring.datasource.hikari.maximum-pool-size` | `10` | Max connections in pool |
| `spring.jpa.hibernate.ddl-auto` | `validate` | Hibernate DDL mode |

### Security
| Property | Default | Description |
|----------|---------|-------------|
| `jwt.secret` | - | Secret key for signing JWTs |
| `jwt.expiration` | `3600` | Access token expiration in seconds |
| `jwt.refresh-expiration` | `86400` | Refresh token expiration in seconds |
| `cors.allowed-origins` | `*` | Allowed CORS origins |

### Integrations

#### AWS S3
| Property | Default | Description |
|----------|---------|-------------|
| `aws.s3.bucket` | - | S3 bucket name |
| `aws.region` | `us-east-1` | AWS region |
| `aws.access-key` | - | AWS access key ID |
| `aws.secret-key` | - | AWS secret access key |

#### Stripe
| Property | Default | Description |
|----------|---------|-------------|
| `stripe.api-key` | - | Stripe secret key |
| `stripe.publishable-key` | - | Stripe publishable key |
| `stripe.webhook-secret` | - | Stripe webhook signing secret |

#### Email
| Property | Default | Description |
|----------|---------|-------------|
| `spring.mail.host` | - | SMTP server host |
| `spring.mail.port` | `587` | SMTP server port |
| `spring.mail.username` | - | SMTP username |
| `spring.mail.password` | - | SMTP password |

### Telehealth
| Property | Default | Description |
|----------|---------|-------------|
| `jitsi.domain` | `meet.jit.si` | Jitsi Meet domain |
| `jitsi.app-id` | - | Jitsi App ID (PaaS) |
| `jitsi.secret` | - | Jitsi App Secret (PaaS) |

## Frontend Configuration (.env)

The frontend is configured using environment variables.

### Build & Runtime
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API |
| `NODE_ENV` | Environment (`development`, `production`) |

### Features
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ENABLE_TELEHEALTH` | Enable/disable telehealth features |
| `NEXT_PUBLIC_ENABLE_BILLING` | Enable/disable billing features |

### Third-Party Keys
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for UI |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking |

## Feature Flags

Features can be toggled via database configuration or environment variables.

```yaml
features:
  telehealth:
    enabled: true
  billing:
    enabled: true
  waitlist:
    enabled: false
```

## Logging Configuration

Logging levels can be configured per package.

```yaml
logging:
  level:
    root: INFO
    com.qiaben.ciyex: DEBUG
    org.springframework.web: WARN
    org.hibernate.SQL: DEBUG
```

## Profiles

Spring profiles allow for environment-specific configuration.

- `dev`: Local development (H2 database, mock services)
- `staging`: Staging environment (PostgreSQL, external services)
- `prod`: Production environment (Optimized settings)

Activate a profile:
```bash
java -jar -Dspring.profiles.active=prod app.jar
```
