import { Request, Response } from "express";
import prisma from "../config/prisma";
import { sendContactNotification } from "../templetes/emailTempletes";
import {
  contactIdParamsSchema,
  contactQuerySchema,
  createContactSchema,
} from "../schema";
import { ZodError } from "zod";

// Get all contact messages
const getAllContacts = async (req: Request, res: Response) => {
  try {
    const { isRead, page, limit } = contactQuerySchema.parse(req.query);
    const pageNumber = page || 1;
    const limitNumber = limit || 5;
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (isRead) {
      where.isRead = isRead;
    }

    const [contacts, total] = await Promise.all([
      await prisma.contact.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        contacts,
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

// Submit contact form
const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = createContactSchema.parse(
      req.body,
    );

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    sendContactNotification({
      name,
      email,
      subject,
      message,
    }).then((result) => {
      if (result.success) {
        console.log(" Email notification sent successfully");
      } else {
        console.error(" Email notification failed:", result.error);
      }
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
      data: contact,
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

// Mark message as read
const markAsRead = async (req: Request, res: Response) => {
  try {
    const { contactId } = contactIdParamsSchema.parse(req.params);

    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: { isRead: true },
    });

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: updatedContact,
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

// Delete contact message
const deleteContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = contactIdParamsSchema.parse(req.params);

    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    await prisma.contact.delete({
      where: { id: contactId },
    });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
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

export { getAllContacts, createContact, markAsRead, deleteContact };
