# Code Style Guide

Standards and conventions for Ciyex EHR codebase.

## Backend (Java)

We follow the **Google Java Style Guide** with minor modifications.

### Naming Conventions
- **Classes**: `PascalCase` (e.g., `PatientController`)
- **Methods**: `camelCase` (e.g., `getPatientById`)
- **Variables**: `camelCase` (e.g., `firstName`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`)

### Formatting
- **Indentation**: 4 spaces
- **Line Length**: 120 chars
- **Braces**: K&R style (opening brace on same line)

### Annotations
Place annotations on separate lines.

```java
@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
public class PatientController { ... }
```

### Stream API
Break stream operations onto new lines.

```java
users.stream()
    .filter(User::isActive)
    .map(User::getEmail)
    .collect(Collectors.toList());
```

## Frontend (TypeScript/React)

We follow the **Airbnb JavaScript Style Guide** adapted for TypeScript.

### Naming Conventions
- **Components**: `PascalCase` (e.g., `PatientCard.tsx`)
- **Hooks**: `useCamelCase` (e.g., `usePatientData.ts`)
- **Utilities**: `camelCase` (e.g., `formatDate.ts`)

### React Patterns
- Use Functional Components with Hooks.
- Avoid default exports for components (Named exports preferred).

```typescript
// Prefer
export const Button = () => { ... };

// Avoid
const Button = () => { ... };
export default Button;
```

### TypeScript
- Avoid `any`. Use explicit interfaces or types.
- Use `interface` for object shapes, `type` for unions/aliases.

## Database (SQL)

- **Keywords**: Uppercase (`SELECT`, `FROM`, `WHERE`)
- **Table Names**: Snake case, plural (`patient_records`)
- **Columns**: Snake case (`first_name`)

## Automated Enforcement

### Backend
Run Checkstyle before pushing:
```bash
./gradlew checkstyleMain
```

### Frontend
Run ESLint and Prettier:
```bash
npm run lint
```
