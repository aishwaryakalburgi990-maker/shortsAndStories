# New Project Structure

```
shortsAndStories/
│
├── frontend/                      # React Vite App
│   ├── src/
│   │   ├── components/
│   │   │   ├── public/           # Public-facing components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Portfolio.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   └── Footer.tsx
│   │   │   │
│   │   │   └── admin/            # Admin panel components
│   │   │       ├── AdminLayout.tsx
│   │   │       ├── CoupleManager.tsx
│   │   │       ├── CoupleForm.tsx
│   │   │       ├── ImageUploader.tsx
│   │   │       ├── HeroManager.tsx
│   │   │       ├── AboutManager.tsx
│   │   │       └── ImageGallery.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Portfolio.tsx
│   │   │   │   ├── CouplePortfolio.tsx
│   │   │   │   ├── Videos.tsx
│   │   │   │   └── About.tsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── AdminLogin.tsx
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── ManageCouples.tsx
│   │   │       ├── ManageHero.tsx
│   │   │       └── ManageAbout.tsx
│   │   │
│   │   ├── services/             # API service layer
│   │   │   ├── api.ts           # Base API config
│   │   │   ├── couples.ts       # Couples API calls
│   │   │   ├── images.ts        # Image upload/management
│   │   │   ├── hero.ts          # Hero images API
│   │   │   ├── about.ts         # About API
│   │   │   └── auth.ts          # Authentication
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useCouples.ts
│   │   │   ├── useImageUpload.ts
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── types/               # TypeScript types
│   │   │   ├── couple.ts
│   │   │   ├── image.ts
│   │   │   └── about.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── imageCompression.ts
│   │   │   └── validation.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts      # MySQL connection
│   │   │   ├── cloudinary.ts    # Cloudinary config
│   │   │   └── env.ts           # Environment variables
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts          # JWT authentication
│   │   │   ├── upload.ts        # Multer config
│   │   │   ├── compression.ts   # Sharp image compression
│   │   │   └── errorHandler.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── couples.ts       # Couples CRUD
│   │   │   ├── images.ts        # Image upload/delete
│   │   │   ├── hero.ts          # Hero images
│   │   │   ├── about.ts         # About management
│   │   │   └── auth.ts          # Login/logout
│   │   │
│   │   ├── controllers/
│   │   │   ├── couplesController.ts
│   │   │   ├── imagesController.ts
│   │   │   ├── heroController.ts
│   │   │   ├── aboutController.ts
│   │   │   └── authController.ts
│   │   │
│   │   ├── models/              # Database models
│   │   │   ├── Couple.ts
│   │   │   ├── CoupleImage.ts
│   │   │   ├── HeroImage.ts
│   │   │   ├── AboutMe.ts
│   │   │   └── AdminUser.ts
│   │   │
│   │   ├── services/
│   │   │   ├── cloudinaryService.ts
│   │   │   ├── imageService.ts
│   │   │   └── authService.ts
│   │   │
│   │   └── server.ts            # Express app
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── database-schema.sql
├── .env.example
└── README.md
```

## Key Features by Module

### Frontend - Public Pages
- Homepage with hero slider
- Portfolio grid with couple cards
- Individual couple galleries
- Videos page
- About page
- Contact form

### Frontend - Admin Panel
- Protected routes (JWT authentication)
- Couple management (CRUD)
- Image upload with compression preview
- Drag-and-drop reordering
- Hero image management
- About section editor

### Backend API Endpoints
```
POST   /api/auth/login
POST   /api/auth/logout

GET    /api/couples
GET    /api/couples/:id
POST   /api/couples
PUT    /api/couples/:id
DELETE /api/couples/:id

POST   /api/images/upload
DELETE /api/images/:id
PUT    /api/images/reorder

GET    /api/hero
POST   /api/hero/upload
PUT    /api/hero/reorder
DELETE /api/hero/:id

GET    /api/about
PUT    /api/about
POST   /api/about/upload-profile
```

### Image Processing Flow
1. User selects image in admin panel
2. Frontend validates file (type, size)
3. Image sent to backend
4. Sharp compresses image (max 10MB, quality 80%)
5. Compressed image uploaded to Cloudinary
6. Cloudinary URL saved to MySQL
7. Frontend receives URL and updates UI
