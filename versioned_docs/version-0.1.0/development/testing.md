# Testing Guide

Comprehensive testing strategy to ensure reliability and correctness.

## Testing Pyramid

We follow the standard testing pyramid:
1. **Unit Tests** (70%): Fast, isolated tests for individual classes/functions.
2. **Integration Tests** (20%): Test interactions between components (API -> DB).
3. **E2E Tests** (10%): Full user flows running in a real browser.

## Backend Testing (Java/Spring Boot)

### Unit Tests (JUnit 5 + Mockito)
Located in `src/test/java`.

```java
@ExtendWith(MockitoExtension.class)
class PatientServiceTest {
    @Mock PatientRepository repository;
    @InjectMocks PatientService service;

    @Test
    void shouldCreatePatient() {
        PatientDTO dto = new PatientDTO("John", "Doe");
        when(repository.save(any())).thenReturn(new Patient(1L, "John", "Doe"));

        Patient result = service.create(dto);
        assertEquals(1L, result.getId());
    }
}
```

### Integration Tests (@SpringBootTest)
Spins up the ApplicationContext and an in-memory DB (H2) or TestContainer (Postgres).

```java
@SpringBootTest(webEnvironment = RANDOM_PORT)
class PatientApiTest {
    @Autowired TestRestTemplate restTemplate;

    @Test
    void shouldReturnPatients() {
        ResponseEntity<List> response = restTemplate.getForEntity("/api/patients", List.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
```

**Running Tests**:
```bash
./gradlew test
```

## Frontend Testing (React/Next.js)

### Unit/Component Tests (Jest + React Testing Library)

```javascript
test('renders patient name', () => {
  render(<PatientCard name="John Doe" />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

**Running Tests**:
```bash
npm test
```

### E2E Tests (Playwright)

```javascript
test('provider can login and view dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#email', 'provider@ciyex.org');
  await page.fill('#password', 'secret');
  await page.click('button[type=submit]');
  
  await expect(page).toHaveURL('/dashboard');
});
```

## Continuous Integration

Every PR triggers the CI pipeline which runs:
1. Checkstyle / ESLint
2. Backend Unit & Integration Tests
3. Frontend Tests
4. Build Verification

Tests must pass before merging.
