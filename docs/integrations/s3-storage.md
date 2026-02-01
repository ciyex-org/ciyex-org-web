# AWS S3 Storage Integration

Guide to configuring AWS S3 for document storage in Ciyex EHR.

## Overview

Ciyex EHR uses AWS S3 (Simple Storage Service) to store patient documents, medical images, and generated reports securely.

## Features
- **Secure Storage**: All files are encrypted at rest using server-side encryption.
- **Pre-signed URLs**: Secure, temporary access to private objects.
- **Versioning**: Keep track of document revisions.
- **Lifecycle Policies**: Automatically archive old documents to Glacier.

## Prerequisites
1. AWS Account
2. S3 Bucket created
3. IAM User with S3 access

## Deployment Configuration

### 1. Create S3 Bucket
Create a private bucket (e.g., `ciyex-documents-prod`).
Enable **Block Public Access** settings.
Enable **Default Encryption** (SSE-S3 or SSE-KMS).

### 2. IAM Policy
Create an IAM policy for the application user:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::ciyex-documents-prod",
                "arn:aws:s3:::ciyex-documents-prod/*"
            ]
        }
    ]
}
```

### 3. Application Configuration
Configure `application.yml` or environment variables:

```yaml
aws:
  access-key: ${AWS_ACCESS_KEY_ID}
  secret-key: ${AWS_SECRET_ACCESS_KEY}
  region: us-east-1
  s3:
    bucket: ciyex-documents-prod
```

## Backend Implementation

The backend uses the AWS SDK for Java to interact with S3.

### Uploading Documents
```java
public String uploadFile(MultipartFile file, String patientId) {
    String key = "patients/" + patientId + "/" + UUID.randomUUID();
    s3Client.putObject(new PutObjectRequest(bucketName, key, file.getInputStream(), metadata));
    return key;
}
```

### Generating Presigned URLs
For viewing documents in the frontend without public access:

```java
public URL generatePresignedUrl(String key) {
    Date expiration = new Date();
    long expTimeMillis = expiration.getTime();
    expTimeMillis += 1000 * 60 * 15; // 15 minutes
    expiration.setTime(expTimeMillis);

    GeneratePresignedUrlRequest generatePresignedUrlRequest =
            new GeneratePresignedUrlRequest(bucketName, key)
                    .withMethod(HttpMethod.GET)
                    .withExpiration(expiration);

    return s3Client.generatePresignedUrl(generatePresignedUrlRequest);
}
```

## Alternatives

### Azure Blob Storage
The storage service is abstracted, so Azure Blob Storage can be implemented by providing an `AzureStorageService` implementation.

### MinIO (Self-Hosted)
For on-premise deployments, MinIO offers an S3-compatible API. Point the `endpoint` configuration to your MinIO server.

```yaml
aws:
  s3:
    endpoint: http://minio-server:9000
```
