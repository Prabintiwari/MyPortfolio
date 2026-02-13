import { Request, Response } from "express";
import prisma from "../config/prisma";
import { experienceIdParamsSchema } from "../schema";

// Get all experiences
const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    const experiences = await prisma.experience.findMany({
      where,
      orderBy: { order: "asc" },
    });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error: any) {
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
      where: { id:experienceId },
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.json({
      success: true,
      data: experience,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new experience
const createExperience = async (req: Request, res: Response) => {
  try {
    const { title, company, period, description, order, isActive } = req.body;

    // Validation
    if (!title || !company || !period) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, company, and period",
      });
    }

    const experience = await prisma.experience.create({
      data: {
        title,
        company,
        period,
        description: description || "",
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
    const updateData = req.body;

    const experience = await prisma.experience.update({
      where: { id:experienceId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
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

    await prisma.experience.delete({
      where: { id:experienceId },
    });

    res.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
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
