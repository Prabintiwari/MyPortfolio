import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  liveDemo: z.string().url("Live demo must be a valid URL").optional(),
  github: z.string().url("GitHub must be a valid URL").optional(),
  featured: z.boolean().default(false),
  order: z.number().int().optional(),
  date: z.string().datetime().optional(),
});

const updateProjectSchema = projectSchema.partial()

const projectIdParamsSchema = z.object({
  projectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid project ID"),
});

export { projectSchema,updateProjectSchema,projectIdParamsSchema };
