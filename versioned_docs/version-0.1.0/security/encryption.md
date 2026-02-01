# Encryption

Data protection strategies for Ciyex EHR.

## Encryption at Rest

### Database (PostgreSQL)
- **TDE (Transparent Data Encryption)**: Enabled via AWS RDS or storage-level encryption (LUKS) for on-premise.
- **Column-Level Encryption**: Sensitive columns (SSN, MRN) are encrypted using `pgcrypto` or application-level encryption.

### Application Level
We use `AES-256-GCM` for encrypting specific fields before persistence.
Keys are managed via **AWS KMS** or **HashiCorp Vault**.

```java
@Convert(converter = AttributeEncryptor.class)
private String ssn;
```

### File Storage (S3)
- All S3 buckets enforce `AES-256` server-side encryption (SSE-S3) or KMS (SSE-KMS).
- Public access is strictly blocked.

## Encryption in Transit

### TLS/SSL
- **Enforced**: All traffic must be over HTTPS (TLS 1.2 or 1.3).
- **Termination**: TLS is terminated at the Ingress Controller (NGINX/ALB).
- **Certificates**: Managed via Cert-Manager (Let's Encrypt) or AWS ACM.

### Internal Traffic
- Service-to-Service communication (e.g., API to Database) is encrypted via JDBC SSL.
- Service Mesh (Linkerd/Istio) can be enabled to enforce mTLS between pods.

## Key Management

### AWS KMS
- **Master Keys**: Customer Master Keys (CMKs) are generated in KMS.
- **Rotation**: Automatic yearly rotation enabled.

### Local Development
- Development keys are stored in `application-dev.yml` (GitIgnored) or passed via Env Vars.
- Never commit production keys to Git.
