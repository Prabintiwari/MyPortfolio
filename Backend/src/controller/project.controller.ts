import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  projectIdParamsSchema,
  projectQuerySchema,
  projectSchema,
  updateProjectSchema,
} from "../schema/project.schema";
import { ZodError } from "zod";

//  Get all projects
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured, isActive, page, limit } =
      projectQuerySchema.parse(req.query);
    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Filter options
    const where: any = {};
    if (category) where.category = category;
    if (featured) where.featured = featured;
    if (isActive) where.isActive = isActive;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.project.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        projects,
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

// Get single project
const getProjectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = projectIdParamsSchema.parse(req.params);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
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

// Create new project
const createProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      image,
      category,
      tags,
      liveDemo,
      github,
      featured,
      isActive,
      order,
      date,
    } = projectSchema.parse(req.body);

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide required fields: title, description, category",
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image: image || "/images/default-project.png",
        category,
        tags: tags || [],
        liveDemo,
        github,
        featured: featured || false,
        isActive: isActive,
        order: order || 0,
        date: date || new Date().getFullYear().toString(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
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

// Update project
const updateProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = projectIdParamsSchema.parse(req.params);
    const updateData = updateProjectSchema.parse(req.body);

    const project = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
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

// Delete project
const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = projectIdParamsSchema.parse(req.params);

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.json({
      success: true,
      message: "Project deleted successfully",
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
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
