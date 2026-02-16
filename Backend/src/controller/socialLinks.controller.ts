import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  createServiceSchema,
  serviceIdParamsSchema,
  serviceQuerySchema,
  updateServiceSchema,
} from "../schema";
import { ZodError } from "zod";
import {
  createSocialLinksSchema,
  socialLinkIdParamsSchema,
  socialLinkQuerySchema,
  updateSocialLinkSchema,
} from "../schema/socialLinks.schema";

// Get all social Links
const getAllSocialLinks = async (req: Request, res: Response) => {
  try {
    const { isActive, label, page, limit } = socialLinkQuerySchema.parse(
      req.query,
    );
    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (isActive) {
      where.isActive = isActive;
    }
    if (label) {
      where.label = label;
    }

    const [socialLink, total] = await Promise.all([
      prisma.socialLink.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.socialLink.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        socialLink,
        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(total / limitNumber),
        },
      },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single social Link
const getSocialLinkById = async (req: Request, res: Response) => {
  try {
    const { socialLinkId } = socialLinkIdParamsSchema.parse(req.params);

    const socialLink = await prisma.socialLink.findUnique({
      where: { id: socialLinkId },
    });

    if (!socialLink) {
      return res.status(404).json({
        success: false,
        message: "Social Link not found",
      });
    }

    res.status(200).json({
      success: true,
      data: socialLink,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new social Link
const createSocialLinks = async (req: Request, res: Response) => {
  try {
    const { icon, url, label, variant, order, isActive } =
      createSocialLinksSchema.parse(req.body);

    const socialLink = await prisma.socialLink.create({
      data: {
        icon: icon,
        url,
        label,
        variant,
        order: order || 0,
        isActive: isActive,
      },
    });

    res.status(201).json({
      success: true,
      message: "Social Link created successfully",
      data: socialLink,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update social Link
const updateSocialLinks = async (req: Request, res: Response) => {
  try {
    const { socialLinkId } = socialLinkIdParamsSchema.parse(req.params);
    const updateData = updateSocialLinkSchema.parse(req.body);

    const SocialLink = await prisma.socialLink.findUnique({
      where: { id: socialLinkId },
    });

    if (!SocialLink) {
      return res
        .status(404)
        .json({ success: false, message: "Social Link not found" });
    }

    const updatedSocialLink = await prisma.socialLink.update({
      where: { id: socialLinkId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Service updated successfully",
      data: updatedSocialLink,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete social Link
const deletesocialLink = async (req: Request, res: Response) => {
  try {
    const { socialLinkId } = socialLinkIdParamsSchema.parse(req.params);

    const socialLink = await prisma.socialLink.findUnique({
      where: { id: socialLinkId },
    });

    if (!socialLink) {
      return res.status(404).json({
        success: false,
        message: "Social Link not found",
      });
    }

    await prisma.socialLink.delete({
      where: { id: socialLinkId },
    });

    res.json({
      success: true,
      message: "Social Link deleted successfully",
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getAllSocialLinks,
  getSocialLinkById,
  createSocialLinks,
  updateSocialLinks,
  deletesocialLink,
};
