import { z } from "zod";

const createSkillSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  description: z.string().min(1, "Description is required"),

  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .min(1, "At least one feature is required"),
  icon: z.string("Icon is required"),
  order: z.number().int().optional(),
  isActive: z.boolean().default(true),
});

const updateSkillSchema = createSkillSchema.partial();

const sillIdParamsSchema = z.object({
  skillId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid skill ID"),
});

const skillQuerySchema = z.object({
  isFeatured: z.coerce.boolean().default(true).optional(),
  isActive: z.coerce.boolean().default(true).optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createSkillSchema,
  updateSkillSchema,
  sillIdParamsSchema,
  skillQuerySchema,
};
