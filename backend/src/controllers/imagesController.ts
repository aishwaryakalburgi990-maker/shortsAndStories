import { Request, Response } from 'express';
import prisma from '../config/database';
import { processAndUploadImage, deleteFromCloudinary, extractPublicId } from '../services/imageService';
import Joi from 'joi';

// Validation schemas
const reorderImagesSchema = Joi.object({
  images: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      orderIndex: Joi.number().required(),
    })
  ).required(),
});

// Upload images (admin only) - handles both couple images and other uploads
export const uploadImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coupleId } = req.body;

    // If coupleId is provided, upload couple images
    if (coupleId) {
      // Set params for uploadCoupleImages function
      req.params.coupleId = coupleId.toString();
      return await uploadCoupleImages(req, res);
    }

    // Generic image upload (for hero, profile, etc.)
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'No images provided' });
      return;
    }

    const uploadResults: any[] = [];
    const errors: any[] = [];

    // Process each file
    for (const file of files) {
      try {
        // Generate filename
        const timestamp = Date.now();
        const filename = `upload-${timestamp}-${Math.random().toString(36).substring(7)}`;

        // Process and upload image
        const { cloudinaryResult, compressionInfo } = await processAndUploadImage(
          file.buffer,
          'couples', // Default folder
          filename
        );

        uploadResults.push({
          imageUrl: cloudinaryResult.secure_url,
          compressionInfo: {
            originalSize: compressionInfo.originalSize,
            compressedSize: compressionInfo.compressedSize,
            compressionRatio: Math.round((1 - compressionInfo.compressedSize / compressionInfo.originalSize) * 100),
          },
        });
      } catch (error) {
        console.error('Upload error for file:', file.originalname, error);
        errors.push({
          filename: file.originalname,
          error: error instanceof Error ? error.message : 'Upload failed',
        });
      }
    }

    if (uploadResults.length === 0) {
      res.status(500).json({
        error: 'All uploads failed',
        errors,
      });
      return;
    }

    res.status(201).json({
      message: `${uploadResults.length} images uploaded successfully`,
      images: uploadResults,
      ...(errors.length > 0 && { errors }),
    });
  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

