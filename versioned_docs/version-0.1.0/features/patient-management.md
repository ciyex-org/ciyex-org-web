# Patient Management

Complete guide to managing patient records in Ciyex EHR.

## Overview

The Patient Management module is the foundation of Ciyex EHR, providing comprehensive tools for managing patient demographics, medical history, and clinical data.

## Features

- 📋 **Patient Demographics** - Complete patient information
- 🏥 **Medical History** - Conditions, allergies, medications
- 📊 **Clinical Data** - Vitals, lab results, observations
- 📁 **Document Management** - Upload and organize patient documents
- 🔍 **Advanced Search** - Find patients quickly
- 📱 **Patient Portal Access** - Patients can view their own records
- 🔄 **FHIR Integration** - HL7 FHIR R4 compliant

## Patient Record Structure

### Demographics

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| First Name | String | Yes | Patient's first name |
| Last Name | String | Yes | Patient's last name |
| Date of Birth | Date | Yes | Patient's birth date |
| Gender | Enum | Yes | Male, Female, Other, Unknown |
| SSN | String | No | Social Security Number (encrypted) |
| Email | String | No | Primary email address |
| Phone | String | Yes | Primary phone number |
| Address | Object | Yes | Street, city, state, zip |
| Emergency Contact | Object | No | Name, relationship, phone |
| Insurance | Array | No | Insurance information |
| Preferred Language | String | No | Primary language |
| Race | String | No | Patient's race |
| Ethnicity | String | No | Patient's ethnicity |

### Medical History

- **Conditions** - Active and past medical conditions
- **Allergies** - Drug, food, and environmental allergies
- **Medications** - Current and past medications
- **Immunizations** - Vaccination history
- **Family History** - Genetic and familial conditions
- **Social History** - Smoking, alcohol, occupation

### Clinical Data

- **Vitals** - Blood pressure, temperature, weight, height, BMI
- **Lab Results** - Laboratory test results
- **Observations** - Clinical observations and assessments
- **Procedures** - Surgical and medical procedures
- **Encounters** - Visit history

## Creating a Patient

### Via UI

1. **Navigate to Patients**
   - Click "Patients" in main navigation
   - Click "Add New Patient" button

2. **Enter Demographics**
   - Fill in required fields (name, DOB, gender)
   - Add contact information
   - Add address

3. **Add Insurance** (Optional)
   - Click "Add Insurance"
   - Enter insurance details
   - Upload insurance card images

4. **Add Emergency Contact** (Optional)
   - Enter emergency contact information
   - Specify relationship

5. **Save Patient**
   - Click "Save Patient"
   - Patient record created

### Via API

```http
POST /api/patients
Authorization: Bearer {token}
Content-Type: application/json

{
  "identification": {
    "firstName": "John",
    "lastName": "Doe",
    "middleName": "Michael",
    "dateOfBirth": "1985-06-15",
    "ssn": "123-45-6789",
    "gender": "Male"
  },
  "contact": {
    "email": "john.doe@example.com",
    "phoneNumber": "555-123-4567",
    "address": {
      "street": "123 Main St",
      "city": "Springfield",
      "state": "IL",
      "zipCode": "62701",
      "country": "USA"
    }
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phoneNumber": "555-987-6543"
  },
  "insurance": [
    {
      "provider": "Blue Cross Blue Shield",
      "policyNumber": "BC123456789",
      "groupNumber": "GRP001",
      "subscriberName": "John Doe",
      "relationship": "Self"
    }
  ],
  "preferredLanguage": "English",
  "race": "White",
  "ethnicity": "Not Hispanic or Latino"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Patient created successfully",
  "data": {
    "id": 123,
    "identification": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1985-06-15",
      "gender": "Male"
    },
    "mrn": "MRN-2024-00123",
    "createdAt": "2024-10-15T10:30:00Z"
  }
}
```

### Via FHIR API

