import { z } from "zod";

const createExperienceSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(100, "Skill name must be less than 100 characters"),

  level: z
    .number()
    .int("Level must be an integer")
    .min(0, "Level must be at least 0")
    .max(100, "Level cannot exceed 100"),

  icon: z.string().min(1, "Icon is required"),

  color: z.string().min(1, "Color is required"),

  category: z.string().optional(),

  order: z.number().int().optional(),

  isActive: z.boolean().default(true).optional(),
});

const updateExperienceSchema = createExperienceSchema.partial();

const experienceIdParamsSchema = z.object({
  experienceId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid experience ID"),
});

const experienceQuerySchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  isActive: z.coerce.boolean().default(true).optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createExperienceSchema,
  updateExperienceSchema,
  experienceIdParamsSchema,
  experienceQuerySchema,
};
