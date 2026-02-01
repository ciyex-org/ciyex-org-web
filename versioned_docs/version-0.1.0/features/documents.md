# Document Management

Guide to handling patient files, images, and scanned documents.

## Supported Formats
- **PDF**: Lab reports, referral letters.
- **Images**: DICOM (viewing only), JPEG, PNG (Wound care).
- **Audio**: Voice memos, dictations.

## Storage Architecture
See [S3 Integration](../integrations/s3-storage.md) for backend setup.

1. **Upload**: Client uploads file to API.
2. **Process**: API scans for viruses (ClamAV) and generates thumbnails.
3. **Store**: File moved to S3 (encrypted).
4. **Index**: Metadata stored in DB for search.

## Features

### Document Preview
- **PDFs**: Rendered client-side using `react-pdf`.
- **DICOM**: Integration with **OHIF Viewer** (Open Source web DICOM viewer).

### E-Signature
Providers can sign documents electronically.
1. Document is converted to PDF (if not already).
2. Signature image overlay is added.
3. PDF is flattened and marked read-only.
4. Hash of the document is stored to prove integrity.

### Fax Integration
Outbound/Inbound faxing is supported via **Telnyx/Twilio Programmable Fax**.
- **Inbound**: PDF arrives via webhook -> attached to patient.
- **Outbound**: Select document -> Enter fax number -> Send.