```http
POST /fhir/Patient
Authorization: Bearer {token}
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "identifier": [
    {
      "system": "http://example.com/mrn",
      "value": "MRN-2024-00123"
    }
  ],
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "Michael"]
    }
  ],
  "gender": "male",
  "birthDate": "1985-06-15",
  "telecom": [
    {
      "system": "phone",
      "value": "555-123-4567",
      "use": "home"
    },
    {
      "system": "email",
      "value": "john.doe@example.com"
    }
  ],
  "address": [
    {
      "use": "home",
      "line": ["123 Main St"],
      "city": "Springfield",
      "state": "IL",
      "postalCode": "62701",
      "country": "USA"
    }
  ]
}
```

## Searching Patients

### Quick Search

```http
GET /api/patients/search?q=john+doe
Authorization: Bearer {token}
```

### Advanced Search

```http
GET /api/patients/search?firstName=John&lastName=Doe&dateOfBirth=1985-06-15
Authorization: Bearer {token}
```

### FHIR Search

```http
GET /fhir/Patient?name=John&birthdate=1985-06-15
Authorization: Bearer {token}
```

**Search Parameters**:
- `name` - Patient name (first or last)
- `birthdate` - Date of birth
- `identifier` - MRN or other identifier
- `gender` - Patient gender
- `phone` - Phone number
- `email` - Email address

## Medical History

### Adding Conditions

```http
POST /api/patients/123/conditions
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "E11.9",
  "codeSystem": "ICD-10",
  "display": "Type 2 diabetes mellitus without complications",
  "clinicalStatus": "active",
  "verificationStatus": "confirmed",
  "onsetDate": "2020-03-15",
  "notes": "Diagnosed during annual physical"
}
```

### Adding Allergies

```http
POST /api/patients/123/allergies
Authorization: Bearer {token}
Content-Type: application/json

{
  "allergen": "Penicillin",
  "allergenType": "medication",
  "reaction": "Hives",
  "severity": "moderate",
  "onsetDate": "2015-08-20",
  "notes": "Developed rash after taking amoxicillin"
}
```

### Adding Medications

```http
POST /api/patients/123/medications
Authorization: Bearer {token}
Content-Type: application/json

{
  "medicationName": "Metformin",
  "dosage": "500mg",
  "frequency": "twice daily",
  "route": "oral",
  "startDate": "2020-03-15",
  "prescribedBy": "Dr. Smith",
  "status": "active",
  "instructions": "Take with meals"
}
```

## Clinical Data

### Recording Vitals

```http
POST /api/patients/123/vitals
Authorization: Bearer {token}
Content-Type: application/json

{
  "dateRecorded": "2024-10-15T10:30:00Z",
  "bloodPressureSystolic": 120,
  "bloodPressureDiastolic": 80,
  "heartRate": 72,
  "temperature": 98.6,
  "temperatureUnit": "F",
  "weight": 180,
  "weightUnit": "lbs",
  "height": 70,
  "heightUnit": "inches",
  "respiratoryRate": 16,
  "oxygenSaturation": 98
}
```

**Calculated Fields**:
- **BMI** - Automatically calculated from height and weight
- **Blood Pressure Category** - Normal, Elevated, Hypertension Stage 1/2

### Lab Results

```http
POST /api/patients/123/lab-results
Authorization: Bearer {token}
Content-Type: application/json

{
  "testName": "Complete Blood Count",
  "testCode": "CBC",
  "orderDate": "2024-10-10",
  "collectionDate": "2024-10-12",
  "resultDate": "2024-10-14",
  "results": [
    {
      "component": "White Blood Cell Count",
      "value": 7.5,
      "unit": "K/uL",
      "referenceRange": "4.5-11.0",
      "status": "normal"
    },
    {
      "component": "Hemoglobin",
      "value": 14.2,
      "unit": "g/dL",
      "referenceRange": "13.5-17.5",
      "status": "normal"
    }
  ],
  "orderedBy": "Dr. Smith",
  "performedBy": "Quest Diagnostics"
}
```

