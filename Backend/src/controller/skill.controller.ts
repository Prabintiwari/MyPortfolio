import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  createSkillSchema,
  sillIdParamsSchema,
  skillQuerySchema,
  updateSkillSchema,
} from "../schema";
import { ZodError } from "zod";

// Get all skills
const getAllSkills = async (req: Request, res: Response) => {
  try {
    const { name, category, isActive, page, limit } = skillQuerySchema.parse(
      req.query,
    );
    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (name) where.name = name;
    if (category) where.category = category;
    if (isActive) where.isActive = isActive;

    const [skills, total] = await Promise.all([
      await prisma.skill.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.skill.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        skills,
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

// Get single skill
const getSkillById = async (req: Request, res: Response) => {
  try {
    const { skillId } = sillIdParamsSchema.parse(req.params);

    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
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

// Create new skill
const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, level, icon, color, category, order, isActive } =
      createSkillSchema.parse(req.body);

    const skill = await prisma.skill.create({
      data: {
        name,
        level,
        icon: icon || "Code",
        color: color || "from-blue-500 to-cyan-500",
        category: category || "technical",
        order: order || 0,
        isActive: isActive,
      },
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
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

// Update skill
const updateSkill = async (req: Request, res: Response) => {
  try {
    const { skillId } = sillIdParamsSchema.parse(req.params);
    const updateData = updateSkillSchema.parse(req.body);

    const existingSkill = await prisma.skill.findUnique({
      where: { id: skillId },
    });
    if (!existingSkill) {
      res.status(404).json({ success: false, message: "Skill not found" });
    }

    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
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

// Delete skill
const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { skillId } = sillIdParamsSchema.parse(req.params);

    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
    });
    if (!skill) {
      res.status(404).json({ success: false, message: "Skill not found" });
    }

    await prisma.skill.delete({
      where: { id: skillId },
    });

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
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

export { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
