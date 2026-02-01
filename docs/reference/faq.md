# FAQ

Frequently Asked Questions.

## General

**Q: Is Ciyex EHR open source?**
A: Yes, Ciyex Core is open source. Enterprise features are available under a commercial license.

**Q: Is it HIPAA compliant?**
A: Ciyex provides the technical controls (Encryption, Audit Logs, RBAC) to build a HIPAA-compliant system, but you must configure it correctly and sign BAAs.

## Technical

**Q: Can I run this on a Raspberry Pi?**
A: Technically yes, but for performance, we recommend at least 4GB RAM (2GB for JVM, 1GB for DB).

**Q: How do I reset the admin password?**
A: You can update the password directly in the Keycloak admin console or via the database if using local auth.

## Integration

**Q: Does it support HL7 v2?**
A: Currently we focus on FHIR R4. For HL7 v2, we recommend using an integration engine like Mirth Connect to convert HL7 to FHIR.

**Q: Can I connect my own PACS?**
A: Yes, if your PACS supports DICOMweb, you can configure it in `application.yml`.
