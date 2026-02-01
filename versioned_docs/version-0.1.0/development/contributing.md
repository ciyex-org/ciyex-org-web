# Contributing Guidelines

Thank you for your interest in contributing to Ciyex EHR!

## Code of Conduct

Please treat everyone with respect. Harassment or abusive behavior will not be tolerated.

## Getting Started

1. **Fork the Repository**: Create your own fork on GitHub.
2. **Clone Locally**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ciyex.git
   ```
3. **Setup Environment**: Follow the [Local Setup Guide](../installation/local-setup.md).

## Development Workflow

1. **Create a Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
   Prefixes: `feature/`, `fix/`, `docs/`, `refactor/`.

2. **Make Changes**: Write code and **add tests**.

3. **Commit**: Use clear, descriptive commit messages.
   ```bash
   git commit -m "feat: Add telehealth waiting room"
   ```

4. **Push**:
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**: Target the `main` branch. Provide a description of your changes.

## Code Style

### Java (Backend)
- Use standard Java naming conventions.
- Checkstyle is enforced via Gradle.
   ```bash
   ./gradlew checkstyleMain
   ```

### TypeScript/React (Frontend)
- Use Prettier and ESLint.
   ```bash
   npm run lint
   ```

## Definition of Done

A PR is gathered "ready" when:
- [ ] All tests pass.
- [ ] New code is covered by tests.
- [ ] Documentation is updated (if applicable).
- [ ] Linter checks pass.

## Reporting Bugs

Please use the GitHub Issues tab. Include:
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots/Logs
