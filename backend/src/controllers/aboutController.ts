import { Request, Response } from 'express';
import prisma from '../config/database';
import { processAndUploadImage, deleteFromCloudinary, extractPublicId } from '../services/imageService';
import Joi from 'joi';

// Validation schema
const updateAboutSchema = Joi.object({
  authorName: Joi.string().optional().max(255),
  description: Joi.string().optional().allow('').allow(null),
  yearsExperience: Joi.number().integer().min(0).optional().default(0),
  couplesServed: Joi.number().integer().min(0).optional().default(0),
  awardsCount: Joi.number().integer().min(0).optional().default(0),
  location: Joi.string().optional().allow('').allow(null).max(255),
}).options({ 
  stripUnknown: true,  // Remove unknown fields
  convert: true        // Convert string numbers to numbers
});

// Get about me information (public endpoint)
export const getAboutMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const aboutMe = await prisma.aboutMe.findFirst();

    if (!aboutMe) {
      res.status(404).json({ error: 'About me information not found' });
      return;
    }

    res.json({ aboutMe });
  } catch (error) {
    console.error('Get about me error:', error);
    res.status(500).json({ error: 'Failed to fetch about me information' });
  }
};

// Update about me information (admin only)
export const updateAboutMe = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('📝 Update about me request body:', JSON.stringify(req.body, null, 2));
    
    // Validate request body
    const { error, value } = updateAboutSchema.validate(req.body);
    if (error) {
      console.error('❌ Validation error:', error.details[0].message);
      console.error('❌ Failed validation for:', JSON.stringify(req.body, null, 2));
      res.status(400).json({
        error: 'Validation error',
        details: error.details[0].message,
      });
      return;
    }

    console.log('✅ Validation passed, validated data:', JSON.stringify(value, null, 2));

    // Get existing about me record
    let aboutMe = await prisma.aboutMe.findFirst();

    if (!aboutMe) {
      // Create new record if none exists
      aboutMe = await prisma.aboutMe.create({
        data: {
          authorName: value.authorName || 'Photographer',
          description: value.description || null,
          yearsExperience: value.yearsExperience || 0,
          couplesServed: value.couplesServed || 0,
          awardsCount: value.awardsCount || 0,
          location: value.location || null,
        },
      });
    } else {
      // Update existing record
      aboutMe = await prisma.aboutMe.update({
        where: { id: aboutMe.id },
        data: {
          ...value,
          updatedAt: new Date(),
        },
      });
    }

    res.json({
      message: 'About me information updated successfully',
      aboutMe,
    });
  } catch (error) {
    console.error('Update about me error:', error);
    res.status(500).json({ error: 'Failed to update about me information' });
  }
};

// Upload profile image (admin only)
export const uploadProfileImage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if file was uploaded
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No image provided' });
      return;
    }

    // Get existing about me record
    let aboutMe = await prisma.aboutMe.findFirst();

    if (!aboutMe) {
      // Create new record if none exists
      aboutMe = await prisma.aboutMe.create({
        data: {
          authorName: 'Photographer',
          yearsExperience: 0,
          couplesServed: 0,
          awardsCount: 0,
        },
      });
    }

    // Delete old profile image from Cloudinary if exists
    if (aboutMe.profileImageUrl) {
      const oldPublicId = extractPublicId(aboutMe.profileImageUrl);
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    }

    // Generate filename
    const filename = 'profile-image';

    // Process and upload new image
    const { cloudinaryResult, compressionInfo } = await processAndUploadImage(
      file.buffer,
      'profile',
      filename
    );

    // Update about me with new profile image
    const updatedAboutMe = await prisma.aboutMe.update({
      where: { id: aboutMe.id },
      data: {
        profileImageUrl: cloudinaryResult.secure_url,
        updatedAt: new Date(),
      },
    });

    res.json({
      message: 'Profile image uploaded successfully',
      profileImageUrl: cloudinaryResult.secure_url,
      aboutMe: updatedAboutMe,
      compressionInfo: {
        originalSize: compressionInfo.originalSize,
        compressedSize: compressionInfo.compressedSize,
        compressionRatio: Math.round((1 - compressionInfo.compressedSize / compressionInfo.originalSize) * 100),
      },
    });
  } catch (error) {
    console.error('Upload profile image error:', error);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
};