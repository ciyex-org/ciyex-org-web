---
slug: security-first
title: "Security First: Protecting Patient Data"
authors: [ciyex_team]
tags: [security, hipaa, encryption]
---

In healthcare, security isn't a feature—it's a requirement. Here is how Ciyex keeps PHI safe.

<!-- truncate -->

## Encryption Everywhere
*   **At Rest**: All database volumes and S3 buckets are encrypted using AES-256.
*   **In Transit**: We enforce TLS 1.3 for all connections. Internal service-to-service traffic is encrypted via mTLS.

## Authentication
We use **Keycloak** for robust Identity and Access Management (IAM).
*   **OIDC/OAuth2**: Industry-standard protocols.
*   **MFA**: Multi-Factor Authentication is enforced for all provider accounts.

## Audit Logging
Every access to a patient record is logged immutably.
> "Who viewed Patient X's chart on Tuesday?"

Our audit logs answer this instantly, ensuring full HIPAA compliance for your practice.
