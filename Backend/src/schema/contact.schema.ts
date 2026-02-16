import { z } from "zod";

const createContactSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(150, "Title must be less than 150 characters"),

  company: z
    .string()
    .min(1, "Company name is required")
    .max(150, "Company must be less than 150 characters"),

  period: z.string().min(1, "Period is required"), 
  description: z.string().min(1, "Description is required"),

  order: z.number().int().optional(), 

  isActive: z.boolean().optional(), 
});

const updateContactSchema = createContactSchema.partial();

const contactIdParamsSchema = z.object({
  contactId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid contact ID"),
});

const contactQuerySchema = z.object({
  title: z.string().optional(),
  company: z.string().optional(),
  isActive: z.coerce.boolean().default(true).optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createContactSchema,
  updateContactSchema,
  contactIdParamsSchema,
  contactQuerySchema,
};
