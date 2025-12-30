# Shots & Stories Backend API

Backend API for the Shots & Stories Photography Portfolio built with Node.js, Express, Prisma, and MySQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+ running on localhost
- npm or yarn

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**
```env
DATABASE_URL="mysql://username:password@localhost:3306/shots_stories"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### 3. Database Setup
```bash
# Create database (run this in MySQL)
CREATE DATABASE shots_stories;

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 📊 Database Schema

### Tables Created:
- **couples** - Main portfolio entries
- **couple_images** - Gallery images for each couple
- **hero_images** - Homepage slider images  
- **about_me** - About section content (single row)
- **admin_users** - Authentication

### Default Data:
- Admin user: `admin@shotsandstories.com` / `admin123`
- Sample couples with gallery images
- Hero images for homepage slider
- About me content

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Create and run migrations
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:seed      # Seed database with sample data
```

## 🔍 API Endpoints (Coming Soon)

```
Health Check:
GET /health

Authentication:
POST /api/auth/login
POST /api/auth/logout

Couples:
GET    /api/couples
GET    /api/couples/:id
POST   /api/couples
PUT    /api/couples/:id
DELETE /api/couples/:id

Images:
POST   /api/images/upload
DELETE /api/images/:id
PUT    /api/images/reorder

Hero Images:
GET    /api/hero
POST   /api/hero/upload
PUT    /api/hero/reorder
DELETE /api/hero/:id

About:
GET    /api/about
PUT    /api/about
POST   /api/about/upload-profile
```

## 🧪 Testing the Setup

### 1. Health Check
```bash
curl http://localhost:3001/health
```

### 2. Database Connection
```bash
# Should return database status
curl http://localhost:3001/health | jq '.services.database'
```

### 3. Prisma Studio
```bash
npm run db:studio
# Opens http://localhost:5555 - GUI for database
```

## 🔧 Configuration

### Image Upload Settings
- Max file size: 10MB
- Supported formats: JPG, PNG, WebP
- Compression: 80% quality
- Max dimensions: 1920x1080

### Security Features
- Helmet.js for security headers
- CORS configured for frontend
- Rate limiting (100 requests/15min)
- JWT authentication
- Password hashing with bcrypt

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Prisma client setup
│   │   ├── env.ts       # Environment validation
│   │   └── cloudinary.ts # Cloudinary config
│   ├── routes/          # API routes (coming next)
│   ├── controllers/     # Route handlers (coming next)
│   ├── middleware/      # Custom middleware (coming next)
│   ├── services/        # Business logic (coming next)
│   ├── seed.ts          # Database seeding
│   └── server.ts        # Express app setup
├── prisma/
│   └── schema.prisma    # Database schema
├── .env.example         # Environment template
└── package.json
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test MySQL connection
mysql -u username -p -h localhost

# Check if database exists
SHOW DATABASES;
```

### Prisma Issues
```bash
# Reset database (⚠️ DESTRUCTIVE)
npx prisma db push --force-reset

# Regenerate client
npm run db:generate
```

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

## 🔄 Next Steps

1. ✅ Database setup complete
2. 🔄 Create API routes and controllers
3. 🔄 Implement image upload with Sharp compression
4. 🔄 Add authentication middleware
5. 🔄 Connect frontend to new API

## 📝 Notes

- Change admin password in production
- Set up proper environment variables for production
- Configure Cloudinary account
- Set up database backups for production