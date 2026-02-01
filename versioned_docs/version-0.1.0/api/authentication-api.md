---
id: authentication-api
title: Authentication API
---

---
id: authentication-api
title: Authentication API
---

# Authentication API



API endpoints for managing user sessions and tokens.

## Base URL
`https://api.ciyex.org/api/auth`

## Endpoints

### Login
Exchange credentials for an access token.

**POST** `/login`

**Request Body**:
```json
{
  "username": "provider@example.com",
  "password": "secret-password"
}
```

**Response** (`200 OK`):
```json
{
  "access_token": "eyJhbGciOiJ...",
  "refresh_token": "eyJhbGciOiJ...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

### Refresh Token
Get a new access token using a refresh token.

**POST** `/refresh`

**Request Body**:
```json
{
  "refresh_token": "eyJhbGciOiJ..."
}
```

**Response** (`200 OK`):
```json
{
  "access_token": "eyJhbGciOiJ...",
  "expires_in": 3600
}
```

### Logout
Invalidate the current session.

**POST** `/logout`

**Request Body**:
```json
{
  "refresh_token": "eyJhbGciOiJ..."
}
```

**Response**: `204 No Content`

### User Info
Get profile information for the currently authenticated user.

**GET** `/me`

**Response** (`200 OK`):
```json
{
  "id": "user_123",
  "email": "provider@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "roles": ["PROVIDER", "ADMIN"],
  "organizationId": 1
}
```

### Forgot Password
Initiate password reset flow.

**POST** `/forgot-password`

**Request Body**:
```json
{
  "email": "provider@example.com"
}
```

**Response**: `200 OK`
