# Netlify Deployment Guide

## Overview

This rental application form is configured for deployment on Netlify with serverless functions. The application uses a React frontend with a Node.js serverless backend.

## Files Added for Netlify

1. **netlify.toml** - Main Netlify configuration file
2. **netlify/functions/api.js** - Serverless function for API routes
3. **_headers** - HTTP security headers configuration
4. **NETLIFY_DEPLOYMENT.md** - This deployment guide

## Deployment Steps

### 1. Connect to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository

### 2. Build Settings

Netlify will automatically detect the settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

### 3. Environment Variables (Optional)

If you plan to use a real database later, add these environment variables in Netlify dashboard:

- `DATABASE_URL` - Your PostgreSQL connection string
- `NODE_ENV` - Set to `production`

### 4. Deploy

Click "Deploy site" and Netlify will:
1. Install dependencies
2. Build the React application
3. Deploy serverless functions
4. Serve your application

## Features

- **Frontend**: Static React application served from CDN
- **Backend**: Serverless functions for API endpoints
- **Storage**: In-memory storage (data resets on each function cold start)
- **CORS**: Properly configured for cross-origin requests
- **Security**: HTTP security headers included

## API Endpoints

After deployment, your API will be available at:

- `POST /api/rental-applications` - Submit new application
- `GET /api/rental-applications` - List all applications
- `GET /api/rental-applications/:id` - Get specific application

## Local Development

For local development, continue using:
```bash
npm run dev
```

This runs the full-stack application locally with hot reload.

## Notes

- The current setup uses in-memory storage, so data is lost on function restarts
- For production use, consider integrating with a persistent database
- Netlify Functions have a 10-second execution limit
- File uploads are handled in-memory with base64 encoding

## Troubleshooting

1. **Build Failures**: Check the build logs in Netlify dashboard
2. **Function Errors**: Check function logs in Netlify dashboard
3. **CORS Issues**: Verify `_headers` file is properly configured
4. **API Routes**: Ensure all API calls use `/api/` prefix