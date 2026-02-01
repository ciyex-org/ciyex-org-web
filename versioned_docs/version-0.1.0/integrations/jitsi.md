# Jitsi Telehealth Setup

Guide to configuring Jitsi Meet for secure telehealth video consultations.

## Overview

Jitsi Meet provides:
- Secure, encrypted video conferencing
- Screen sharing & chat
- No installation required for patients (browser-based)
- Integrated waiting room

## Architecture
Ciyex EHR integrates Jitsi via the **Jitsi IFrame API**.
- **Self-Hosted**: You can host your own Jitsi instance for full control.
- **Jitsi as a Service (JaaS)**: Use 8x8's managed service.

## Configuration

### Frontend (.env)
```bash
NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si
# For self-hosted:
# NEXT_PUBLIC_JITSI_DOMAIN=video.yourclinic.com
```

### JWT Authentication
To prevent unauthorized access, rooms are protected via JWT. The Ciyex backend generates a JWT that the frontend uses to join the room.

**Backend Configuration**:
```yaml
jitsi:
  app-id: ${JITSI_APP_ID}
  secret: ${JITSI_SECRET}
  domain: meet.jit.si
```

## Usage

### Starting a Visit (Provider)
1. Provider clicks "Start Telehealth".
2. System creates a unique room ID (e.g., `ciyex-encounter-12345`).
3. Backend generates a JWT with `moderator` privileges.
4. Jitsi IFrame loads.

### Joining a Visit (Patient)
1. Patient logs into the portal.
2. Clicks "Join Appointment".
3. Backend generates a JWT with `participant` privileges.
4. Jitsi IFrame loads.

## Security Considerations
- **Room Names**: Use random, high-entropy UUIDs for room names to prevent guessing.
- **Encryption**: Enabling End-to-End Encryption (E2EE) is supported by Jitsi.
- **Access Control**: Only authenticated users with a valid appointment can generate a token for that specific room.

## Troubleshooting
- **Camera/Mic Blocked**: Ensure the site is served over HTTPS. Check browser permissions.
- **Firewall**: WebRTC requires specific ports (UDP 10000, TCP 443).
