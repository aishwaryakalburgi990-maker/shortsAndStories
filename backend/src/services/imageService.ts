import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/env';
import { uploadOptions } from '../config/cloudinary';

export interface CompressedImage {
  buffer: Buffer;
  originalSize: number;
  compressedSize: number;
  format: string;
  width: number;
  height: number;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

// Advanced compression with format optimization
export const compressImageAdvanced = async (
  imageBuffer: Buffer,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    targetMaxSize?: number;
    preferWebP?: boolean; // Use WebP for better compression
  } = {}
): Promise<CompressedImage> => {
  const {
    maxWidth = config.upload.maxImageWidth,
    maxHeight = config.upload.maxImageHeight,
    quality = config.upload.compressionQuality,
    targetMaxSize = config.upload.maxFileSize,
    preferWebP = true, // Default to WebP for better compression
  } = options;

  try {
    const metadata = await sharp(imageBuffer).metadata();
    const originalSize = imageBuffer.length;

    console.log(`📸 Processing image: ${originalSize} bytes (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);
    console.log(`📐 Original dimensions: ${metadata.width}x${metadata.height}`);

    let bestBuffer: Buffer;
    let bestFormat = 'jpeg';

    // If file is small enough, use minimal compression
    if (originalSize <= targetMaxSize) {
      console.log(`✅ Image already under ${(targetMaxSize / 1024 / 1024).toFixed(1)}MB, using high-quality compression`);
      
      if (preferWebP) {
        // Try WebP first for better quality at same size
        const webpBuffer = await sharp(imageBuffer)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({
            quality: Math.max(quality, 90),
            effort: 6, // Higher effort for better compression
          })
          .toBuffer();

        const jpegBuffer = await sharp(imageBuffer)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({
            quality: Math.max(quality, 85),
            progressive: true,
            mozjpeg: true,
          })
          .toBuffer();

        // Use the smaller result
        if (webpBuffer.length < jpegBuffer.length) {
          bestBuffer = webpBuffer;
          bestFormat = 'webp';
          console.log(`📊 WebP chosen: ${(webpBuffer.length / 1024 / 1024).toFixed(2)}MB vs JPEG ${(jpegBuffer.length / 1024 / 1024).toFixed(2)}MB`);
        } else {
          bestBuffer = jpegBuffer;
          bestFormat = 'jpeg';
          console.log(`📊 JPEG chosen: ${(jpegBuffer.length / 1024 / 1024).toFixed(2)}MB vs WebP ${(webpBuffer.length / 1024 / 1024).toFixed(2)}MB`);
        }
      } else {
        bestBuffer = await sharp(imageBuffer)
          .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({
            quality: Math.max(quality, 85),
            progressive: true,
            mozjpeg: true,
          })
          .toBuffer();
        bestFormat = 'jpeg';
      }
    } else {
      // File is large, use smart compression
      console.log(`🔄 File exceeds ${(targetMaxSize / 1024 / 1024).toFixed(1)}MB, applying smart compression...`);
      
      const compressionStrategies = [
        // Strategy 1: High quality, optimal dimensions
        { width: 2400, height: 1600, jpegQuality: 85, webpQuality: 90 },
        // Strategy 2: Reduce quality slightly
        { width: 2400, height: 1600, jpegQuality: 80, webpQuality: 85 },
        { width: 2400, height: 1600, jpegQuality: 75, webpQuality: 80 },
        // Strategy 3: Reduce dimensions, maintain quality
        { width: 2000, height: 1333, jpegQuality: 80, webpQuality: 85 },
        { width: 1800, height: 1200, jpegQuality: 75, webpQuality: 80 },
        // Strategy 4: Balance dimensions and quality
        { width: 1600, height: 1067, jpegQuality: 70, webpQuality: 75 },
        { width: 1400, height: 933, jpegQuality: 70, webpQuality: 75 },
        // Strategy 5: Smaller but still good quality
        { width: 1200, height: 800, jpegQuality: 65, webpQuality: 70 },
      ];

      bestBuffer = imageBuffer; // Fallback
      
      for (const strategy of compressionStrategies) {
        console.log(`🎯 Trying ${strategy.width}x${strategy.height} - JPEG:${strategy.jpegQuality}% WebP:${strategy.webpQuality}%`);
        
        const jpegPromise = sharp(imageBuffer)
          .resize(strategy.width, strategy.height, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({
            quality: strategy.jpegQuality,
            progressive: true,
            mozjpeg: true,
          })
          .toBuffer();

        let webpPromise: Promise<Buffer> | null = null;
        if (preferWebP) {
          webpPromise = sharp(imageBuffer)
            .resize(strategy.width, strategy.height, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .webp({
              quality: strategy.webpQuality,
              effort: 6,
            })
            .toBuffer();
        }

        const [jpegBuffer, webpBuffer] = await Promise.all([
          jpegPromise,
          webpPromise || Promise.resolve(null)
        ]);

        // Choose the best format
        let candidateBuffer = jpegBuffer;
        let candidateFormat = 'jpeg';

        if (webpBuffer && webpBuffer.length < jpegBuffer.length) {
          candidateBuffer = webpBuffer;
          candidateFormat = 'webp';
        }

        console.log(`📊 Result: ${candidateFormat.toUpperCase()} ${(candidateBuffer.length / 1024 / 1024).toFixed(2)}MB`);

        if (candidateBuffer.length <= targetMaxSize) {
          bestBuffer = candidateBuffer;
          bestFormat = candidateFormat;
          console.log(`✅ Achieved target with ${strategy.width}x${strategy.height} ${candidateFormat.toUpperCase()}`);
          break;
        }
      }

      if (bestBuffer.length > targetMaxSize) {
        console.warn(`⚠️  Best result: ${(bestBuffer.length / 1024 / 1024).toFixed(2)}MB (still over target)`);
      }
    }

    const processedMetadata = await sharp(bestBuffer).metadata();
    const compressionRatio = ((originalSize - bestBuffer.length) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Final: ${bestFormat.toUpperCase()} ${(bestBuffer.length / 1024 / 1024).toFixed(2)}MB (${compressionRatio}% reduction)`);

    return {
      buffer: bestBuffer,
      originalSize,
      compressedSize: bestBuffer.length,
      format: bestFormat,
      width: processedMetadata.width || 0,
      height: processedMetadata.height || 0,
    };
  } catch (error) {
    console.error('Advanced image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

// Compress image using Sharp with intelligent size reduction
export const compressImage = async (
  imageBuffer: Buffer,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    targetMaxSize?: number; // Target max file size in bytes
  } = {}
): Promise<CompressedImage> => {
  const {
    maxWidth = config.upload.maxImageWidth,
    maxHeight = config.upload.maxImageHeight,
    quality = config.upload.compressionQuality,
    targetMaxSize = config.upload.maxFileSize, // 10MB target
  } = options;

  try {
    // Get original image metadata
    const metadata = await sharp(imageBuffer).metadata();
    const originalSize = imageBuffer.length;

    console.log(`📸 Processing image: ${originalSize} bytes (${(originalSize / 1024 / 1024).toFixed(2)}MB)`);
    console.log(`📐 Original dimensions: ${metadata.width}x${metadata.height}`);

    let processedBuffer: Buffer;

    // If original file is already under target size, use minimal compression
    if (originalSize <= targetMaxSize) {
      console.log(`✅ Image already under ${(targetMaxSize / 1024 / 1024).toFixed(1)}MB, using minimal compression`);
      
      processedBuffer = await sharp(imageBuffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: Math.max(quality, 85), // High quality for small files
          progressive: true,
          mozjpeg: true,
        })
        .toBuffer();
    } else {
      // File is larger than target, use smart compression strategy
      console.log(`🔄 File exceeds ${(targetMaxSize / 1024 / 1024).toFixed(1)}MB, applying smart compression...`);
      
      // Strategy 1: Try high-quality compression with optimal dimensions first
      const optimalWidth = Math.min(metadata.width || maxWidth, 2400); // Max 2400px width for quality
      const optimalHeight = Math.min(metadata.height || maxHeight, 1600); // Max 1600px height for quality
      
      console.log(`🎯 Step 1: High-quality resize to ${optimalWidth}x${optimalHeight} at 85% quality`);
      
      processedBuffer = await sharp(imageBuffer)
        .resize(optimalWidth, optimalHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 85, // Start with high quality
          progressive: true,
          mozjpeg: true,
        })
        .toBuffer();
      
      console.log(`📊 Step 1 result: ${(processedBuffer.length / 1024 / 1024).toFixed(2)}MB`);
      
      // Strategy 2: If still too large, reduce quality gradually while maintaining dimensions
      if (processedBuffer.length > targetMaxSize) {
        const qualityLevels = [80, 75, 70, 65, 60]; // Quality reduction steps
        
        for (const testQuality of qualityLevels) {
          console.log(`🎯 Step 2: Trying quality ${testQuality}% at ${optimalWidth}x${optimalHeight}`);
          
          const testBuffer = await sharp(imageBuffer)
            .resize(optimalWidth, optimalHeight, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({
              quality: testQuality,
              progressive: true,
              mozjpeg: true,
            })
            .toBuffer();
          
          console.log(`📊 Quality ${testQuality}% result: ${(testBuffer.length / 1024 / 1024).toFixed(2)}MB`);
          
          if (testBuffer.length <= targetMaxSize) {
            processedBuffer = testBuffer;
            console.log(`✅ Achieved target size with quality ${testQuality}%`);
            break;
          }
        }
      }
      
      // Strategy 3: If still too large, reduce dimensions while maintaining good quality
      if (processedBuffer.length > targetMaxSize) {
        const dimensionReductions = [
          { width: 2000, height: 1333, quality: 75 },
          { width: 1800, height: 1200, quality: 75 },
          { width: 1600, height: 1067, quality: 70 },
          { width: 1400, height: 933, quality: 70 },
          { width: 1200, height: 800, quality: 65 },
        ];
        
        for (const { width, height, quality: stepQuality } of dimensionReductions) {
          console.log(`🎯 Step 3: Trying ${width}x${height} at ${stepQuality}% quality`);
          
          const testBuffer = await sharp(imageBuffer)
            .resize(width, height, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({
              quality: stepQuality,
              progressive: true,
              mozjpeg: true,
            })
            .toBuffer();
          
          console.log(`📊 ${width}x${height} result: ${(testBuffer.length / 1024 / 1024).toFixed(2)}MB`);
          
          if (testBuffer.length <= targetMaxSize) {
            processedBuffer = testBuffer;
            console.log(`✅ Achieved target size with dimensions ${width}x${height} at ${stepQuality}% quality`);
            break;
          }
        }
      }
      
      // Strategy 4: Last resort - more aggressive compression but still reasonable quality
      if (processedBuffer.length > targetMaxSize) {
        console.log(`🎯 Step 4: Last resort compression`);
        
        processedBuffer = await sharp(imageBuffer)
          .resize(1000, 667, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({
            quality: 60, // Still reasonable quality
            progressive: true,
            mozjpeg: true,
          })
          .toBuffer();
        
        console.log(`📊 Final result: ${(processedBuffer.length / 1024 / 1024).toFixed(2)}MB`);
      }
      
      if (processedBuffer.length > targetMaxSize) {
        console.warn(`⚠️  Image still ${(processedBuffer.length / 1024 / 1024).toFixed(2)}MB after all compression attempts`);
        console.warn(`⚠️  Consider using a smaller source image or different format`);
      } else {
        const compressionRatio = ((originalSize - processedBuffer.length) / originalSize * 100).toFixed(1);
        console.log(`✅ Successfully compressed: ${compressionRatio}% reduction`);
      }
    }

    // Get processed image metadata
    const processedMetadata = await sharp(processedBuffer).metadata();

    return {
      buffer: processedBuffer,
      originalSize,
      compressedSize: processedBuffer.length,
      format: 'jpeg',
      width: processedMetadata.width || 0,
      height: processedMetadata.height || 0,
    };
  } catch (error) {
    console.error('Image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

// Upload image to Cloudinary
export const uploadToCloudinary = async (
  imageBuffer: Buffer,
  folder: 'couples' | 'hero' | 'profile',
  filename?: string
): Promise<CloudinaryUploadResult> => {
  try {
    const options = uploadOptions[folder];
    
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          ...options,
          public_id: filename,
          resource_type: 'image',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else if (result) {
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          } else {
            reject(new Error('No result from Cloudinary upload'));
          }
        }
      );

      // Write the buffer to the upload stream
      uploadStream.write(imageBuffer);
      uploadStream.end();
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== 'ok') {
      console.warn('Cloudinary delete warning:', result);
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    // Don't throw error - image might already be deleted
  }
};

// Process and upload image (compress + upload) with advanced compression
export const processAndUploadImage = async (
  imageBuffer: Buffer,
  folder: 'couples' | 'hero' | 'profile',
  filename?: string
): Promise<{
  cloudinaryResult: CloudinaryUploadResult;
  compressionInfo: CompressedImage;
}> => {
  try {
    // Use advanced compression by default (configurable via env)
    const useAdvanced = config.upload.useAdvancedCompression;
    
    console.log(`🎯 Using ${useAdvanced ? 'advanced' : 'standard'} compression for ${folder} image`);
    
    // Choose compression method
    const compressionInfo = useAdvanced 
      ? await compressImageAdvanced(imageBuffer, {
          preferWebP: config.upload.preferWebP && folder !== 'hero', // Use WebP for couples/profile, JPEG for hero for compatibility
        })
      : await compressImage(imageBuffer);
    
    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(
      compressionInfo.buffer,
      folder,
      filename
    );

    return {
      cloudinaryResult,
      compressionInfo,
    };
  } catch (error) {
    console.error('Process and upload error:', error);
    throw error;
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl: string): string => {
  try {
    const parts = cloudinaryUrl.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0]; // Remove file extension
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return '';
  }
};