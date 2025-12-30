import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { testCloudinaryConnection } from './config/cloudinary';
import prisma from './config/database';

// Import routes
import authRoutes from './routes/auth';
import couplesRoutes from './routes/couples';
import imagesRoutes from './routes/images';
import heroRoutes from './routes/hero';
import aboutRoutes from './routes/about';

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: config.server.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Test Cloudinary connection
    const cloudinaryStatus = await testCloudinaryConnection();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        cloudinary: cloudinaryStatus ? 'connected' : 'disconnected',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/couples', couplesRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Global error handler:', error);
  
  res.status(error.status || 500).json({
    error: config.server.nodeEnv === 'development' ? error.message : 'Internal server error',
    ...(config.server.nodeEnv === 'development' && { stack: error.stack }),
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test Cloudinary connection
    await testCloudinaryConnection();
    
    // Start listening
    app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
      console.log(`📱 Environment: ${config.server.nodeEnv}`);
      console.log(`🌐 Health check: http://localhost:${config.server.port}/health`);
      
      if (config.server.nodeEnv === 'development') {
        console.log(`🔗 Frontend URL: ${config.server.frontendUrl}`);
        console.log('\n📋 Available API endpoints:');
        console.log('   Auth: /api/auth/*');
        console.log('   Couples: /api/couples/*');
        console.log('   Images: /api/images/*');
        console.log('   Hero: /api/hero/*');
        console.log('   About: /api/about/*');
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();