# Development Workflow

Process for planning, coding, and shipping features in Ciyex EHR.

## 1. Planning
- **Issue Tracking**: Features start as GitHub Issues.
- **RFCs**: Major architectural changes require a Request for Comments (RFC) document first.

## 2. Environment Setup
Developers should run the full stack locally.
- Backend: IntelliJ IDEA (Recommended)
- Frontend: VS Code
- Database: Docker container

## 3. Implementation Cycle
1. **Pull Latest**: `git pull origin main`
2. **Branch**: `git checkout -b feature/xyz`
3. **Code**: Implement changes.
4. **Test**: Run `./gradlew test` (backend) and `npm test` (frontend).
5. **Lint**: Fix any style violations.

## 4. Code Review
- **Self-Review**: Review your own diff before assigning others.
- **Reviewers**: Assign at least one core maintainer.
- **Feedback**: Address comments promptly.

## 5. Merging
- **Squash & Merge**: We use squash merge to keep the history clean.
- **Delete Branch**: Delete the feature branch after merge.

## 6. Deployment
- **Dev**: Merges to `develop` deploy automatically to the Dev environment.
- **Staging**: Merges to `main` deploy to Staging.
- **Prod**: Tagged releases deploy to Production.

## Tools
- **Jira/Linear**: Project management.
- **GitHub**: Source control & CI.
- **Slack**: Team communication.
