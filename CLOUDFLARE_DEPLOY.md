# 🚀 Cloudflare Workers Deployment Guide

This repository includes an automated, tag-based GitHub Action workflow (`.github/workflows/deploy-cloudflare.yml`) to build and deploy this portfolio to Cloudflare Workers.

---

## 🔑 1. Setup GitHub Repository Secrets

In your GitHub repository, go to:
**Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ **New repository secret**

Add the following secrets:

### Option A: Using Cloudflare API Token (Recommended)
| Secret Name | Description | Where to find |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | API Token with *Edit Cloudflare Workers* permissions | Cloudflare Dashboard ➔ My Profile ➔ API Tokens ➔ Create Token (template: *Edit Cloudflare Workers*) |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID | Cloudflare Dashboard ➔ Workers & Pages ➔ Overview (Right sidebar: Account ID) |

### Option B: Using Email & Global API Key (User & Password fallback)
If you prefer user/password credentials:
| Secret Name | Description |
|---|---|
| `CLOUDFLARE_EMAIL` | Your Cloudflare login email address |
| `CLOUDFLARE_API_KEY` | Global API Key (Cloudflare Dashboard ➔ My Profile ➔ API Tokens ➔ Global API Key) |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |

---

## 🏷️ 2. Triggering Tag-Based Deployment

The workflow triggers automatically whenever a new Git tag is created and pushed to GitHub.

```bash
# 1. Commit any recent changes
git add .
git commit -m "feat: release new updates"
git push origin main

# 2. Create a version tag
git tag v1.0.0

# 3. Push the tag to trigger GitHub Action
git push origin v1.0.0
```

You can use any version format, such as `v1.0.1`, `v2.0.0`, or `1.0.0`.

---

## ⚡ 3. Manual Deployment (Optional)

1. You can manually trigger the deployment anytime by visiting the **Actions** tab in your GitHub repository, selecting **Deploy to Cloudflare Workers**, and clicking **Run workflow**.
2. Or deploy directly from your local machine:
```bash
npm run build
npm run deploy
```

---

## ⚙️ 4. Worker Configuration (`wrangler.toml`)

- **Name**: `amirhossein-portfolio` (Can be customized in `wrangler.toml`)
- **Assets Directory**: `./dist`
- **Routing**: Single Page Application (SPA fallback enabled)
