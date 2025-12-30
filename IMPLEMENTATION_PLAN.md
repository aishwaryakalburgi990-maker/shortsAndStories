# Implementation Plan - Shots & Stories Migration

## Phase 1: Backend Setup (Week 1)

### 1.1 Database Setup
- [ ] Choose MySQL provider (PlanetScale recommended)
- [ ] Create database and run schema
- [ ] Set up connection pooling
- [ ] Create database models with Prisma/Sequelize

### 1.2 Basic API Structure
- [ ] Initialize Node.js/Express project
- [ ] Set up TypeScript configuration
- [ ] Create basic route structure
- [ ] Add CORS and security middleware
- [ ] Set up environment variables

### 1.3 Authentication System
- [ ] Implement JWT authentication
- [ ] Create login/logout endpoints
- [ ] Add password hashing (bcrypt)
- [ ] Create auth middleware for protected routes

### 1.4 Image Processing Setup
- [ ] Configure Cloudinary account
- [ ] Set up Sharp for image compression
- [ ] Create image upload middleware
- [ ] Test compression (10MB max, 80% quality)

## Phase 2: Core API Development (Week 2) ✅ COMPLETED

### 2.1 Couples Management API ✅
- [x] GET /api/couples (public)
- [x] GET /api/couples/:id (public)
- [x] POST /api/couples (admin)
- [x] PUT /api/couples/:id (admin)
- [x] DELETE /api/couples/:id (admin)
- [x] POST /api/couples/:coupleId/images (admin) - Upload couple images
- [x] POST /api/couples/:coupleId/cover (admin) - Upload cover image
- [x] DELETE /api/couples/images/:imageId (admin) - Delete couple image
- [x] PUT /api/couples/:coupleId/images/reorder (admin) - Reorder images

### 2.2 Images Management API ✅
- [x] POST /api/images/upload (admin) - Generic image upload
- [x] DELETE /api/images/:id (admin) - Generic image deletion
- [x] PUT /api/images/reorder (admin) - Generic image reordering
- [x] Handle multiple image uploads with Sharp compression
- [x] Implement image deletion from Cloudinary
- [x] Image compression with Sharp (10MB max, configurable quality)

### 2.3 Hero & About APIs ✅
- [x] GET /api/hero (public) - Get hero images
- [x] POST /api/hero/upload (admin) - Upload hero image
- [x] PUT /api/hero/:id (admin) - Update hero image
- [x] DELETE /api/hero/:id (admin) - Delete hero image
- [x] PUT /api/hero/reorder (admin) - Reorder hero images
- [x] GET /api/about (public) - Get about information
- [x] PUT /api/about (admin) - Update about information
- [x] POST /api/about/upload-profile (admin) - Upload profile image

### 2.4 Authentication System ✅
- [x] POST /api/auth/login - Admin login
- [x] POST /api/auth/logout - Admin logout
- [x] GET /api/auth/profile - Get admin profile
- [x] JWT token authentication middleware
- [x] Protected routes for admin operations

### 2.5 Technical Implementation ✅
- [x] TypeScript compilation issues resolved
- [x] Multer file upload middleware (10MB limit)
- [x] Sharp image compression (configurable quality)
- [x] Cloudinary integration with organized folders
- [x] Prisma ORM with MySQL database
- [x] Input validation with Joi
- [x] Error handling and logging
- [x] CORS and security middleware
- [x] Rate limiting
- [x] Health check endpoint

**✅ PHASE 2 STATUS: COMPLETED**
- All API endpoints implemented and tested
- Image upload functionality working with compression
- Authentication system fully functional
- Database operations working correctly
- Server running successfully on port 3001

## Phase 3: Frontend Migration (Week 3) ✅ COMPLETED

### 3.1 Remove Old System ✅
- [x] Delete netlify/functions/ directory
- [x] Remove GitHub upload logic from Admin.tsx
- [x] Remove old data loading from couples.ts
- [x] Clean up unused dependencies (@netlify/functions, @octokit/rest, @supabase/supabase-js, form-data)
- [x] Remove old data.json file
- [x] Remove old CDN utilities

