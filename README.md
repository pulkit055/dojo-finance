# Dojo Finance Tracker

Personal finance tracker for dojo income, expenses, and debt management.

## Setup (one time, ~10 minutes)

### Step 1 — Create GitHub repo
1. Go to github.com → click **New repository**
2. Name it `dojo-finance`
3. Set to **Private**
4. Click **Create repository**

### Step 2 — Upload these files
1. On your new repo page, click **uploading an existing file**
2. Drag and drop ALL files from this folder
3. Click **Commit changes**

### Step 3 — Create GitHub Token
1. Go to github.com → Settings → Developer settings → Personal access tokens → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name: `dojo-finance`
4. Expiration: **No expiration**
5. Tick the box: **repo** (full control)
6. Click **Generate token**
7. **Copy the token** — you won't see it again

### Step 4 — Deploy to Vercel
1. Go to vercel.com → sign up/log in with your GitHub account
2. Click **Add New Project**
3. Import your `dojo-finance` repo
4. Before clicking Deploy, click **Environment Variables** and add:
   - `GITHUB_TOKEN` → paste the token from Step 3
   - `GITHUB_OWNER` → your GitHub username
   - `GITHUB_REPO` → `dojo-finance`
5. Click **Deploy**

### Step 5 — Open your app
Vercel gives you a URL like `dojo-finance.vercel.app` — that's your app.
Bookmark it. Open from any device, any browser. Data is always in sync.

## How it works
- Data lives in `public/data.json` in your GitHub repo
- Every time you save a month, the app updates that file via GitHub API
- Every page load syncs the latest data from GitHub
- If offline, saves to browser cache and syncs next time you're online
- Full version history: GitHub tracks every save as a commit

## Files
```
dojo-finance/
├── public/
│   ├── index.html    ← the app
│   └── data.json     ← all your data (auto-updated)
├── api/
│   └── save.js       ← Vercel serverless function (read/write GitHub)
├── vercel.json       ← routing config
└── README.md         ← this file
```
