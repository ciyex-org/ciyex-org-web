# Email Service Integration

Guide to configuring SMTP email services for notifications, appointment reminders, and user invites.

## Overview

Email integration is critical for:
- User account activation & password resets
- Appointment confirmations & reminders
- Billing notifications & receipts
- Secure messaging notifications

## Configuration

Ciyex EHR uses standard Spring Boot Mail configuration, compatible with any SMTP provider (SendGrid, AWS SES, Mailgun, Gmail, etc.).

### Application Properties
Add these settings to your `application.yml` or environment variables:

```yaml
spring:
  mail:
    host: smtp.example.com
    port: 587
    username: ${SMTP_USERNAME}
    password: ${SMTP_PASSWORD}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

### AWS SES Example
To use Amazon SES:

1. Verify your domain in SES.
2. Create SMTP credentials in IAM.
3. Configure:
   - Host: `email-smtp.us-east-1.amazonaws.com`
   - Port: `587`
   - Username/Password: (From IAM)

## Templates

Emails are generated using **Thymeleaf** templates located in `src/main/resources/templates/email/`.

### Example Template (`appointment-reminder.html`)
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>
    <h3>Appointment Reminder</h3>
    <p>Dear <span th:text="${patientName}">Patient</span>,</p>
    <p>You have an upcoming appointment with <span th:text="${providerName}">Dr. Smith</span>.</p>
    <p><strong>Date:</strong> <span th:text="${appointmentDate}">Jan 1, 2024</span></p>
    <p><strong>Time:</strong> <span th:text="${appointmentTime}">10:00 AM</span></p>
    <p>Please arrive 15 minutes early.</p>
</body>
</html>
```

## Testing

### Local Development
For local testing without sending real emails, usage of **MailHog** or **GreenMail** is recommended.

#### Using MailHog with Docker
```yaml
services:
  mailhog:
    image: mailhog/mailhog
    ports:
      - "1025:1025" # SMTP port
      - "8025:8025" # Web UI
```

Configure backend to point to `localhost:1025`.

## Best Practices
- **Asynchronous Sending**: The email service runs asynchronously to prevent blocking API responses.
- **Retry Logic**: Failed emails are retried up to 3 times (configured via `@Retryable`).
- **SPF/DKIM**: Ensure your domain DNS is configured with SPF and DKIM records to prevent emails going to spam.
