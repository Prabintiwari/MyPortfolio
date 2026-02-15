import { Request, Response } from "express";
import prisma from "../config/prisma";
import { contactMethodIdParamsSchema } from "../schema";

// Get all contact methods
const getAllContactMethods = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    const contactMethods = await prisma.contactMethod.findMany({
      where,
      orderBy: { order: "asc" },
    });

    res.json({
      success: true,
      count: contactMethods.length,
      data: contactMethods,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single contact method
const getContactMethodById = async (req: Request, res: Response) => {
  try {
    const { contactMethodId } = contactMethodIdParamsSchema.parse(req.params);

    const contactMethod = await prisma.contactMethod.findUnique({
      where: { id: contactMethodId },
    });

    if (!contactMethod) {
      return res.status(404).json({
        success: false,
        message: "Contact method not found",
      });
    }

    res.json({
      success: true,
      data: contactMethod,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new contact method
const createContactMethod = async (req: Request, res: Response) => {
  try {
    const { icon, title, value, description, gradient, order, isActive } =
      req.body;

    // Validation
    if (!title || !value) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and value",
      });
    }

    const contactMethod = await prisma.contactMethod.create({
      data: {
        icon: icon || "Mail",
        title,
        value,
        description: description || "",
        gradient: gradient || "from-blue-500 to-cyan-500",
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Contact method created successfully",
      data: contactMethod,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update contact method
const updateContactMethod = async (req: Request, res: Response) => {
  try {
    const { contactMethodId } = contactMethodIdParamsSchema.parse(req.params);
    const updateData = req.body;

    const contactMethod = await prisma.contactMethod.update({
      where: { id: contactMethodId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Contact method updated successfully",
      data: contactMethod,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Contact method not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete contact method
const deleteContactMethod = async (req: Request, res: Response) => {
  try {
    const { contactMethodId } = contactMethodIdParamsSchema.parse(req.params);

    await prisma.contactMethod.delete({
      where: { id: contactMethodId },
    });

    res.json({
      success: true,
      message: "Contact method deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Contact method not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getAllContactMethods,
  getContactMethodById,
  createContactMethod,
  updateContactMethod,
  deleteContactMethod,
};
