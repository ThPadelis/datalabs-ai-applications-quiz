# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 🔧 Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Configure Base Path (if needed)

The `vite.config.js` is configured to automatically use the correct base path:

```javascript
base: process.env.GITHUB_ACTIONS ? "/datalabs-voucher/" : "/"
```

**Important:** Update `/datalabs-voucher/` to match your repository name if different.

### 3. Push to Main Branch

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the project
- Deploy to GitHub Pages

### 4. Access Your Site

After deployment completes (2-3 minutes), your site will be available at:

```
https://[your-username].github.io/datalabs-voucher/
```

## 🔄 Automatic Deployments

The workflow triggers on:
- ✅ Every push to `main` or `master` branch
- ✅ Manual trigger via Actions tab

## 📋 Workflow File

Location: `.github/workflows/deploy.yml`

### Features:
- **pnpm caching** - Faster builds
- **Node.js 20** - Latest LTS version
- **Concurrency control** - Prevents multiple deployments
- **Artifact upload** - GitHub Pages compatible

## 🐛 Troubleshooting

### Deployment Failed

**Check:**
1. Repository Settings → Pages → Source is set to "GitHub Actions"
2. Workflow has permissions to deploy (should be automatic)
3. Build succeeds locally with `pnpm build`

### 404 Errors After Deployment

**Fix:**
1. Ensure `base` path in `vite.config.js` matches repository name
2. Check that `.nojekyll` file exists in `public/` folder
3. Verify PWA manifest `start_url` is set to `"./"` (relative)

### Service Worker Not Working

**Check:**
1. Site is accessed via HTTPS (required for Service Workers)
2. Wait a few minutes after deployment for SW to register
3. Hard refresh browser (Ctrl+Shift+R)

## 🔐 Required Permissions

The workflow needs these permissions (already configured):
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authentication

## 📊 Build Information

**Build Time:** ~2-3 minutes  
**Bundle Size:** ~500KB (gzipped)  
**Caching:** Dependencies cached between builds

## 🎯 Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file to `public/` folder:
   ```
   your-domain.com
   ```

2. Configure DNS:
   - Add A records pointing to GitHub IPs
   - Or add CNAME record pointing to `[username].github.io`

3. Enable HTTPS in repository Settings → Pages

## 📱 PWA Considerations

**Important:** After deployment, the PWA will:
- Cache all assets for offline use
- Update automatically when new versions are deployed
- Work offline after first visit
- Be installable on all devices

**Note:** First-time users need internet to load the app initially.

## 🔄 Update Process

When you make changes:

1. Commit and push to main
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```

2. GitHub Actions automatically deploys

3. Users will see update prompt on next visit

4. PWA updates automatically in background

## 📈 Monitoring

Check deployment status:
- **Actions tab** - View workflow runs
- **Deployments section** - See deployment history
- **Environment** - View active deployment

## 🚀 Production Checklist

Before deploying to production:

- [ ] Update base path in `vite.config.js`
- [ ] Test build locally: `pnpm build && pnpm preview`
- [ ] Verify PWA works offline
- [ ] Check all routes work with base path
- [ ] Test on mobile devices
- [ ] Verify service worker updates
- [ ] Check GitHub Pages settings
- [ ] Test deployment with small change

## 💡 Tips

1. **Test Locally First**
   ```bash
   pnpm build
   pnpm preview
   ```
   This simulates the production environment

2. **Clear Cache**
   If changes don't appear, clear service worker:
   - DevTools → Application → Service Workers → Unregister
   - Then refresh

3. **Monitor Build**
   Watch the Actions tab for build progress and errors

4. **Deployment URL**
   Save the deployment URL for easy access

---

**Need Help?** Check the GitHub Actions logs for detailed error messages.

