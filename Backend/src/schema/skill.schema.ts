import { ColorVariant } from "@prisma/client";
import { optional, z } from "zod";

const createSkillSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required")
    .max(100, "Skill name must be less than 100 characters"),

  level: z
    .number()
    .int("Level must be an integer")
    .min(0, "Level must be at least 0")
    .max(100, "Level cannot exceed 100"),

  icon: z.string().optional(),

  variant: z.nativeEnum(ColorVariant).default(ColorVariant.PRIMARY),

  category: z.string().optional(),

  order: z.number().int().optional(),

  isActive: z.boolean().default(true).optional(),
});

const updateSkillSchema = createSkillSchema.partial();

const sillIdParamsSchema = z.object({
  skillId: z.string().uuid("Invalid skill ID"),
});

const skillQuerySchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createSkillSchema,
  updateSkillSchema,
  sillIdParamsSchema,
  skillQuerySchema,
};
