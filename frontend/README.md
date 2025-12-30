# Shots & Stories - Frontend

React + TypeScript + Vite frontend for the Shots & Stories photography portfolio.

## Features

- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Image galleries with lightbox
- Video integration with Google Drive
- Admin panel for content management
- Authentication system

## Environment Variables

Create a `.env` file with:

```env
VITE_API_URL=https://your-backend-url.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This frontend is designed to be deployed on Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   └── styles/        # Global styles
├── public/            # Static assets
└── dist/             # Build output
```