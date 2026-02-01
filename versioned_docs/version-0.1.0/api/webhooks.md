# Webhook Integration

Guide to consuming and verifying webhooks from Ciyex EHR.

## Overview

External systems can subscribe to Ciyex events via Webhooks.
Typical use cases:
- Receive real-time patient registration alerts.
- Trigger external billing workflows.
- Sync data with HIEs.

## Supported Events

| Event Type | Description | Payload |
|------------|-------------|---------|
| `patient.created` | New patient registered | Patient JSON |
| `appointment.scheduled` | Appointment created | Appointment JSON |
| `encounter.signed` | Clinical note finalized | Encounter JSON |
| `payment.received` | Payment successful | Payment JSON |

## Configuring Webhooks

1. Go to **Settings > Integrations > Webhooks**.
2. entering **Target URL**.
3. Select **Events** to subscribe to.
4. Note the **Signing Secret**.

## Verifying Signatures

To ensure security, verify that requests originated from Ciyex.
We include a `X-Ciyex-Signature` header (HMAC SHA-256).

### Example (Node.js)

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');
  return signature === digest;
}
```

## Retry Policy

If your endpoint returns anything other than `2xx`:
- We retry **5 times** with exponential backoff.
- Delays: 1m, 5m, 30m, 2h, 5h.
- After 5 failures, the webhook is disabled.

## Payload Example

```json
{
  "id": "evt_123456",
  "event": "appointment.scheduled",
  "created": 1704067200,
  "data": {
    "appointmentId": 999,
    "patientId": 123,
    "start": "2024-01-02T10:00:00Z"
  }
}
```
