import { Request, Response } from "express";
import prisma from "../config/prisma";
import { sillIdParamsSchema } from "../schema";

// Get all skills
const getAllSkills = async (req: Request, res: Response) => {
  try {
    const { category, isActive } = req.query;

    const where: any = {};
    if (category) where.category = category as string;
    if (isActive !== undefined) where.isActive = isActive === "true";

    const skills = await prisma.skill.findMany({
      where,
      orderBy: { order: "asc" },
    });

    res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error: any) {
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

    res.json({
      success: true,
      data: skill,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new skill
const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, level, icon, color, category, order, isActive } = req.body;

    // Validation
    if (!name || level === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and level",
      });
    }

    // Level validation (0-100)
    if (level < 0 || level > 100) {
      return res.status(400).json({
        success: false,
        message: "Level must be between 0 and 100",
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        level,
        icon: icon || "Code",
        color: color || "from-blue-500 to-cyan-500",
        category: category || "technical",
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error: any) {
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
    const updateData = req.body;

    // Validate level if provided
    if (updateData.level !== undefined) {
      if (updateData.level < 0 || updateData.level > 100) {
        return res.status(400).json({
          success: false,
          message: "Level must be between 0 and 100",
        });
      }
    }

    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
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

    await prisma.skill.delete({
      where: { id: skillId },
    });

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
