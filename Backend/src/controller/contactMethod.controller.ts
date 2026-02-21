import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  contactMethodIdParamsSchema,
  contactMethodQuerySchema,
  createContactMethodSchema,
  updateContactMethodSchema,
} from "../schema";
import { ZodError } from "zod";

// Get all contact methods
const getAllContactMethods = async (req: Request, res: Response) => {
  try {
    const { isActive, title, page, limit } = contactMethodQuerySchema.parse(
      req.query,
    );
    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (title) {
      where.title = title;
    }
    if (isActive) {
      where.isActive = isActive;
    }

    const [contactMethods, total] = await Promise.all([
      prisma.contactMethod.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.contactMethod.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      count: contactMethods.length,
      data: {
        contactMethods,
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
        message: error.issues[0].message,
      });
    }
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

    res.status(200).json({
      success: true,
      data: contactMethod,
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

// Create new contact method
const createContactMethod = async (req: Request, res: Response) => {
  try {
    const { icon, title, value, description, variant, order, isActive } =
      createContactMethodSchema.parse(req.body);

    const contactMethod = await prisma.contactMethod.create({
      data: {
        icon: icon || "Mail",
        title,
        value,
        description: description || "",
        variant: variant,
        order: order || 0,
        isActive: isActive,
      },
    });

    res.status(201).json({
      success: true,
      message: "Contact method created successfully",
      data: contactMethod,
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

// Update contact method
const updateContactMethod = async (req: Request, res: Response) => {
  try {
    const { contactMethodId } = contactMethodIdParamsSchema.parse(req.params);
    const updateData = updateContactMethodSchema.parse(req.body);

    const contactMethod = await prisma.contactMethod.findUnique({
      where: { id: contactMethodId },
    });
    if (!contactMethod) {
      return res
        .status(404)
        .json({ success: false, message: "Contact method not found" });
    }

    const updatedContactMethod = await prisma.contactMethod.update({
      where: { id: contactMethodId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Contact method updated successfully",
      data: updatedContactMethod,
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

// Delete contact method
const deleteContactMethod = async (req: Request, res: Response) => {
  try {
    const { contactMethodId } = contactMethodIdParamsSchema.parse(req.params);

    const contactMethod = await prisma.contactMethod.findUnique({
      where: { id: contactMethodId },
    });
    if (!contactMethod) {
      return res
        .status(404)
        .json({ success: false, message: "Contact method not found" });
    }

    await prisma.contactMethod.delete({
      where: { id: contactMethodId },
    });

    res.json({
      success: true,
      message: "Contact method deleted successfully",
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
  getAllContactMethods,
  getContactMethodById,
  createContactMethod,
  updateContactMethod,
  deleteContactMethod,
};
