# Database Migrations

Guide to managing database schema changes using Flyway.

## Overview

Ciyex EHR uses **Flyway** for database version control. All schema changes (DDL) and data migrations (DML) are versioned and applied automatically on application startup.

## Migration File Structure

Migrations are located in `src/main/resources/db/migration`.
Naming convention: `V{Version}__{Description}.sql`

Examples:
- `V1__init_schema.sql`
- `V1.1__add_patient_email.sql`
- `V2.0__create_audit_tables.sql`

## Creating a Migration

1. **Create the file**: `src/main/resources/db/migration/V1.2__add_phone_to_users.sql`
2. **Write SQL**:
   ```sql
   ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);
   COMMENT ON COLUMN users.phone_number IS 'User mobile contact';
   ```
3. **Run Application**: Spring Boot will detect the new file and apply it on startup.

## Managing Conflicts

If two developers create `V1.2` locally:
- Flyway will fail with a checksum mismatch or version conflict.
- **Solution**: Rename your migration to the next available version (e.g., `V1.3`) before merging.

## Rollbacks

Flyway Community Edition does not support automatic "undo" migrations.
**Strategy**: Create a new forward migration that reverses the change.

Example `V1.3__undo_add_phone.sql`:
```sql
ALTER TABLE users DROP COLUMN phone_number;
```

## Repairing History

If a migration fails (e.g., due to syntax error) and leaves the schema history in a failed state:

1. Fix the SQL file.
2. Run Flyway repair:
   ```bash
   ./gradlew flywayRepair
   ```
   Or manually update the `flyway_schema_history` table (caution advised).

## Best Practices

- **Never modify an existing migration** after it has been applied to any environment. Always create a new version.
- **Test migrations locally** against a clean database.
- **Use transactional DDL**: PostgreSQL supports DDL in transactions. Flyway wraps migrations in transactions by default, so if part fails, it all rolls back.