// Delete image (admin only) - handles both couple images and other images
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const imageId = parseInt(id, 10);

    if (isNaN(imageId)) {
      res.status(400).json({ error: 'Invalid image ID' });
      return;
    }

    // Try to find as couple image first
    const coupleImage = await prisma.coupleImage.findUnique({
      where: { id: imageId },
    });

    if (coupleImage) {
      // Set params for deleteCoupleImage function
      req.params.imageId = id;
      return await deleteCoupleImage(req, res);
    }

    // Try to find as hero image
    const heroImage = await prisma.heroImage.findUnique({
      where: { id: imageId },
    });

    if (heroImage) {
      // Delete from Cloudinary
      const publicId = extractPublicId(heroImage.imageUrl);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }

      // Delete from database
      await prisma.heroImage.delete({
        where: { id: imageId },
      });

      res.json({ message: 'Hero image deleted successfully' });
      return;
    }

    res.status(404).json({ error: 'Image not found' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

// Reorder images (admin only)
export const reorderImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coupleId, type } = req.body;

    if (coupleId) {
      // Set params for reorderCoupleImages function
      req.params.coupleId = coupleId.toString();
      return await reorderCoupleImages(req, res);
    }

    if (type === 'hero') {
      // Validate request body for hero images
      const { error, value } = reorderImagesSchema.validate(req.body);
      if (error) {
        res.status(400).json({
          error: 'Validation error',
          details: error.details[0].message,
        });
        return;
      }

      const { images } = value;

      // Update order for each hero image
      const updatePromises = images.map((img: { id: number; orderIndex: number }) =>
        prisma.heroImage.update({
          where: { id: img.id },
          data: { orderIndex: img.orderIndex },
        })
      );

      await Promise.all(updatePromises);

      // Get updated images
      const updatedImages = await prisma.heroImage.findMany({
        orderBy: { orderIndex: 'asc' },
      });

      res.json({
        message: 'Hero images reordered successfully',
        images: updatedImages,
      });
      return;
    }

    res.status(400).json({ error: 'Invalid reorder request' });
  } catch (error) {
    console.error('Reorder images error:', error);
    res.status(500).json({ error: 'Failed to reorder images' });
  }
};
export const uploadCoupleImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coupleId } = req.params;
    const id = parseInt(coupleId, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    // Check if couple exists
    const couple = await prisma.couple.findUnique({
      where: { id },
    });

    if (!couple) {
      res.status(404).json({ error: 'Couple not found' });
      return;
    }

    // Check if files were uploaded
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'No images provided' });
      return;
    }

    const uploadResults: any[] = [];
    const errors: any[] = [];

    // Get current max order index
    const maxOrderResult = await prisma.coupleImage.findFirst({
      where: { coupleId: id },
      orderBy: { orderIndex: 'desc' },
      select: { orderIndex: true },
    });

    let currentOrderIndex = (maxOrderResult?.orderIndex || 0) + 1;

    // Process each file
    for (const file of files) {
      try {
        // Generate filename
        const timestamp = Date.now();
        const filename = `${couple.names.replace(/\s+/g, '-').toLowerCase()}-${timestamp}-${Math.random().toString(36).substring(7)}`;

        // Process and upload image
        const { cloudinaryResult, compressionInfo } = await processAndUploadImage(
          file.buffer,
          'couples',
          filename
        );

        // Save to database
        const coupleImage = await prisma.coupleImage.create({
          data: {
            coupleId: id,
            imageUrl: cloudinaryResult.secure_url,
            orderIndex: currentOrderIndex++,
          },
        });

        uploadResults.push({
          id: coupleImage.id,
          imageUrl: coupleImage.imageUrl,
          orderIndex: coupleImage.orderIndex,
          compressionInfo: {
            originalSize: compressionInfo.originalSize,
            compressedSize: compressionInfo.compressedSize,
            compressionRatio: Math.round((1 - compressionInfo.compressedSize / compressionInfo.originalSize) * 100),
          },
        });
      } catch (error) {
        console.error('Upload error for file:', file.originalname, error);
        errors.push({
          filename: file.originalname,
          error: error instanceof Error ? error.message : 'Upload failed',
        });
      }
    }

    if (uploadResults.length === 0) {
      res.status(500).json({
        error: 'All uploads failed',
        errors,
      });
      return;
    }

    res.status(201).json({
      message: `${uploadResults.length} images uploaded successfully`,
      images: uploadResults,
      ...(errors.length > 0 && { errors }),
    });
  } catch (error) {
    console.error('Upload couple images error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

// Upload cover image (admin only)
export const uploadCoverImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coupleId } = req.params;
    const id = parseInt(coupleId, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    // Check if couple exists
    const couple = await prisma.couple.findUnique({
      where: { id },
    });

    if (!couple) {
      res.status(404).json({ error: 'Couple not found' });
      return;
    }

    // Check if file was uploaded
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No image provided' });
      return;
    }

    // Generate filename
    const filename = `${couple.names.replace(/\s+/g, '-').toLowerCase()}-cover`;

    // Delete old cover image from Cloudinary if exists
    if (couple.coverImageUrl) {
      const oldPublicId = extractPublicId(couple.coverImageUrl);
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    // Process and upload new image
    const { cloudinaryResult, compressionInfo } = await processAndUploadImage(
      file.buffer,
      'couples',
      filename
    );

    // Update couple with new cover image
    const updatedCouple = await prisma.couple.update({
      where: { id },
      data: {
        coverImageUrl: cloudinaryResult.secure_url,
        updatedAt: new Date(),
      },
    });

    res.json({
      message: 'Cover image uploaded successfully',
      coverImageUrl: cloudinaryResult.secure_url,
      compressionInfo: {
        originalSize: compressionInfo.originalSize,
        compressedSize: compressionInfo.compressedSize,
        compressionRatio: Math.round((1 - compressionInfo.compressedSize / compressionInfo.originalSize) * 100),
      },
    });
  } catch (error) {
    console.error('Upload cover image error:', error);
    res.status(500).json({ error: 'Failed to upload cover image' });
  }
};

// Delete couple image (admin only)
export const deleteCoupleImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageId } = req.params;
    const id = parseInt(imageId, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid image ID' });
      return;
    }

    // Find image
    const image = await prisma.coupleImage.findUnique({
      where: { id },
    });

    if (!image) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    // Delete from Cloudinary
    const publicId = extractPublicId(image.imageUrl);
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    // Delete from database
    await prisma.coupleImage.delete({
      where: { id },
    });

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

// Reorder couple images (admin only)
export const reorderCoupleImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coupleId } = req.params;
    const id = parseInt(coupleId, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    // Validate request body
    const { error, value } = reorderImagesSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message,
      });
      return;
    }

    const { images } = value;

    // Update order for each image
    const updatePromises = images.map((img: { id: number; orderIndex: number }) =>
      prisma.coupleImage.update({
        where: { id: img.id, coupleId: id }, // Ensure image belongs to this couple
        data: { orderIndex: img.orderIndex },
      })
    );

    await Promise.all(updatePromises);

    // Get updated images
    const updatedImages = await prisma.coupleImage.findMany({
      where: { coupleId: id },
      orderBy: { orderIndex: 'asc' },
    });

    res.json({
      message: 'Images reordered successfully',
      images: updatedImages,
    });
  } catch (error) {
    console.error('Reorder images error:', error);
    res.status(500).json({ error: 'Failed to reorder images' });
  }
};