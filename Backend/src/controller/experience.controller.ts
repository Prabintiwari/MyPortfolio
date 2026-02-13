import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  createExperienceSchema,
  experienceIdParamsSchema,
  experienceQuerySchema,
  updateExperienceSchema,
} from "../schema";
import { ZodError } from "zod";

// Get all experiences
const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const { isActive, title, company, page, limit } =
      experienceQuerySchema.parse(req.query);

    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (isActive) {
      where.isActive = isActive;
    }
    if (title) {
      where.title = title;
    }
    if (company) {
      where.company = company;
    }
    const [experiences, total] = await Promise.all([
      prisma.experience.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.experience.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        experiences,
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

// Get single experience
const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { experienceId } = experienceIdParamsSchema.parse(req.params);

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
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

// Create new experience
const createExperience = async (req: Request, res: Response) => {
  try {
    const { title, company, period, description, order, isActive } =
      createExperienceSchema.parse(req.body);

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        period,
        description: description,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
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

// Update experience
const updateExperience = async (req: Request, res: Response) => {
  try {
    const { experienceId } = experienceIdParamsSchema.parse(req.params);
    const updateData = updateExperienceSchema.parse(req.body);

    const existingExperience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!existingExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    const experience = await prisma.experience.update({
      where: { id: experienceId },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
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

// Delete experience
const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { experienceId } = experienceIdParamsSchema.parse(req.params);

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    await prisma.experience.delete({
      where: { id: experienceId },
    });

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
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
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
