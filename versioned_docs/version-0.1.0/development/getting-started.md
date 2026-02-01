# Development Guide

Complete guide for developers contributing to Ciyex EHR.

## Overview

This guide covers the development workflow, coding standards, testing practices, and contribution guidelines for Ciyex EHR.

## Development Environment

### Required Tools

- **Java 21** - Backend development
- **Node.js 22** - Frontend development
- **pnpm 8+** - Package management
- **PostgreSQL 16** - Database
- **Git** - Version control
- **IDE** - IntelliJ IDEA or VS Code

### IDE Setup

#### IntelliJ IDEA

1. **Install Plugins**
   - Lombok
   - Spring Boot
   - Database Navigator

2. **Configure Project**
   ```bash
   # Open project
   File → Open → Select ciyex directory
   
   # Import Gradle project
   # IntelliJ will auto-detect build.gradle
   ```

3. **Code Style**
   ```bash
   # Import code style
   File → Settings → Editor → Code Style
   # Import from: .idea/codeStyles/Project.xml
   ```

#### VS Code

1. **Install Extensions**
   - Extension Pack for Java
   - Spring Boot Extension Pack
   - Lombok Annotations Support
   - ESLint
   - Prettier

2. **Configure Settings**
   ```json
   {
     "java.configuration.updateBuildConfiguration": "automatic",
     "java.compile.nullAnalysis.mode": "automatic",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.organizeImports": true
     }
   }
   ```

## Project Structure

### Backend (Spring Boot)

```
ciyex/
├── src/
│   ├── main/
│   │   ├── java/com/qiaben/ciyex/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── service/         # Business logic
│   │   │   ├── repository/      # Data access
│   │   │   ├── model/           # Entity models
│   │   │   ├── dto/             # Data transfer objects
│   │   │   ├── security/        # Security configuration
│   │   │   ├── exception/       # Custom exceptions
│   │   │   └── util/            # Utility classes
│   │   └── resources/
│   │       ├── application.yml  # Configuration
│   │       ├── db/migration/    # Flyway migrations
│   │       └── templates/       # Email templates
│   └── test/
│       └── java/com/qiaben/ciyex/
│           ├── controller/      # Controller tests
│           ├── service/         # Service tests
│           └── integration/     # Integration tests
├── build.gradle                 # Build configuration
└── gradle.properties           # Gradle properties
```

### Frontend (Next.js)

```
ciyex-ehr-ui/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── forms/            # Form components
│   │   └── charts/           # Chart components
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── styles/               # CSS styles
├── public/                   # Static assets
├── package.json             # Dependencies
└── tsconfig.json           # TypeScript config
```

## Coding Standards

### Java

**Naming Conventions**:
```java
// Classes: PascalCase
public class PatientService {}

// Methods: camelCase
public Patient findPatientById(Long id) {}

// Constants: UPPER_SNAKE_CASE
private static final String DEFAULT_SCHEMA = "public";

// Variables: camelCase
private String patientName;
```

**Code Style**:
```java
// ✅ GOOD
@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    
    public Patient createPatient(PatientDTO dto) {
        // Validate input
        validatePatientData(dto);
        
        // Create entity
        Patient patient = new Patient();
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        
        // Save and return
        return patientRepository.save(patient);
    }
    
    private void validatePatientData(PatientDTO dto) {
        if (dto.getFirstName() == null || dto.getFirstName().isBlank()) {
            throw new ValidationException("First name is required");
        }
    }
}

// ❌ BAD
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;  // Use constructor injection
    
    public Patient createPatient(PatientDTO dto) {
        Patient patient = new Patient();
        patient.setFirstName(dto.getFirstName());  // No validation
        return patientRepository.save(patient);
    }
}
```

