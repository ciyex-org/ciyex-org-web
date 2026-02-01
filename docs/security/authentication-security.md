# Authentication Security

Deep dive into Ciyex EHR authentication mechanisms.

## Architecture
Ciyex uses **OpenID Connect (OIDC)** and **OAuth 2.0** for authentication, delegated to **Keycloak**.

## Token Lifecycle

1. **Access Token** (JWT)
   - Lifespan: 5-15 minutes
   - Contains: User ID, Roles, Scopes
   - Usage: Bearer token in HTTP Header

2. **Refresh Token**
   - Lifespan: 24 hours (configurabe)
   - Usage: Used to obtain new Access Tokens without re-login.

## Security Measures

### 1. Token Signing
Tokens are signed using `RS256` (RSA Signature with SHA-256).
- Public Key: Available via JWKS endpoint.
- Private Key: Stored securely in Keycloak.

### 2. Brute Force Protection
Keycloak implements built-in brute force detection.
- **Failures**: 5 failed attempts locks account temporarily.
- **Wait Increment**: Time increases with subsequent failures.

### 3. Session Management
- **SSO**: Single Sign-On enabled across apps.
- **Logout**: Global logout invalidates sessions on the server.

### 4. MFA (Multi-Factor Authentication)
Enforced for:
- All Administrators
- Providers accessing remotely
- Suspicious login attempts

Supported MFA:
- Time-based OTP (Google Authenticator)
- WebAuthn (YubiKey, TouchID)
- SMS (Not recommended, but supported)

## Implementation Details

### Validating Tokens (Backend)
Spring Security validates:
1. **Signature**: Verified against Keycloak public key.
2. **Issuer (`iss`)**: Must match Keycloak realm URL.
3. **Audience (`aud`)**: Must match client ID.
4. **Time**: `exp` (Expiry) and `nbf` (Not Before).

```java
@Bean
public JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
}
```
