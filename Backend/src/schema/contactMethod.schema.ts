import { z } from "zod";

const createContactMethodSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(150, "Title must be less than 150 characters"),

  icon: z.string().min(1, "Icon is required"),

  value: z.string().min(1, "Value is required"),
  gradient: z.string().min(1, "Gradient is required"),
  description: z.string().min(1, "Description is required"),

  order: z.number().int().optional(),

  isActive: z.boolean().optional(),
});

const updateContactMethodSchema = createContactMethodSchema.partial();

const contactMethodIdParamsSchema = z.object({
  contactMethodId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid contactMethod ID"),
});

const contactMethodQuerySchema = z.object({
  title: z.string().optional(),
  isActive: z.coerce.boolean().default(true).optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createContactMethodSchema,
  updateContactMethodSchema,
  contactMethodIdParamsSchema,
  contactMethodQuerySchema,
};