### 3.2 API Service Layer ✅
- [x] Create API service classes (src/services/api.ts)
- [x] Implement error handling with ApiError class
- [x] Add loading states and custom hooks
- [x] Create custom hooks for data fetching (useApi, useMutation)
- [x] Create specific hooks for each data type (useCouples, useHero, useAbout, useAuth)

### 3.3 Update Public Pages ✅
- [x] Modify Hero component to use new API with fallback images
- [x] Update Portfolio component to fetch from database
- [x] Update CouplePortfolio to fetch individual couples from API
- [x] Update About component for dynamic content from API
- [x] Add proper loading states and error handling
- [x] Maintain backward compatibility with fallback data

### 3.4 Authentication System ✅
- [x] Create Login page with proper form validation
- [x] Implement JWT token management
- [x] Add authentication hooks (useAuth)
- [x] Create protected routes for admin panel
- [x] Add logout functionality

### 3.5 New Admin Panel ✅
- [x] Replace old admin system with new API-based panel
- [x] Create tabbed interface (Couples, Hero Images, About)
- [x] Add authentication protection
- [x] Implement basic CRUD operations display
- [x] Add proper loading states and error handling
- [x] Create responsive design

**✅ PHASE 3 STATUS: COMPLETED**
- All frontend components migrated to use new API
- Old GitHub-based system completely removed
- New authentication system implemented
- Admin panel redesigned with modern interface
- Proper error handling and loading states added
- Environment configuration updated (.env file)
- All old dependencies removed

## Phase 4: Admin Panel Rebuild (Week 4)

### 4.1 Authentication UI
- [ ] Create login page
- [ ] Implement protected routes
- [ ] Add logout functionality
- [ ] Handle token refresh

### 4.2 Couples Management UI
- [ ] Rebuild couples list with database data
- [ ] Create couple form (add/edit)
- [ ] Implement image upload with compression preview
- [ ] Add drag-and-drop image reordering
- [ ] Add delete confirmations

### 4.3 Hero & About Management
- [ ] Hero images manager with reordering
- [ ] About section editor
- [ ] Profile image upload

## Phase 5: Testing & Deployment (Week 5)

### 5.1 Testing
- [ ] Test all CRUD operations
- [ ] Test image upload/compression
- [ ] Test authentication flow
- [ ] Test responsive design
- [ ] Performance testing

### 5.2 Deployment
- [ ] Deploy backend (Railway/Render)
- [ ] Deploy frontend (Netlify/Vercel)
- [ ] Set up environment variables
- [ ] Configure domain and SSL

### 5.3 Data Migration
- [ ] Export existing couple data
- [ ] Import into new database
- [ ] Migrate existing images to Cloudinary
- [ ] Update image URLs in database

## Technical Specifications

### Image Compression Settings
```javascript
// Sharp configuration
const compressImage = async (buffer) => {
  return await sharp(buffer)
    .resize(1920, 1080, { 
      fit: 'inside', 
      withoutEnlargement: true 
    })
    .jpeg({ 
      quality: 80, 
      progressive: true 
    })
    .toBuffer();
};
```

### Database Connection (PlanetScale)
```javascript
// Using Prisma
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});
```

### Cloudinary Configuration
```javascript
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

## Environment Variables Needed

### Backend (.env)
```
DATABASE_URL=mysql://...
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## Success Metrics
- [ ] All existing functionality preserved
- [ ] Image upload size increased to 10MB
- [ ] Admin panel more user-friendly
- [ ] Better performance (database vs file-based)
- [ ] Scalable architecture for future features
- [ ] No more deployment issues with image uploads

## Risk Mitigation
- Keep old system running until new one is fully tested
- Backup all existing data before migration
- Test image compression thoroughly
- Have rollback plan ready
- Monitor performance after deployment