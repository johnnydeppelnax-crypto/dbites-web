# D-Bites — Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com with GitHub)

## Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dbites.git
git push -u origin main
```

### 2. Set Up Vercel Postgres Database
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Go to **Storage** tab
3. Click **Create Database** → Select **Postgres (Neon)**
4. Choose the free plan and create
5. Copy the `DATABASE_URL` connection string

### 3. Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `prisma migrate deploy && next build`
   - **Output Directory**: (leave default)
4. Add Environment Variables:
   - `DATABASE_URL` = your PostgreSQL connection string from step 2
5. Click **Deploy**

### 4. Seed the Database
After deployment, visit: `https://your-app.vercel.app/api/seed` with a POST request
(Or use the app — products are auto-seeded on first visit)

### 5. Install as App (PWA)
- **Desktop Chrome**: Click the install icon in the address bar
- **Mobile Chrome**: Tap "Add to Home Screen" from the browser menu
- The app will install as a standalone application

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |

## Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
