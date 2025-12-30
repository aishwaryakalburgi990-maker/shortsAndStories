import { v2 as cloudinary } from 'cloudinary';
import { config } from './env';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Test connection function
export const testCloudinaryConnection = async (): Promise<boolean> => {
  try {
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful:', result.status);
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error);
    return false;
  }
};

// Upload options for different image types
export const uploadOptions = {
  couples: {
    folder: 'shots-stories/couples',
    transformation: [
      { width: 1920, height: 1080, crop: 'limit' },
      { quality: 'auto:good' },
      { format: 'auto' }
    ],
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] as string[],
  },
  
  hero: {
    folder: 'shots-stories/hero',
    transformation: [
      { width: 1920, height: 1080, crop: 'limit' },
      { quality: 'auto:good' },
      { format: 'auto' }
    ],
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] as string[],
  },
  
  profile: {
    folder: 'shots-stories/profile',
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto:good' },
      { format: 'auto' }
    ],
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] as string[],
  },
};

export { cloudinary };
export default cloudinary;