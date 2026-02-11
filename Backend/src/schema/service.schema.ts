import { z } from "zod";

const createServiceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  description: z.string().min(1, "Description is required"),

  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .min(1, "At least one feature is required"),
  icon: z.string("Icon is required"),
  category: z.string().min(1, "Category is required"),
  order: z.number().int().optional(),
  isActive: z.boolean().default(true),
});

const updateServiceSchema = createServiceSchema.partial();

const serviceIdParamsSchema = z.object({
  serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID"),
});

const serviceQuerySchema = z.object({
  category: z.string().min(1, "Category is required").optional(),
  featured: z.coerce.boolean().default(true).optional(),
  isActive: z.coerce.boolean().default(true).optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createServiceSchema,
  updateServiceSchema,
  serviceIdParamsSchema,
  serviceQuerySchema,
};
