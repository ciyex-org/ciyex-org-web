# Compliance Guide

Meeting regulatory requirements (HIPAA, ONC, GDPR).

## HIPAA (USA)

### Privacy Rule
- **Role-Based Access**: Use strict RBAC. Minimal necessary access.
- **Consent**: Tracking patient consent for data sharing.

### Security Rule
- **Encryption**: See [Encryption](encryption.md).
- **Backup**: See [Backup & Restore](../operations/backup.md).
- **Disaster Recovery**: Tested periodically.

### Breach Notification
- System alerts admins on suspicious mass data exports.

## ONC (21st Century Cures Act)

### Interoperability
- **FHIR R4**: We support the US Core Implementation Guide.
- **Patient Access API**: Patients can connect third-party apps via SMART on FHIR.

### Information Blocking
- The system is designed not to block data.
- Audit logs track all Data Sharing requests.

## GDPR (Europe) / CCPA

### Right to be Forgotten
- **Feature**: "Anonymize Patient" function.
- **Soft Delete**: Data is scrubbed from active tables but retained in backups for legal reasons (if conflicting with retention laws).

### Data Portability
- **Export**: Patients can download their full record as a ZIP (CCDA/PDF/JSON).

## Business Associate Agreement (BAA)

- **Cloud**: We sign BAAs with AWS/Azure.
- **Third-Party**: Twilio, Stripe, etc., must be HIPAA settings enabled.
