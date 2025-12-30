# Shots & Stories Photography Portfolio

A full-stack photography portfolio application with admin panel for managing couples, galleries, and content.

## Project Structure

```
shots-and-stories/
├── frontend/          # React + TypeScript + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── backend/           # Node.js + Express + Prisma backend
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── README.md
└── README.md         # This file
```

## Deployment

### Frontend (Netlify)
- **Repository**: Connect this repo to Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `frontend/dist`
- **Base Directory**: `frontend`

### Backend (Render)
- **Repository**: Connect this repo to Render
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `backend`
- **Environment**: Node.js

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

### Backend (.env)
```env
DATABASE_URL=mysql://user:pass@host:port/database
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-netlify-site.netlify.app
```

## Features

- **Portfolio Management**: Add/edit/delete couple portfolios
- **Image Management**: Upload, compress, and organize images
- **Hero Images**: Manage homepage slider images
- **Video Integration**: Google Drive video embedding
- **Admin Authentication**: Secure admin panel
- **Responsive Design**: Mobile-friendly interface
- **Image Optimization**: Automatic compression with Sharp
- **Cloud Storage**: Cloudinary integration

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Custom hooks for state management

### Backend
- Node.js + Express
- Prisma ORM with MySQL
- JWT authentication
- Multer for file uploads
- Sharp for image processing
- Cloudinary for image storage

## Getting Started

1. **Clone the repository**
2. **Setup Backend**: Follow `backend/README.md`
3. **Setup Frontend**: Follow `frontend/README.md`
4. **Deploy Backend**: Use Render (see DEPLOYMENT.md)
5. **Deploy Frontend**: Use Netlify with the backend URL

## Admin Access

- **URL**: `/login`
- **Default Credentials**: `admin@shotsandstories.com` / `admin123`
- **Change password in production!**