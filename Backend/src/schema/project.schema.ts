import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  tags: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(z.array(z.string()).nonempty()),
  liveDemo: z.string().url().optional(),
  github: z.string().url().optional(),
  order: z.coerce.number().int().optional(),
  isFeatured: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean(),
  ),
  isActive: z.preprocess((val) => val === "true" || val === true, z.boolean()),

  date: z.string().optional(),
});

const updateProjectSchema = projectSchema.partial();

const projectIdParamsSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
});

const projectQuerySchema = z.object({
  category: z.string().optional(),
  isFeatured: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  projectSchema,
  updateProjectSchema,
  projectIdParamsSchema,
  projectQuerySchema,
};