## Document Management

### Upload Document

```http
POST /api/patients/123/documents
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary data]
documentType: "Lab Report"
description: "CBC results from 10/14/2024"
date: "2024-10-14"
```

### Supported Document Types

- Lab Reports
- Imaging Reports
- Consultation Notes
- Insurance Cards
- Consent Forms
- Discharge Summaries
- Prescriptions
- Other

### Document Storage

Documents are stored in AWS S3 with:
- **Encryption** - AES-256 encryption at rest
- **Access Control** - Signed URLs with expiration
- **Versioning** - Document version history
- **Audit Trail** - Who accessed when

## Patient Portal

Patients can access their own records through the patient portal:

### Available Features

- ✅ View demographics
- ✅ View medical history (conditions, allergies, medications)
- ✅ View lab results
- ✅ View documents
- ✅ Request appointments
- ✅ Message providers
- ✅ Update contact information
- ❌ Edit medical history (provider only)
- ❌ Delete records (provider only)

### Portal Access

```http
GET /api/portal/patient/profile
Authorization: Bearer {patient-token}
```

## FHIR Resources

### Patient Resource

```json
{
  "resourceType": "Patient",
  "id": "123",
  "identifier": [
    {
      "system": "http://example.com/mrn",
      "value": "MRN-2024-00123"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Doe",
      "given": ["John", "Michael"]
    }
  ],
  "gender": "male",
  "birthDate": "1985-06-15"
}
```

### Condition Resource

```json
{
  "resourceType": "Condition",
  "id": "456",
  "subject": {
    "reference": "Patient/123"
  },
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10",
        "code": "E11.9",
        "display": "Type 2 diabetes mellitus without complications"
      }
    ]
  },
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "active"
      }
    ]
  },
  "onsetDateTime": "2020-03-15"
}
```

## Security & Privacy

### Access Control

- **Role-Based Access** - Providers, staff, admins have different permissions
- **Patient Consent** - Patients can restrict access to sensitive information
- **Audit Logging** - All access logged for compliance

### Data Encryption

- **At Rest** - Database encryption, encrypted S3 storage
- **In Transit** - TLS 1.3 for all API communication
- **PHI Protection** - SSN and other sensitive fields encrypted

### HIPAA Compliance

- **Minimum Necessary** - Only show data needed for task
- **Audit Trails** - ONC-compliant audit logging
- **Data Retention** - Configurable retention policies
- **Breach Notification** - Automated breach detection

## Best Practices

### Data Entry

1. **Verify Identity** - Always verify patient identity before accessing records
2. **Complete Information** - Fill in all required fields
3. **Accurate Data** - Double-check dates, medications, allergies
4. **Timely Updates** - Update records promptly after visits

### Search Efficiency

1. **Use MRN** - Fastest way to find patients
2. **Use Multiple Criteria** - Narrow results with DOB + name
3. **Check for Duplicates** - Before creating new patient

### Document Organization

1. **Consistent Naming** - Use standard document type names
2. **Add Descriptions** - Include relevant details
3. **Date Documents** - Always include document date
4. **Remove Duplicates** - Delete duplicate uploads

## Troubleshooting

### Patient Not Found

**Issue**: Search returns no results

**Solutions**:
- Check spelling of name
- Try searching by MRN
- Check date of birth format
- Verify patient exists in current organization

### Duplicate Patients

**Issue**: Same patient appears multiple times

**Solutions**:
- Use merge patients feature
- Contact administrator
- Check for typos in patient names

### Document Upload Fails

**Issue**: Cannot upload document

**Solutions**:
- Check file size (max 10MB)
- Verify file type is supported
- Check internet connection
- Try different browser

## Next Steps

- [Appointments](appointments.md) - Schedule patient appointments
- [Clinical Documentation](clinical-docs.md) - Document patient encounters
- [FHIR API](../api/fhir-api.md) - FHIR integration details
- [Security](../security/compliance.md) - HIPAA compliance
