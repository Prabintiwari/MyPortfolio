import { z } from "zod";

const createContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(150, "Email must be less than 150 characters")
    .email("Invalid email format")
    .toLowerCase(),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject must be less than 100 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

const contactIdParamsSchema = z.object({
  contactId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid contact ID"),
});

const contactQuerySchema = z.object({
  isRead: z.coerce.boolean().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createContactSchema,
  contactIdParamsSchema,
  contactQuerySchema,
};