**Documentation**:
```java
/**
 * Service for managing patient records.
 * 
 * <p>This service provides CRUD operations for patients and handles
 * business logic related to patient management.</p>
 *
 * @author Jane Smith
 * @since 1.0.0
 */
@Service
public class PatientService {
    
    /**
     * Creates a new patient record.
     *
     * @param dto the patient data transfer object
     * @return the created patient entity
     * @throws ValidationException if patient data is invalid
     */
    public Patient createPatient(PatientDTO dto) {
        // Implementation
    }
}
```

### TypeScript/React

**Naming Conventions**:
```typescript
// Components: PascalCase
export function PatientList() {}

// Functions: camelCase
function fetchPatients() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:8080';

// Types/Interfaces: PascalCase
interface Patient {
  id: number;
  firstName: string;
}
```

**Component Style**:
```typescript
// ✅ GOOD
'use client';

import { useState, useEffect } from 'react';
import { Patient } from '@/types';

interface PatientListProps {
  organizationId: number;
}

export function PatientList({ organizationId }: PatientListProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, [organizationId]);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`/api/patients?org=${organizationId}`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="patient-list">
      {patients.map(patient => (
        <div key={patient.id}>{patient.firstName} {patient.lastName}</div>
      ))}
    </div>
  );
}

// ❌ BAD
export function PatientList(props) {  // No types
  const [patients, setPatients] = useState([]);
  
  // No error handling
  fetch('/api/patients').then(r => r.json()).then(setPatients);
  
  return <div>{patients.map(p => <div>{p.firstName}</div>)}</div>;  // No keys
}
```

## Git Workflow

### Branch Naming

```bash
# Feature branches
feature/patient-search
feature/appointment-reminders

# Bug fixes
bugfix/login-error
bugfix/date-formatting

# Hotfixes
hotfix/security-patch
hotfix/critical-bug
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(patients): add patient search functionality
fix(auth): resolve token expiration issue
docs(readme): update installation instructions
refactor(billing): simplify invoice calculation
test(appointments): add unit tests for scheduling
chore(deps): update Spring Boot to 4.0.1
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements

### Pull Request Process

1. **Create Branch**
   ```bash
   git checkout -b feature/patient-search
   ```

2. **Make Changes**
   ```bash
   # Make your changes
   git add .
   git commit -m "feat(patients): add patient search functionality"
   ```

3. **Push Branch**
   ```bash
   git push origin feature/patient-search
   ```

4. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in template:
     ```markdown
     ## Description
     Adds patient search functionality with filters for name, DOB, and MRN.
     
     ## Changes
     - Added PatientSearchController
     - Implemented search service
     - Created search UI component
     - Added unit tests
     
     ## Testing
     - [ ] Unit tests pass
     - [ ] Integration tests pass
     - [ ] Manual testing completed
     
     ## Screenshots
     [Add screenshots if UI changes]
     ```

5. **Code Review**
   - Address reviewer comments
   - Make requested changes
   - Push updates

6. **Merge**
   - Squash and merge
   - Delete branch

## Testing

### Unit Tests (Backend)

```java
@SpringBootTest
class PatientServiceTest {
    
    @Mock
    private PatientRepository patientRepository;
    
    @InjectMocks
    private PatientService patientService;
    
    @Test
    void createPatient_ValidData_ReturnsPatient() {
        // Arrange
        PatientDTO dto = new PatientDTO();
        dto.setFirstName("John");
        dto.setLastName("Doe");
        
        Patient patient = new Patient();
        patient.setId(1L);
        patient.setFirstName("John");
        patient.setLastName("Doe");
        
        when(patientRepository.save(any(Patient.class)))
            .thenReturn(patient);
        
        // Act
        Patient result = patientService.createPatient(dto);
        
        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        verify(patientRepository).save(any(Patient.class));
    }
    
