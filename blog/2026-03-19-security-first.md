---
slug: security-first
title: "Security First: How Ciyex Protects Patient Data"
authors: [ciyex_team]
tags: [security, hipaa, encryption]
image: /img/blog/hero-security.svg
---

In healthcare software, a security breach is not an inconvenience. It is a violation of patient trust, a potential HIPAA violation carrying fines up to $1.5 million per incident category, and a risk to patient safety. Ciyex treats security as the foundational layer upon which every feature is built. This post details the specific mechanisms we use to protect protected health information (PHI) at every layer of the system.

<!-- truncate -->

## Encryption: Data at Rest and in Transit

All patient data in Ciyex is encrypted in both states.

**At rest**, database volumes and object storage buckets use AES-256 encryption. PostgreSQL data files, WAL logs, and backups are stored on encrypted volumes. File attachments stored in S3-compatible object storage (patient documents, imaging uploads, scanned forms) are encrypted server-side with AES-256 keys managed by the storage provider. Encryption keys are rotated on a defined schedule, and key material never resides on the same system as the encrypted data.

**In transit**, all connections enforce **TLS 1.3**, the latest version of the Transport Layer Security protocol. TLS 1.3 eliminates legacy cipher suites that were vulnerable to downgrade attacks, reduces the handshake to a single round-trip for improved performance, and provides forward secrecy by default. This means that even if a long-term key is compromised in the future, past session data remains protected.

For internal communication between microservices, we use **mutual TLS (mTLS)**. Unlike standard TLS where only the server presents a certificate, mTLS requires both the client and server to authenticate each other. This prevents an attacker who gains access to the internal network from impersonating a legitimate service:

```
Service A ←→ mTLS ←→ Service B
Both sides verify certificates before exchanging data
```

## Authentication: Keycloak and Multi-Factor Authentication

Ciyex uses **Keycloak** as its identity provider, supporting OAuth2 and OpenID Connect protocols. Every API request carries a JWT (JSON Web Token) that is validated against Keycloak's public key before the request reaches any business logic.

**Multi-factor authentication (MFA)** is enforced for all clinical users. Keycloak supports multiple second factors:

- **TOTP (Time-based One-Time Passwords)** via authenticator apps like Google Authenticator or Authy
- **WebAuthn/FIDO2** for hardware security keys (YubiKey, Titan)
- **SMS verification** as a fallback for environments where hardware tokens are impractical

Password policies enforce minimum length, complexity requirements, and breach detection (checking against known compromised password databases). Failed login attempts trigger progressive lockout, and all authentication events are logged for audit purposes.

## Authorization: RBAC with SMART on FHIR Scopes

Authentication answers "who are you?" Authorization answers "what can you do?" Ciyex implements a two-layer authorization model that provides both coarse-grained and fine-grained access control.

**Layer 1: Page-level permissions.** Each role (ADMIN, PROVIDER, NURSE, MA, FRONT_DESK, BILLING, PATIENT) has a `permissions` configuration that controls which sections of the application are visible. A front desk staff member sees the scheduling module but not the billing dashboard. A billing specialist sees claims but not clinical notes.

**Layer 2: API-level SMART scopes.** At the API layer, access is controlled by [SMART on FHIR](https://smarthealthit.org/) scopes. These follow the format `resource.action`, such as:

- `patient/Patient.read` allows reading patient demographics
- `patient/Observation.write` allows creating clinical observations
- `user/Encounter.read` allows reading encounters the user is associated with

The `SmartScopeResolver` loads scope definitions from the database, checking organization-specific overrides first, then falling back to system defaults. This means different organizations can customize access policies without code changes.

```java
// Scope resolution order:
// 1. Organization-specific config (org_alias = 'sunrise-family-medicine')
// 2. System default config (org_alias = '__SYSTEM__')
// 3. Static fallback (hardcoded minimum permissions)
```

## Multi-Tenant Data Isolation: PostgreSQL Row-Level Security

In a multi-tenant system, the most dangerous bug is a data leak between tenants. If Clinic A can see Clinic B's patients, the consequences are severe: HIPAA violations, loss of trust, potential legal liability.

Ciyex prevents this with **PostgreSQL Row-Level Security (RLS)**. Every table containing tenant-specific data has an RLS policy that filters rows based on the current tenant context. This context is set at the database session level by a Hibernate filter before any query executes:

```sql
-- Every query automatically includes this filter
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_policy ON clinical_notes
    USING (org_alias = current_setting('app.current_tenant'));
```

The tenant context flows from the JWT's `organization` claim through the `TenantFilter` into a `TenantContext` ThreadLocal, and then into the PostgreSQL session variable. This means:

1. The user authenticates with Keycloak and receives a JWT containing their organization
2. The `TenantFilter` extracts the organization and sets `TenantContext`
3. Every database query is automatically filtered to that organization's data
4. Even a SQL injection attack cannot access another organization's data, because the filter is enforced by the database engine itself

## Audit Logging

HIPAA requires that covered entities maintain records of who accessed what PHI and when. Ciyex logs every access to patient data with the following information:

- **Who**: The authenticated user's identity (from the JWT)
- **What**: The specific resource accessed (Patient ID, resource type)
- **When**: Timestamp with timezone
- **Where**: The IP address and user agent of the request
- **How**: The HTTP method and endpoint (GET, POST, PUT, DELETE)

> "An auditor asks: who viewed Patient Martinez's chart last Tuesday at 3pm? Our audit log provides the answer in seconds, including the specific sections viewed and any modifications made."

Audit logs are stored in an append-only fashion. They cannot be modified or deleted through the application. This immutability ensures that the audit trail is trustworthy for compliance reviews and incident investigations.

## HIPAA Compliance Posture

HIPAA compliance is not a checkbox. It is a continuous set of practices that span technology, policy, and operations. Ciyex addresses the technical safeguards required by the HIPAA Security Rule:

| Safeguard | Ciyex Implementation |
|---|---|
| Access Control | Keycloak RBAC + SMART scopes |
| Audit Controls | Immutable audit logging |
| Integrity Controls | Database constraints + checksums |
| Transmission Security | TLS 1.3 + mTLS |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Authentication | MFA via Keycloak |

Organizations deploying Ciyex are responsible for the administrative and physical safeguards (policies, training, physical security), but the software provides the technical foundation required for a complete HIPAA compliance program.

## Security as Open Source

One of the strongest arguments for open source healthcare software is security through transparency. Proprietary EHR vendors ask you to trust that their security is adequate. You cannot verify it. With Ciyex, every security mechanism described in this post is visible in the source code. Security researchers can audit it. Penetration testers can probe it. The community can identify and fix vulnerabilities faster than any single vendor's internal security team.

Security is not a feature we add after the fact. It is the foundation upon which Ciyex is built, and it is verifiable by anyone who cares to look.
