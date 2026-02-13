import { Request, Response } from "express";
import prisma from "../config/prisma";

// Get about/profile information
const getAbout = async (req: Request, res: Response) => {
  try {
    // About table ma single record matrai huncha
    const about = await prisma.about.findFirst();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found. Please create one.",
      });
    }

    res.json({
      success: true,
      data: about,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create about/profile information
const createAbout = async (req: Request, res: Response) => {
  try {
    // Check if about already exists
    const existingAbout = await prisma.about.findFirst();

    if (existingAbout) {
      return res.status(400).json({
        success: false,
        message: "About information already exists. Use PUT to update.",
      });
    }

    const { name, title, bio, avatar, resume, location, email, phone } =
      req.body;

    // Validation
    if (!name || !title || !bio || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, title, bio, and email",
      });
    }

    const about = await prisma.about.create({
      data: {
        name,
        title,
        bio,
        avatar,
        resume,
        location,
        email,
        phone,
      },
    });

    res.status(201).json({
      success: true,
      message: "About information created successfully",
      data: about,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update about/profile information
const updateAbout = async (req: Request, res: Response) => {
  try {
    const about = await prisma.about.findFirst();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found. Use POST to create.",
      });
    }

    const updateData = req.body;

    const updatedAbout = await prisma.about.update({
      where: { id: about.id },
      data: updateData,
    });

    res.json({
      success: true,
      message: "About information updated successfully",
      data: updatedAbout,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete about/profile information
const deleteAbout = async (req: Request, res: Response) => {
  try {
    const about = await prisma.about.findFirst();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About information not found",
      });
    }

    await prisma.about.delete({
      where: { id: about.id },
    });

    res.json({
      success: true,
      message: "About information deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAbout, createAbout, updateAbout, deleteAbout };
