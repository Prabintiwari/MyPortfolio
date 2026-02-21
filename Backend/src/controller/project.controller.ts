import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  projectIdParamsSchema,
  projectQuerySchema,
  projectSchema,
  updateProjectSchema,
} from "../schema";
import { ZodError } from "zod";

//  Get all projects
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { category, isFeatured, isActive, page, limit } =
      projectQuerySchema.parse(req.query);
    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Filter options
    const where: any = {};
    if (category) where.category = category;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;
    if (isActive !== undefined) where.isActive = isActive;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.project.count({ where }),
    ]);

    res.status(200).json({
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
      message: "Projects Retrival successfully",
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
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
        message: error.issues[0].message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get unique categories from existing projects
const getProjectCategories = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });

    const categories = [
      { id: "all", label: "All Projects" },
      ...projects.map((p) => ({
        id: p.category,
        label: p.category.charAt(0).toUpperCase() + p.category.slice(1),
      })),
    ];

    res.status(200).json({
      success: true,
      data: categories,
      message: "Category fetch successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
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
      isFeatured,
      isActive,
      date,
    } = projectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image: image,
        category,
        tags: tags || [],
        liveDemo,
        github,
        isFeatured: isFeatured || false,
        isActive: isActive,
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
        message: error.issues[0].message,
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

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

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
        message: error.issues[0].message,
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

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message,
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
  getProjectCategories,
  createProject,
  updateProject,
  deleteProject,
};
