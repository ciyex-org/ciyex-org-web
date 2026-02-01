# REST API Reference

Complete reference for the Ciyex EHR REST API.

## Overview

The Ciyex EHR REST API provides programmatic access to all platform features. The API follows RESTful principles and uses JSON for request and response bodies.

## Base URL

```
Development: http://localhost:8080
Staging:     https://api-stage.example.com
Production:  https://api.example.com
```

## Authentication

All API requests require authentication using JWT tokens.

### Get Access Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": 123,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "PROVIDER"
    }
  }
}
```

### Using the Token

Include the token in the `Authorization` header:

```http
GET /api/patients
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Response Format

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error message"
  }
}
```

## HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict (duplicate) |
| 422 | Unprocessable Entity | Validation error |
| 500 | Internal Server Error | Server error |

## Pagination

List endpoints support pagination:

```http
GET /api/patients?page=0&size=20&sort=lastName,asc
```

**Parameters:**
- `page` - Page number (0-indexed)
- `size` - Items per page (default: 20, max: 100)
- `sort` - Sort field and direction (e.g., `lastName,asc`)

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [...],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20
    },
    "totalElements": 150,
    "totalPages": 8,
    "last": false,
    "first": true
  }
}
```

## Filtering

Use query parameters for filtering:

```http
GET /api/patients?firstName=John&status=ACTIVE
```

## API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
```

#### Keycloak Login
```http
POST /api/auth/keycloak-login
```

#### Logout
```http
POST /api/auth/logout
```

#### Refresh Token
```http
POST /api/auth/refresh
```

### Patients

#### List Patients
```http
GET /api/patients
```

#### Get Patient
```http
GET /api/patients/{id}
```

#### Create Patient
```http
POST /api/patients
```

#### Update Patient
```http
PUT /api/patients/{id}
```

#### Delete Patient
```http
DELETE /api/patients/{id}
```

#### Search Patients
```http
GET /api/patients/search?q={query}
```

### Appointments

#### List Appointments
```http
GET /api/appointments
```

#### Get Appointment
```http
GET /api/appointments/{id}
```

#### Create Appointment
```http
POST /api/appointments
```

#### Update Appointment
```http
PUT /api/appointments/{id}
```

#### Cancel Appointment
```http
POST /api/appointments/{id}/cancel
```

#### Get Available Slots
```http
GET /api/appointments/available-slots?providerId={id}&date={date}
```

### Providers

#### List Providers
```http
GET /api/providers
```

#### Get Provider
```http
GET /api/providers/{id}
```

#### Get Provider Schedule
```http
GET /api/providers/{id}/schedule?startDate={date}&endDate={date}
```

### Encounters

#### List Encounters
```http
GET /api/encounters
```

#### Get Encounter
```http
GET /api/encounters/{id}
```

#### Create Encounter
```http
POST /api/encounters
```

#### Update Encounter
```http
PUT /api/encounters/{id}
```

### Clinical Data

#### Add Vitals
```http
POST /api/patients/{patientId}/vitals
```

#### Add Lab Results
```http
POST /api/patients/{patientId}/lab-results
```

#### Add Condition
```http
POST /api/patients/{patientId}/conditions
```

#### Add Allergy
```http
POST /api/patients/{patientId}/allergies
```

#### Add Medication
```http
POST /api/patients/{patientId}/medications
```

### Documents

#### Upload Document
```http
POST /api/patients/{patientId}/documents
Content-Type: multipart/form-data
```

#### List Documents
```http
GET /api/patients/{patientId}/documents
```

#### Download Document
```http
GET /api/documents/{documentId}/download
```

#### Delete Document
```http
DELETE /api/documents/{documentId}
```

### Telehealth

#### Create Room
```http
POST /api/telehealth/rooms
```

#### Join Room
```http
POST /api/telehealth/jitsi/join
```

### Billing

#### Create Invoice
```http
POST /api/billing/invoices
```

#### List Invoices
```http
GET /api/billing/invoices
```

#### Process Payment
```http
POST /api/billing/payments
```

### Messages

#### Send Message
```http
POST /api/messages
```

#### List Messages
```http
GET /api/messages
```

#### Mark as Read
```http
PUT /api/messages/{id}/read
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1634567890
```

## Webhooks

Subscribe to events via webhooks:

### Available Events

- `patient.created`
- `patient.updated`
- `appointment.created`
- `appointment.updated`
- `appointment.cancelled`
- `encounter.created`
- `invoice.created`
- `payment.received`

### Register Webhook

```http
POST /api/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["appointment.created", "appointment.cancelled"],
  "secret": "your-webhook-secret"
}
```

### Webhook Payload

```json
{
  "event": "appointment.created",
  "timestamp": "2024-10-15T10:30:00Z",
  "data": {
    "id": 123,
    "patientId": 456,
    "providerId": 789,
    "appointmentDate": "2024-10-20",
    "appointmentTime": "10:00:00"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_001` | Invalid credentials |
| `AUTH_002` | Token expired |
| `AUTH_003` | Insufficient permissions |
| `VAL_001` | Validation error |
| `VAL_002` | Missing required field |
| `RES_001` | Resource not found |
| `RES_002` | Resource already exists |
| `SYS_001` | Internal server error |
| `SYS_002` | Database error |

## Code Examples

### JavaScript/TypeScript

```typescript
// Login
const login = async (username: string, password: string) => {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.data.token);
  return data;
};

// Get patients
const getPatients = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/patients', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return await response.json();
};

// Create patient
const createPatient = async (patientData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/api/patients', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patientData)
  });
  
  return await response.json();
};
```

### Python

```python
import requests

# Login
def login(username, password):
    response = requests.post(
        'http://localhost:8080/api/auth/login',
        json={'username': username, 'password': password}
    )
    data = response.json()
    return data['data']['token']

# Get patients
def get_patients(token):
    response = requests.get(
        'http://localhost:8080/api/patients',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()

# Create patient
def create_patient(token, patient_data):
    response = requests.post(
        'http://localhost:8080/api/patients',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        },
        json=patient_data
    )
    return response.json()
```

### cURL

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user@example.com","password":"password123"}'

# Get patients
curl -X GET http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create patient
curl -X POST http://localhost:8080/api/patients \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "identification": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1985-06-15",
      "gender": "Male"
    },
    "contact": {
      "email": "john.doe@example.com",
      "phoneNumber": "555-123-4567"
    }
  }'
```

## Testing

### Postman Collection

Download the Postman collection:
```
https://github.com/ciyex-org/ciyex/blob/main/postman/Ciyex-API.postman_collection.json
```

### Swagger/OpenAPI

Access interactive API documentation:
```
http://localhost:8080/swagger-ui.html
```

## Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** - Use httpOnly cookies or secure storage
3. **Implement token refresh** - Refresh before expiration
4. **Handle errors gracefully** - Check response status and error codes
5. **Respect rate limits** - Implement exponential backoff
6. **Validate input** - Validate data before sending
7. **Use pagination** - Don't fetch all records at once
8. **Cache responses** - Cache when appropriate

## Next Steps

- [Authentication API](authentication-api.md) - Detailed auth endpoints
- [FHIR API](fhir-api.md) - FHIR R4 endpoints
- [Webhooks](webhooks.md) - Event subscriptions
- [Security](../security/authentication-security.md) - API security
