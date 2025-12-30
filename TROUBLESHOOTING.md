# Troubleshooting Admin Panel Upload Issues

## Common Issues and Solutions

### 1. "Upload failed" Error

**Possible Causes:**

- Netlify function not deployed or accessible
- Missing environment variables
- GitHub token issues
- Network/CORS issues

**Solutions:**

#### Check if Function is Accessible

1. Open browser DevTools → Network tab
2. Try uploading an image
3. Check the request to `/.netlify/functions/upload`
4. Look at the response status and error message

#### For Local Development:

Netlify functions only work when:

- Deployed to Netlify, OR
- Running via `netlify dev` command

**To run locally:**

```bash
npm install -g netlify-cli
netlify dev
```

This will start a local server with Netlify functions support.

#### Check Environment Variables

In Netlify dashboard:

1. Go to Site settings → Environment variables
2. Verify these are set:
   - `GITHUB_TOKEN` (your GitHub personal access token)
   - `GITHUB_USER` (your GitHub username)
   - `GITHUB_REPO` (your repository name)

#### Check GitHub Token Permissions

Your GitHub token needs:

- `repo` scope (Full control of private repositories)

To verify:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Check your token has `repo` scope enabled

### 2. "GITHUB_TOKEN environment variable is not set"

**Solution:**

- Add `GITHUB_TOKEN` in Netlify environment variables
- If testing locally, create `.env` file:
  ```
  GITHUB_TOKEN=your_token_here
  GITHUB_USER=aishwaryakalburgi
  GITHUB_REPO=shortsAndStories
  ```

### 3. "GitHub API error: Bad credentials"

**Solution:**

- Your GitHub token might be expired or invalid
- Generate a new token and update it in Netlify

### 4. "No files provided" or "Invalid file format"

**Solution:**

- Make sure you're selecting files before clicking upload
- Check browser console for any JavaScript errors
- Try with a smaller image file first

### 5. Function Returns 404

**Solution:**

- Make sure functions are deployed
- Check `netlify.toml` configuration
- Verify function file is in `netlify/functions/` directory
- Redeploy your site

### 6. CORS Errors

**Solution:**

- The function already includes CORS headers
- If still having issues, check browser console for specific CORS error
- Make sure you're accessing from the correct domain

## Testing the Function Directly

You can test the function using curl:

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/upload \
  -H "Content-Type: application/json" \
  -d '{
    "files": [{
      "name": "test.jpg",
      "data": "base64_encoded_data_here"
    }],
    "coupleId": "test-couple",
    "isCover": "false"
  }'
```

## Debug Steps

1. **Check Browser Console:**

   - Look for any JavaScript errors
   - Check Network tab for failed requests

2. **Check Netlify Function Logs:**

   - Go to Netlify dashboard
   - Site → Functions → View logs
   - Look for error messages

3. **Test GitHub Token:**

   ```bash
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
   ```

4. **Verify Repository Access:**
   - Make sure your token has access to the repository
   - Check if repository is private (token needs repo scope)

## Still Having Issues?

1. Check the error message in the alert dialog (now shows detailed error)
2. Check browser console for full error details
3. Check Netlify function logs
4. Verify all environment variables are set correctly
5. Make sure GitHub token has correct permissions
