---
slug: tech-stack-deep-dive
title: "Under the Hood: The Ciyex Tech Stack"
authors: [dev_lead]
tags: [engineering, architecture, spring-boot]
image: /img/blog/hero-tech-stack.svg
---

Building a healthcare platform that handles protected health information (PHI), scales across thousands of concurrent users, and remains maintainable by an open source community requires deliberate technology choices. Every component in the Ciyex stack was selected for stability, security, and long-term viability. Here is a detailed look at what powers the platform and why we chose each piece.

<!-- truncate -->

## Backend: Spring Boot 4.0.1 on Java 21

The Ciyex API layer runs on **Spring Boot 4.0.1** with **Java 21**, the current long-term support release. We chose the JVM ecosystem for healthcare for several compelling reasons.

**Why Java for healthcare software?** Java has powered enterprise systems for over two decades. Banks, insurance companies, and government agencies trust it for mission-critical workloads. That track record matters when the software manages patient data. The JVM's garbage collection, type safety, and mature tooling reduce the risk of the kind of memory errors and runtime crashes that are unacceptable in clinical environments.

Java 21 brings virtual threads (Project Loom), which fundamentally change how we handle concurrent requests. Traditional thread-per-request models struggle under load because OS threads are expensive. Virtual threads are lightweight, allowing the server to handle thousands of simultaneous API calls without the complexity of reactive programming:

```java
@Bean
public TomcatProtocolHandlerCustomizer<?> protocolHandlerVirtualThreadExecutorCustomizer() {
    return protocolHandler -> {
        protocolHandler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
    };
}
```

Spring Boot 4.0.1 provides the framework layer: dependency injection, security filters, REST controller mapping, and auto-configuration. Spring Security integrates directly with our Keycloak identity provider via OAuth2 Resource Server, validating JWTs on every request without custom authentication code.

## Database: PostgreSQL 17 with Row-Level Security

We use **PostgreSQL 17** as our primary relational database. PostgreSQL is the most advanced open source relational database available, and version 17 brings improved performance for concurrent workloads, better JSON handling, and enhanced logical replication.

The critical feature for Ciyex is **Row-Level Security (RLS)**. In a multi-tenant healthcare platform, data isolation between organizations is non-negotiable. A query from Clinic A must never return Clinic B's patient records, even if a bug in the application layer fails to filter properly. RLS enforces this at the database engine level:

```sql
CREATE POLICY tenant_isolation ON patients
    USING (org_alias = current_setting('app.current_tenant'));
```

Every database connection sets the tenant context before executing queries. Even if application code omits a WHERE clause, PostgreSQL itself rejects cross-tenant data access. This is defense in depth applied at the storage layer.

**Flyway** manages all schema migrations. Every database change is a versioned SQL file (e.g., `V46__add_app_installations.sql`) checked into source control. Migrations run automatically on application startup, ensuring that every deployment has a consistent, reproducible schema. There is no manual SQL execution in production.

## FHIR Server: HAPI FHIR R4

Clinical data in Ciyex is stored on a **HAPI FHIR R4** server, the reference implementation of the HL7 FHIR specification. HAPI FHIR provides a complete, standards-compliant data layer for healthcare resources: Patient, Observation, Encounter, Condition, MedicationRequest, and dozens more.

We run HAPI FHIR with **partitioned multi-tenancy**, where each organization's data lives in a separate logical partition. The partition is derived from the authenticated user's JWT claims, ensuring that API calls are always scoped to the correct organization:

```
GET /sunrise-family-medicine/Patient?name=Smith
```

A custom `TenantPartitionInterceptor` enforces partition boundaries and validates SMART on FHIR scopes at the FHIR server level, providing a second layer of access control independent of the API gateway.

## Identity and Access Management: Keycloak

**Keycloak** handles all authentication and authorization. It supports:

- **OAuth2 and OpenID Connect** for standards-based authentication flows
- **Multi-factor authentication** with TOTP, WebAuthn, and SMS verification
- **Social login and identity brokering** for connecting external identity providers
- **Fine-grained role mapping** with realm roles and client roles

Each organization in Ciyex is mapped to a Keycloak organization, and user JWTs include an `organization` claim that the backend uses to set tenant context. This means authentication, authorization, and tenant scoping all flow from a single token, eliminating the class of bugs that arise from mismatched identity and tenant state.

## Caching: Caffeine

For frequently accessed, rarely changing data (UI color configurations, field metadata, role permissions), we use **Caffeine**, a high-performance, near-optimal in-memory cache for the JVM. Caffeine provides O(1) lookups with configurable TTLs and maximum sizes, reducing database round-trips for data that changes infrequently.

## Configuration: Spring Cloud Config Server with HashiCorp Vault

Application configuration flows through **Spring Cloud Config Server**, which serves environment-specific properties to all microservices. Sensitive values like database credentials, API keys, and encryption secrets are stored in **HashiCorp Vault** and injected at runtime. No secrets exist in source control or environment variables on disk.

## CI/CD: GitHub Actions and ArgoCD

The deployment pipeline is fully automated:

1. A developer pushes code to GitHub
2. **GitHub Actions** runs tests, builds the application, creates a Docker image, and pushes it to the container registry
3. **ArgoCD** detects the new image tag via its Image Updater component
4. ArgoCD reconciles the Kubernetes cluster state with the desired state, rolling out the new version with zero downtime

There are no manual deployment steps. No one runs `kubectl apply` in production. The Git repository is the single source of truth for what should be running, and ArgoCD enforces it continuously.

## Container Orchestration: Kubernetes

All Ciyex services run on **Kubernetes** across environment-specific clusters: `kube-dev` for development, `kube-stage` for staging, and `kube-prod` for production. Kubernetes provides:

- **Horizontal Pod Autoscaling** to handle variable clinic workloads
- **Rolling updates** for zero-downtime deployments
- **Persistent Volume Claims** for PostgreSQL data durability
- **Network policies** for service-to-service isolation
- **Ingress with cert-manager** for automatic TLS certificate provisioning via Let's Encrypt

## Why This Stack Matters for Healthcare

Every technology choice above serves a specific healthcare requirement. PostgreSQL RLS exists because HIPAA requires data isolation. Keycloak exists because clinics need MFA and audit-ready authentication. HAPI FHIR exists because the 21st Century Cures Act demands standardized data access. ArgoCD exists because healthcare software deployments must be traceable and reproducible.

This is not a stack assembled from trending technologies. It is a stack assembled from the requirements of safe, compliant, patient-centered healthcare software. And because every component is open source, the entire system can be audited, forked, and improved by anyone.
