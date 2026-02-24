import { Request, Response } from "express";
import { fileUpload, deleteFile } from "../config/upload";
import prisma from "../config/prisma";

// Get portfolio settings
const getPortfolio = async (req: Request, res: Response) => {
  try {
    const portfolio = await prisma.uploadFile.findFirst();

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio settings not found.",
      });
    }

    res.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create or Update portfolio settings
const upsertPortfolio = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Get existing portfolio
    let portfolio = await prisma.uploadFile.findFirst();

    const updateData: any = {};

    // ✅ Handle avatar upload using service
    if (files?.avatar && files.avatar[0]) {
      const avatarFile = files.avatar[0];

      // Delete old avatar if exists
      if (portfolio?.avatar) {
        try {
          deleteFile(portfolio.avatar);
        } catch (err) {
          console.log("Old avatar deletion failed:", err);
        }
      }

      // Upload new avatar
      updateData.avatar = fileUpload(avatarFile, "portfolio");
    }

    // ✅ Handle logo upload using service
    if (files?.logo && files.logo[0]) {
      const logoFile = files.logo[0];

      // Delete old logo if exists
      if (portfolio?.logo) {
        try {
          deleteFile(portfolio.logo);
        } catch (err) {
          console.log("Old logo deletion failed:", err);
        }
      }

      // Upload new logo
      updateData.logo = fileUpload(logoFile, "portfolio");
    }

    // ✅ Handle resume upload using service
    if (files?.resume && files.resume[0]) {
      const resumeFile = files.resume[0];

      // Delete old resume if exists
      if (portfolio?.resume) {
        try {
          deleteFile(portfolio.resume);
        } catch (err) {
          console.log("Old resume deletion failed:", err);
        }
      }

      // Upload new resume
      updateData.resume = fileUpload(resumeFile, "portfolio");
    }

    // Create or update portfolio
    if (portfolio) {
      // Update existing
      portfolio = await prisma.uploadFile.update({
        where: { id: portfolio.id },
        data: updateData,
      });

      res.json({
        success: true,
        message: "Portfolio updated successfully",
        data: portfolio,
      });
    } else {
      // Create new
      portfolio = await prisma.uploadFile.create({
        data: updateData,
      });

      res.status(201).json({
        success: true,
        message: "Portfolio created successfully",
        data: portfolio,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete specific file (avatar, logo, or resume)
const deletePortfolioFile = async (req: Request, res: Response) => {
  try {
    const { fileType }: any = req.params;

    if (!["avatar", "logo", "resume"].includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Must be avatar, logo, or resume.",
      });
    }

    const portfolio = await prisma.uploadFile.findFirst();

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    const fileUrl = portfolio[fileType as keyof typeof portfolio];

    if (!fileUrl || typeof fileUrl !== "string") {
      return res.status(404).json({
        success: false,
        message: `No ${fileType} file found`,
      });
    }

    // ✅ Delete file using service
    try {
      deleteFile(fileUrl);
    } catch (err) {
      console.log("File deletion error:", err);
    }

    // Update database - set field to null
    await prisma.uploadFile.update({
      where: { id: portfolio.id },
      data: { [fileType]: null },
    });

    res.json({
      success: true,
      message: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} deleted successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get file URLs only
const getPortfolioFiles = async (req: Request, res: Response) => {
  try {
    const portfolio = await prisma.uploadFile.findFirst({
      select: {
        avatar: true,
        logo: true,
        resume: true,
      },
    });

    if (!portfolio) {
      return res.json({
        success: true,
        data: {
          avatar: null,
          logo: null,
          resume: null,
        },
      });
    }

    res.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getPortfolio, getPortfolioFiles, upsertPortfolio, deletePortfolioFile };
