# Semantic Release Configuration

This project uses [Semantic Release](https://semantic-release.gitbook.io/) for automated versioning and GitHub releases based on conventional commits.

## How It Works

### Automatic Versioning
- **feat:** commits → MINOR version bump (1.0.0 → 1.1.0)
- **fix:** commits → PATCH version bump (1.0.0 → 1.0.1)  
- **BREAKING CHANGE:** → MAJOR version bump (1.0.0 → 2.0.0)
- **docs:, style:, refactor:, test:, chore:** → PATCH version bump

### What Happens on Release
1. Analyzes commits since last release
2. Determines next version number
3. Generates changelog
4. Creates GitHub release
5. Updates package.json version
6. Commits changes back to repository

## Usage

### Automatic (Recommended)
Releases are automatically triggered when you push to the `main` branch. The GitHub Actions workflow will:
- Analyze your commits
- Create appropriate version bump
- Generate changelog
- Create GitHub release
- Update package.json

### Manual Release (Local)
If you want to test or run locally:

```bash
# Test what would happen (dry run)
pnpm run release:dry-run

# Create actual release
pnpm run release
```

**Note:** Manual releases require proper Git configuration and GitHub token setup.

## Configuration Files

- `.releaserc.json` - Semantic release configuration
- `.github/workflows/release.yml` - GitHub Actions workflow
- `package.json` - Contains version and release scripts

## Version Display

The app version is automatically injected into the build and displayed in:
- About page
- App info composable
- Build information

## Commit Message Examples

```bash
# Feature (MINOR bump)
feat: add new assessment-8 with advanced prompt engineering

# Bug fix (PATCH bump)  
fix: resolve quiz navigation issue

# Breaking change (MAJOR bump)
feat!: remove bug report system

BREAKING CHANGE: Bug report functionality has been completely removed

# Documentation (PATCH bump)
docs: update README with new assessment information

# Style/Refactor (PATCH bump)
style: improve button component styling
refactor: optimize quiz state management
```

## GitHub Releases

Each release will automatically create a GitHub release with:
- Version tag (e.g., v1.1.0)
- Changelog with all changes
- Release notes
- Downloadable assets (if configured)

## Benefits

✅ **Automated versioning** - No manual version management  
✅ **Consistent releases** - Based on commit message standards  
✅ **Automatic changelog** - Generated from commit history  
✅ **GitHub integration** - Releases created automatically  
✅ **Version display** - App shows current version to users  
✅ **CI/CD ready** - Works with GitHub Actions