    @Test
    void createPatient_InvalidData_ThrowsException() {
        // Arrange
        PatientDTO dto = new PatientDTO();
        dto.setFirstName("");  // Invalid
        
        // Act & Assert
        assertThrows(ValidationException.class, () -> {
            patientService.createPatient(dto);
        });
    }
}
```

### Integration Tests (Backend)

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class PatientControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    @WithMockUser(roles = "PROVIDER")
    void createPatient_ValidRequest_Returns201() throws Exception {
        PatientDTO dto = new PatientDTO();
        dto.setFirstName("John");
        dto.setLastName("Doe");
        
        mockMvc.perform(post("/api/patients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.data.firstName").value("John"));
    }
}
```

### Unit Tests (Frontend)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { PatientList } from './PatientList';

describe('PatientList', () => {
  it('renders patient list', async () => {
    const mockPatients = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith' }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPatients)
      })
    ) as jest.Mock;

    render(<PatientList organizationId={1} />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject('API error'));

    render(<PatientList organizationId={1} />);

    expect(await screen.findByText('Error loading patients')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Backend tests
./gradlew test

# Frontend tests
pnpm test

# Coverage report
./gradlew jacocoTestReport
pnpm test --coverage
```

## Database Migrations

### Creating Migrations

```bash
# Create new migration file
# Format: V{version}__{description}.sql
# Example: V1.0.1__add_patient_email.sql
```

```sql
-- V1.0.1__add_patient_email.sql
ALTER TABLE patients
ADD COLUMN email VARCHAR(255);

CREATE INDEX idx_patients_email ON patients(email);
```

### Running Migrations

```bash
# Migrations run automatically on startup
# Or manually:
./gradlew flywayMigrate
```

## Debugging

### Backend Debugging

**IntelliJ IDEA**:
1. Set breakpoints in code
2. Click "Debug" button
3. Application starts in debug mode

**Remote Debugging**:
```bash
# Start with debug flags
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar

# In IntelliJ: Run → Edit Configurations → Add Remote JVM Debug
# Host: localhost, Port: 5005
```

### Frontend Debugging

**Browser DevTools**:
```typescript
// Add debugger statement
function fetchPatients() {
  debugger;  // Execution will pause here
  fetch('/api/patients')...
}
```

**VS Code Debugging**:
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["dev"],
      "port": 9229
    }
  ]
}
```

## Performance Optimization

### Backend

**Database Query Optimization**:
```java
// ❌ BAD - N+1 query problem
List<Patient> patients = patientRepository.findAll();
for (Patient patient : patients) {
    List<Appointment> appointments = patient.getAppointments();  // N queries
}

// ✅ GOOD - Fetch join
@Query("SELECT p FROM Patient p LEFT JOIN FETCH p.appointments")
List<Patient> findAllWithAppointments();
```

**Caching**:
```java
@Cacheable(value = "patients", key = "#id")
public Patient findById(Long id) {
    return patientRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Patient not found"));
}

@CacheEvict(value = "patients", key = "#patient.id")
public Patient updatePatient(Patient patient) {
    return patientRepository.save(patient);
}
```

### Frontend

**Code Splitting**:
```typescript
// Lazy load components
const PatientChart = lazy(() => import('./PatientChart'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <PatientChart />
    </Suspense>
  );
}
```

**Memoization**:
```typescript
// Memoize expensive calculations
const sortedPatients = useMemo(() => {
  return patients.sort((a, b) => a.lastName.localeCompare(b.lastName));
}, [patients]);

// Memoize callbacks
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

## Best Practices

1. **Write Tests** - Aim for 80%+ code coverage
2. **Code Reviews** - All code must be reviewed
3. **Keep PRs Small** - Max 400 lines changed
4. **Document Code** - Add JSDoc/JavaDoc for public APIs
5. **Follow Standards** - Use linters and formatters
6. **Security First** - Never commit secrets
7. **Performance** - Profile before optimizing

## Next Steps

- [Testing Guide](testing.md) - Detailed testing practices
- [API Documentation](../api/rest-api.md) - API reference
- [Contributing](contributing.md) - Contribution guidelines
- [Code Review](code-review.md) - Review checklist
