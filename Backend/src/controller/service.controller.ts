import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { projectIdParamsSchema } from '../schema';

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;

    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single service
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { projectId } = projectIdParamsSchema.parse(req.params);

    const service = await prisma.service.findUnique({
      where: { id:projectId },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { icon, title, description, features, order, isActive } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description',
      });
    }

    const service = await prisma.service.create({
      data: {
        icon: icon || 'Code',
        title,
        description,
        features: features || [],
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update service
export const updateService = async (req: Request, res: Response) => {
  try {
    const { projectId } = projectIdParamsSchema.parse(req.params);
    const updateData = req.body;

    const service = await prisma.service.update({
      where: { id:projectId },
      data: updateData,
    });

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete service
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { projectId } = projectIdParamsSchema.parse(req.params);

    await prisma.service.delete({
      where: { id:projectId },
    });

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};