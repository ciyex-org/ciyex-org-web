# SMS Integration

Guide to configuring SMS notifications using providers like Twilio or Telnyx.

## Overview

SMS notifications are used for:
- 2FA codes (Two-Factor Authentication)
- Appointment reminders
- Urgent alerts for providers
- Patient verification

## Configuration

Ciyex EHR abstracts the SMS provider via an `SmsService` interface, allowing you to switch providers easily.

### Telnyx Configuration (Default)

Add to `application.yml`:

```yaml
remote:
  telnyx:
    api-key: ${TELNYX_API_KEY}
    public-key: ${TELNYX_PUBLIC_KEY}
    profile-id: ${TELNYX_PROFILE_ID}
    phone-number: +15550001234
    short-code: 12345
```

### Twilio Configuration (Alternative)

To switch to Twilio, implement the `SmsProvider` interface or configure the existing Twilio adapter:

```yaml
twilio:
  account-sid: ${TWILIO_ACCOUNT_SID}
  auth-token: ${TWILIO_AUTH_TOKEN}
  phone-number: +15550005678
```

## Backend Implementation

### Service Interface

```java
public interface SmsService {
    void sendSms(String to, String message);
    void sendAppointmentReminder(Appointment appointment);
}
```

### Async Processing
SMS sending is performed asynchronously. The system queues SMS requests to avoid blocking the main thread and to handle retries.

```java
@Async
public void sendSms(String to, String message) {
    // Implementation
}
```

## Notifications Workflow

1. **Trigger**: An event occurs (e.g., Appointment Scheduled).
2. **Listener**: `AppointmentEventListener` catches the event.
3. **Queue**: A notification task is added to the job queue.
4. **Worker**: The worker picks up the task and calls `SmsService`.
5. **Provider**: The API call is made to Telnyx/Twilio.

## Compliance
- **Opt-Out**: The system automatically handles standard opt-out keywords (STOP, CANCEL, UNSUBSCRIBE).
- **HIPAA**: Limit PHI in SMS messages. Stick to generic reminders ("You have a new message in the portal") rather than specific medical details.
