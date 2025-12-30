import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });
  console.error('\n📝 Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

// Export configuration object
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL!,
  },

  // Server
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },

  // Image Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '12582912', 10), // 12MB flexible limit for ultra-quality
    maxFilesPerUpload: parseInt(process.env.MAX_FILES_PER_UPLOAD || '20', 10), // Allow more files
    compressionQuality: parseInt(process.env.COMPRESSION_QUALITY || '92', 10), // Higher default quality
    maxImageWidth: parseInt(process.env.MAX_IMAGE_WIDTH || '3840', 10), // Allow 4K width
    maxImageHeight: parseInt(process.env.MAX_IMAGE_HEIGHT || '2160', 10), // Allow 4K height
    useAdvancedCompression: process.env.USE_ADVANCED_COMPRESSION !== 'false', // Default to true
    preferWebP: process.env.PREFER_WEBP !== 'false', // Default to true
    ultraQualityMode: process.env.ULTRA_QUALITY_MODE !== 'false', // Default to true
  },
} as const;

// Log configuration (excluding sensitive data)
if (config.server.nodeEnv === 'development') {
  console.log('🔧 Configuration loaded:');
  console.log(`   - Environment: ${config.server.nodeEnv}`);
  console.log(`   - Port: ${config.server.port}`);
  console.log(`   - Frontend URL: ${config.server.frontendUrl}`);
  console.log(`   - Max file size: ${(config.upload.maxFileSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   - Cloudinary: ${config.cloudinary.cloudName}`);
}