import { Request, Response } from 'express';
import prisma from '../config/database';
import Joi from 'joi';

// Validation schemas
const createCoupleSchema = Joi.object({
  names: Joi.string().required().max(255),
  title: Joi.string().required().max(255),
  description: Joi.string().optional().allow(''),
  location: Joi.string().optional().allow('').max(255),
  date: Joi.string().optional().allow('').max(100),
  videoUrl: Joi.string().optional().allow('').max(500),
});

const updateCoupleSchema = Joi.object({
  names: Joi.string().optional().max(255),
  title: Joi.string().optional().max(255),
  description: Joi.string().optional().allow(''),
  location: Joi.string().optional().allow('').max(255),
  date: Joi.string().optional().allow('').max(100),
  videoUrl: Joi.string().optional().allow('').max(500),
  coverImageUrl: Joi.string().optional().allow('').max(500),
});

// Get all couples (public endpoint)
export const getAllCouples = async (req: Request, res: Response): Promise<void> => {
  try {
    const couples = await prisma.couple.findMany({
      include: {
        images: {
          orderBy: { orderIndex: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ couples });
  } catch (error) {
    console.error('Get couples error:', error);
    res.status(500).json({ error: 'Failed to fetch couples' });
  }
};

// Get couples with videos (public endpoint)
export const getCouplesWithVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const couples = await prisma.couple.findMany({
      where: {
        videoUrl: {
          not: null,
        },
      },
      include: {
        images: {
          orderBy: { orderIndex: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ couples });
  } catch (error) {
    console.error('Get couples with videos error:', error);
    res.status(500).json({ error: 'Failed to fetch couples with videos' });
  }
};

// Get single couple by ID (public endpoint)
export const getCoupleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const coupleId = parseInt(id, 10);

    if (isNaN(coupleId)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    const couple = await prisma.couple.findUnique({
      where: { id: coupleId },
      include: {
        images: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!couple) {
      res.status(404).json({ error: 'Couple not found' });
      return;
    }

    res.json({ couple });
  } catch (error) {
    console.error('Get couple error:', error);
    res.status(500).json({ error: 'Failed to fetch couple' });
  }
};

// Create new couple (admin only)
export const createCouple = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = createCoupleSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message,
      });
      return;
    }

    const couple = await prisma.couple.create({
      data: {
        ...value,
        description: value.description || null,
        location: value.location || null,
        date: value.date || null,
        videoUrl: value.videoUrl || null,
      },
      include: {
        images: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    res.status(201).json({
      message: 'Couple created successfully',
      couple,
    });
  } catch (error) {
    console.error('Create couple error:', error);
    res.status(500).json({ error: 'Failed to create couple' });
  }
};

// Update couple (admin only)
export const updateCouple = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const coupleId = parseInt(id, 10);

    if (isNaN(coupleId)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    // Validate request body
    const { error, value } = updateCoupleSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message,
      });
      return;
    }

    // Check if couple exists
    const existingCouple = await prisma.couple.findUnique({
      where: { id: coupleId },
    });

    if (!existingCouple) {
      res.status(404).json({ error: 'Couple not found' });
      return;
    }

    // Update couple
    const updatedCouple = await prisma.couple.update({
      where: { id: coupleId },
      data: {
        ...value,
        updatedAt: new Date(),
      },
      include: {
        images: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    res.json({
      message: 'Couple updated successfully',
      couple: updatedCouple,
    });
  } catch (error) {
    console.error('Update couple error:', error);
    res.status(500).json({ error: 'Failed to update couple' });
  }
};

// Delete couple (admin only)
export const deleteCouple = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const coupleId = parseInt(id, 10);

    if (isNaN(coupleId)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    // Check if couple exists
    const existingCouple = await prisma.couple.findUnique({
      where: { id: coupleId },
      include: { images: true },
    });

    if (!existingCouple) {
      res.status(404).json({ error: 'Couple not found' });
      return;
    }

    // Delete all images from Cloudinary first
    const { deleteFromCloudinary, extractPublicId } = await import('../services/imageService');
    
    // Delete couple images from Cloudinary
    for (const image of existingCouple.images) {
      try {
        const publicId = extractPublicId(image.imageUrl);
        if (publicId) {
          await deleteFromCloudinary(publicId);
          console.log(`Deleted image from Cloudinary: ${publicId}`);
        }
      } catch (error) {
        console.error(`Failed to delete image from Cloudinary: ${image.imageUrl}`, error);
        // Continue with other images even if one fails
      }
    }

    // Delete cover image from Cloudinary if it exists and is different from gallery images
    if (existingCouple.coverImageUrl) {
      try {
        const coverPublicId = extractPublicId(existingCouple.coverImageUrl);
        if (coverPublicId) {
          // Check if cover image is not already in the gallery images
          const isInGallery = existingCouple.images.some(img => 
            extractPublicId(img.imageUrl) === coverPublicId
          );
          
          if (!isInGallery) {
            await deleteFromCloudinary(coverPublicId);
            console.log(`Deleted cover image from Cloudinary: ${coverPublicId}`);
          }
        }
      } catch (error) {
        console.error(`Failed to delete cover image from Cloudinary: ${existingCouple.coverImageUrl}`, error);
        // Continue with deletion even if Cloudinary cleanup fails
      }
    }

    // Delete couple from database (cascade will delete images)
    await prisma.couple.delete({
      where: { id: coupleId },
    });

    res.json({ 
      message: 'Couple and all associated images deleted successfully',
      deletedImages: existingCouple.images.length 
    });
  } catch (error) {
    console.error('Delete couple error:', error);
    res.status(500).json({ error: 'Failed to delete couple' });
  }
};

// Update couple cover image (admin only)
export const updateCouplecover = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { coverImageUrl } = req.body;
    const coupleId = parseInt(id, 10);

    if (isNaN(coupleId)) {
      res.status(400).json({ error: 'Invalid couple ID' });
      return;
    }

    if (!coverImageUrl) {
      res.status(400).json({ error: 'Cover image URL is required' });
      return;
    }

    // Check if couple exists
    const existingCouple = await prisma.couple.findUnique({
      where: { id: coupleId },
    });

    if (!existingCouple) {
      res.status(404).json({ error: 'Couple not found' });
      return;
    }

    // Update cover image
    const updatedCouple = await prisma.couple.update({
      where: { id: coupleId },
      data: {
        coverImageUrl,
        updatedAt: new Date(),
      },
    });

    res.json({
      message: 'Cover image updated successfully',
      couple: updatedCouple,
    });
  } catch (error) {
    console.error('Update cover image error:', error);
    res.status(500).json({ error: 'Failed to update cover image' });
  }
};