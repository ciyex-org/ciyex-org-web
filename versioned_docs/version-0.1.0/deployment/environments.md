# Environment Configurations

Detailed configuration differences between environments.

## Development (Dev)

- **Purpose**: Active development, feature testing.
- **Infrastructure**: Single AZ, smaller instances.
- **Data**: Mock data / Anonymized dumps.
- **Access**: Developers have full access.
- **Debug**: Remote debugging enabled.

```yaml
# Feature Flags
telehealth: true
mock_payments: true
debug_mode: true
```

## Staging (Stage)

- **Purpose**: Pre-production acceptance testing (UAT).
- **Infrastructure**: Mirror of Prod (Multi-AZ), but scaled down.
- **Data**: Sanitized production copy (GDPR/HIPAA clean).
- **Access**: QA and Product Owners.

```yaml
# Feature Flags
telehealth: true
mock_payments: false (Stripe Test Mode)
debug_mode: false
```

## Production (Prod)

- **Purpose**: Live patient traffic.
- **Infrastructure**: Multi-AZ, High Availability, Autoscaling.
- **Data**: Real PHI (Encrypted).
- **Access**: Restricted (Break-glass access only).

```yaml
# Feature Flags
telehealth: true
mock_payments: false (Stripe Live Mode)
debug_mode: false
```

## Promoting changes
Code moves: `Dev` -> `Stage` -> `Prod`.
Configuration moves: Config changes are applied to `Stage` first, validated, then applied to `Prod`.
