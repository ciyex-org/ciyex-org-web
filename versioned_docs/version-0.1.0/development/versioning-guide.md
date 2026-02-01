# Documentation Versioning Guide

Guide to managing multiple versions of documentation in parallel using Docusaurus.

## Core Concept
Docusaurus uses a **snapshot-based** versioning system.

- **`docs/` Directory**: This is the **Next** version (e.g., the upcoming v2.0.0). All active development happens here.
- **`versioned_docs/` Directory**: These are **Frozen Snapshots** of past versions (e.g., v1.0.0).

## Workflow Scenarios

### 1. Adding a New Feature (Future Version)
You are documenting a feature that will be released in the future (v2.0).
1. Edit files in the standard **`docs/`** folder.
2. These changes will appear in the "Next" version on the site.
3. They **DO NOT** affect the live v1.0.0 documentation.

### 2. Fixing a Bug in Live Docs (v1.0.0)
You found a typo in the currently released v1.0.0 user guide.
1. Navigate to **`versioned_docs/version-1.0.0/`**.
2. Find and edit the markdown file there.
3. The change reflects immediately on the live v1.0.0 site (after rebuild).

### 3. Releasing a New Version
When v2.0 software is released, you snapshot the current docs.
```bash
npm run docusaurus docs:version 2.0.0
```
This command:
1. Copies everything from `docs/` -> `versioned_docs/version-2.0.0/`.
2. Creates `versioned_sidebars/version-2.0.0-sidebars.json`.

Now `docs/` becomes the workspace for v3.0.

## Sidebar Management

- **Next Version**: Managed via **`sidebars.ts`**.
- **v1.0.0**: Managed via **`versioned_sidebars/version-1.0.0-sidebars.json`**.
- **v2.0.0**: Managed via **`versioned_sidebars/version-2.0.0-sidebars.json`**.

If you change the structure of the "Next" version (e.g., move files), you must update `sidebars.ts`.
If you want to restructure v1.0.0, you must update its specific JSON file.

## Best Practices

1. **Don't touch `versioned_docs` unless patching**: Treat versions as immutable history unless correcting significant errors.
2. **Keep `sidebars.ts` clean**: This is your master structure for the future.
3. **Check Version IDs**: When moving files, ensure `id` frontmatter doesn't conflict if you have explicit routing.
