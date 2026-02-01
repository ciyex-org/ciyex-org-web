# API Error Codes

Reference for standard API error codes and responses.

## Standard Response Format

All API errors return a standard JSON structure:

```json
{
  "timestamp": "2024-01-01T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input data",
  "path": "/api/patients",
  "code": "VAL_001",
  "details": [
    "Email address is invalid"
  ]
}
```

## HTTP Status Codes

| Status | Meaning | Description |
|--------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request succeeded, no body returned |
| 400 | Bad Request | Client error (validation, formatting) |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Authenticated, but no permission |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Resource conflict (e.g., duplicate email) |
| 422 | Unprocessable | Logic error (valid syntax, invalid instruction) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Error | Server-side error |

## Application Error Codes

### Validation Errors (`VAL_`)
| Code | Message | Solution |
|------|---------|----------|
| `VAL_001` | Invalid field format | Check regex/format requirements |
| `VAL_002` | Missing required field | Provide mandatory fields |
| `VAL_003` | Invalid date | Use ISO-8601 format |

### Authentication Errors (`AUTH_`)
| Code | Message | Solution |
|------|---------|----------|
| `AUTH_001` | Token expired | Refresh token or re-login |
| `AUTH_002` | Invalid credentials | Check username/password |
| `AUTH_003` | Account locked | Contact support |

### Business Logic Errors (`BIZ_`)
| Code | Message | Solution |
|------|---------|----------|
| `BIZ_001` | Appointment slot taken | Choose a different time |
| `BIZ_002` | Insufficient inventory | Cannot prescribe item |
| `BIZ_003` | Patient already registered | Use existing profile |

## FHIR OperationOutcome
For FHIR endpoints, errors return an `OperationOutcome` resource:

```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "value",
      "diagnostics": "Invalid MRN format"
    }
  ]
}
```
