# Deployment Guide

## Backend Deployment (Render)

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2. Deploy Backend
1. **Create New Web Service**
   - Connect your GitHub repository
   - Select the repository
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

2. **Add Environment Variables**
   ```env
   NODE_ENV=production
   PORT=10000
   CLOUDINARY_CLOUD_NAME=ds75rphlo
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_random_secret_key
   FRONTEND_URL=https://shortsandstorie.netlify.app
   ```

3. **Create Database**
   - Create new PostgreSQL database
   - Copy the connection string
   - Add as `DATABASE_URL` environment variable

4. **Update Database Schema**
   - After deployment, run database migration
   - Use Render shell or add to build command

### 3. Backend URL
Your backend will be available at:
`https://shots-stories-backend.onrender.com`

## Frontend Deployment (Netlify)

### 1. Update Netlify Settings
1. **Site Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Base Directory**: `frontend`

2. **Environment Variables**
   ```env
   VITE_API_URL=https://shots-stories-backend.onrender.com/api
   VITE_CLOUDINARY_CLOUD_NAME=ds75rphlo
   ```

3. **Deploy**
   - Push changes to GitHub
   - Netlify will auto-deploy

## Database Migration

After backend deployment, you need to set up the database:

1. **Access Render Shell**
2. **Run Prisma Commands**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## Important Notes

- **Free Tier Limitations**: Render free tier spins down after 15 minutes of inactivity
- **Cold Starts**: First request after spin-down may take 30+ seconds
- **Database**: Use PostgreSQL on Render (free tier available)
- **Environment Variables**: Never commit secrets to GitHub

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify environment variables are set
- Ensure database connection string is correct

### Frontend Issues
- Check browser console for API errors
- Verify VITE_API_URL points to correct backend
- Check CORS settings in backend

### Database Issues
- Verify DATABASE_URL format
- Check if database is accessible
- Run migrations if schema changes