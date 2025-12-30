import { Request, Response } from 'express';
import prisma from '../config/database';
import { processAndUploadImage, deleteFromCloudinary, extractPublicId } from '../services/imageService';

// Get all hero images (public endpoint)
export const getAllHeroImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const heroImages = await prisma.heroImage.findMany({
      orderBy: { orderIndex: 'asc' },
    });

    res.json({ heroImages });
  } catch (error) {
    console.error('Get hero images error:', error);
    res.status(500).json({ error: 'Failed to fetch hero images' });
  }
};

// Replace hero image at specific position (admin only)
export const replaceHeroImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderIndex } = req.params;
    const orderIdx = parseInt(orderIndex, 10);

    if (isNaN(orderIdx) || orderIdx < 1 || orderIdx > 7) {
      res.status(400).json({ error: 'Invalid order index. Must be between 1 and 7.' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    console.log(`🖼️  Replacing hero image at position ${orderIdx}`);
    console.log(`📁 Original file size: ${(req.file.size / 1024 / 1024).toFixed(2)}MB`);

    // Check if hero image exists at this position
    const existingHeroImage = await prisma.heroImage.findFirst({
      where: { orderIndex: orderIdx },
    });

    // Process and upload new image to Cloudinary with intelligent compression
    const { cloudinaryResult, compressionInfo } = await processAndUploadImage(
      req.file.buffer,
      'hero',
      `hero-${orderIdx}-${Date.now()}`
    );

    console.log(`✅ Image processed and uploaded successfully`);
    console.log(`📊 Compression: ${(compressionInfo.originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressionInfo.compressedSize / 1024 / 1024).toFixed(2)}MB`);

    if (existingHeroImage) {
      // Delete old image from Cloudinary
      if (existingHeroImage.imageUrl) {
        const publicId = extractPublicId(existingHeroImage.imageUrl);
        await deleteFromCloudinary(publicId);
      }

      // Update existing hero image
      const updatedHeroImage = await prisma.heroImage.update({
        where: { id: existingHeroImage.id },
        data: {
          imageUrl: cloudinaryResult.secure_url,
        },
      });

      res.json({
        message: 'Hero image replaced successfully',
        heroImage: updatedHeroImage,
        compressionInfo: {
          originalSize: compressionInfo.originalSize,
          compressedSize: compressionInfo.compressedSize,
          compressionRatio: ((1 - compressionInfo.compressedSize / compressionInfo.originalSize) * 100).toFixed(1) + '%'
        }
      });
    } else {
      // Create new hero image
      const newHeroImage = await prisma.heroImage.create({
        data: {
          imageUrl: cloudinaryResult.secure_url,
          orderIndex: orderIdx,
        },
      });

      res.json({
        message: 'Hero image created successfully',
        heroImage: newHeroImage,
        compressionInfo: {
          originalSize: compressionInfo.originalSize,
          compressedSize: compressionInfo.compressedSize,
          compressionRatio: ((1 - compressionInfo.compressedSize / compressionInfo.originalSize) * 100).toFixed(1) + '%'
        }
      });
    }
  } catch (error) {
    console.error('Replace hero image error:', error);
    res.status(500).json({ error: 'Failed to replace hero image' });
  }
};

// Reorder hero images (admin only)
export const reorderHeroImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { images } = req.body;

    if (!Array.isArray(images)) {
      res.status(400).json({ error: 'Images array is required' });
      return;
    }

    // Validate that all order indices are between 1 and 7
    for (const img of images) {
      if (!img.id || !img.orderIndex || img.orderIndex < 1 || img.orderIndex > 7) {
        res.status(400).json({ error: 'Invalid image data or order index' });
        return;
      }
    }

    // Update order indices
    await Promise.all(
      images.map((img: { id: number; orderIndex: number }) =>
        prisma.heroImage.update({
          where: { id: img.id },
          data: { orderIndex: img.orderIndex },
        })
      )
    );

    // Fetch updated hero images
    const updatedHeroImages = await prisma.heroImage.findMany({
      orderBy: { orderIndex: 'asc' },
    });

    res.json({
      message: 'Hero images reordered successfully',
      heroImages: updatedHeroImages,
    });
  } catch (error) {
    console.error('Reorder hero images error:', error);
    res.status(500).json({ error: 'Failed to reorder hero images' });
  }
};