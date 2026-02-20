import { Request, Response } from "express";
import prisma from "../config/prisma";
import {
  createServiceSchema,
  serviceIdParamsSchema,
  serviceQuerySchema,
  updateServiceSchema,
} from "../schema";
import { ZodError } from "zod";

// Get all services
const getAllServices = async (req: Request, res: Response) => {
  try {
    const { isActive, page, limit } = serviceQuerySchema.parse(
      req.query,
    );
    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (isActive) {
      where.isActive = isActive;
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { order: "asc" },
      }),
      prisma.service.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        services,
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

// Get single service
const getServiceById = async (req: Request, res: Response) => {
  try {
    const { serviceId } = serviceIdParamsSchema.parse(req.params);

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
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

// Create new service
const createService = async (req: Request, res: Response) => {
  try {
    const { icon, title, description, features, order, isActive } =
      createServiceSchema.parse(req.body);

    const service = await prisma.service.create({
      data: {
        icon: icon,
        title,
        description,
        features: features || [],
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
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

// Update service
const updateService = async (req: Request, res: Response) => {
  try {
    const { serviceId } = serviceIdParamsSchema.parse(req.params);
    const updateData = updateServiceSchema.parse(req.body);

    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    const service = await prisma.service.update({
      where: { id: serviceId },
      data: updateData,
    });

    res.json({
      success: true,
      message: "Service updated successfully",
      data: service,
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

// Delete service
const deleteService = async (req: Request, res: Response) => {
  try {
    const { serviceId } = serviceIdParamsSchema.parse(req.params);

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    res.json({
      success: true,
      message: "Service deleted successfully",
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
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
