# Backend Architecture

Deep dive into the Spring Boot backend service.

## Tech Stack
- **Framework**: Spring Boot 3.2
- **Language**: Java 21
- **Build Tool**: Gradle (Kotlin DSL)
- **Database**: PostgreSQL 16 (Spring Data JPA)
- **Security**: Spring Security + OAuth2 Resource Server

## Layered Architecture

### 1. Controller Layer (`web`)
Handles HTTP requests, validation, and response formatting.
- **DTOs**: Accept `CreatePatientRequest`, return `PatientResponse`.
- **Validation**: `@Valid` annotations.

```java
@PostMapping
public PatientResponse create(@Valid @RequestBody CreatePatientRequest request) {
    return service.create(request);
}
```

### 2. Service Layer (`service`)
Contains business logic and transactions.
- **Transactional**: `@Transactional` ensures atomicity.
- **Mapper**: MapStruct converts DTOs &lt;-&gt; Entities.

```java
@Transactional
public PatientResponse create(CreatePatientRequest request) {
    // Business checks
    if (repo.existsByMrn(request.getMrn())) throw new ConflictException();
    // Save
}
```

### 3. Repository Layer (`repository`)
Data access using Spring Data JPA.

```java
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByMrn(String mrn);
}
```

## Key Components

### Multi-Tenancy
Implemented via **Discriminator Column** (`organization_id`) in every table.
An Aspect (`TenantAspect`) automatically injects the tenant ID into queries based on the security context.

### Async Processing
- **Events**: ApplicationEvents for internal decoupling.
- **Scheduling**: `@Scheduled` tasks for billing runs.

### Exception Handling
`GlobalExceptionHandler` catches exceptions and converts them to standard JSON errors.
