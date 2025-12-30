# Admin Panel Setup Guide

This guide will help you set up the dynamic content management system for your portfolio website.

## Architecture Overview

1. **Admin Panel** (`/admin`) - Upload images and manage portfolio data
2. **Netlify Functions** - Handle image uploads and GitHub commits
3. **data.json** - Stores all portfolio data in `public/data.json`
4. **CDN** - Images served via jsDelivr from GitHub

## Step 1: Install Dependencies

```bash
npm install @netlify/functions @octokit/rest
```

## Step 2: Set Up GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio CMS"
4. Select scopes:
   - `repo` (Full control of private repositories)
5. Generate and copy the token

## Step 3: Configure Netlify Environment Variables

In your Netlify project dashboard:

1. Go to Site settings → Environment variables
2. Add these environment variables:

```
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USER=aishwaryakalburgi
GITHUB_REPO=shortsAndStories
```

## Step 4: Create Uploads Directory

Create the uploads directory in your repo:

```bash
mkdir -p public/uploads
```

Add a `.gitkeep` file to keep it in git:

```bash
touch public/uploads/.gitkeep
```

## Step 5: Update Admin Component

The admin panel is already created at `/src/pages/Admin.tsx`. Make sure the GitHub username and repo match your setup.

## Step 6: Access Admin Panel

1. Deploy your site to Netlify
2. Navigate to `https://yourdomain.com/admin`
3. Start uploading images and managing your portfolio!

## How It Works

### Image Upload Flow:

1. User selects images in admin panel
2. Images are converted to base64 and sent to `/.netlify/functions/upload`
3. Netlify function commits images to `public/uploads/` in GitHub
4. Images are accessible via jsDelivr CDN

### Data Update Flow:

1. User edits couple data in admin panel
2. Clicks "Save All Changes"
3. Data is sent to `/.netlify/functions/save-data`
4. Netlify function updates `public/data.json` in GitHub
5. Website automatically uses new data

### CDN URLs:

Images are served from:

```
https://cdn.jsdelivr.net/gh/USERNAME/REPO@main/public/uploads/filename.jpg
```

## Security Considerations

1. **Protect Admin Route**: Add authentication to `/admin` route
2. **Rate Limiting**: Consider adding rate limits to API routes
3. **File Validation**: Validate file types and sizes
4. **GitHub Token**: Keep token secure, never commit to repo

## Troubleshooting

### Images not showing:

- Check GitHub repo has `public/uploads/` directory
- Verify CDN URL format matches your repo
- Check browser console for 404 errors

### Upload fails:

- Verify `GITHUB_TOKEN` is set in Netlify environment variables
- Check token has `repo` scope
- Verify GitHub username and repo name are correct
- Check Netlify function logs (Site settings → Functions → View logs)

### Data not updating:

- Check `public/data.json` exists in repo
- Verify Netlify function has correct GitHub credentials
- Check Netlify function logs for errors
- Ensure functions are deployed (check Functions tab in Netlify dashboard)

## Next Steps

1. Add authentication to admin panel
2. Add image optimization/compression
3. Add preview before saving
4. Add bulk operations
5. Add image deletion functionality
