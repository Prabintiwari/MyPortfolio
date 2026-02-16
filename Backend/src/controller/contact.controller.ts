import { Request, Response } from "express";
import prisma from "../config/prisma";
import { sendContactNotification } from "../templetes/emailTempletes";
import { contactIdParamsSchema } from "../schema";

// Get all contact messages
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const { isRead } = req.query;

    const where: any = {};
    if (isRead !== undefined) {
      where.isRead = isRead === "true";
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Submit contact form
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    // Send email notification (async - don't wait for it)
    // Even if email fails, contact is still saved
    sendContactNotification({
      name,
      email,
      subject,
      message,
    }).then((result) => {
      if (result.success) {
        console.log("✅ Email notification sent successfully");
      } else {
        console.error("❌ Email notification failed:", result.error);
      }
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
      data: contact,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark message as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { contactId } = contactIdParamsSchema.parse(req.params);

    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: { isRead: true },
    });

    res.json({
      success: true,
      message: "Message marked as read",
      data: contact,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete contact message
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { contactId } = contactIdParamsSchema.parse(req.params);

    await prisma.contact.delete({
      where: { id: contactId },
    });

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
