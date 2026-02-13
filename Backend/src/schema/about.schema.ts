import { z } from "zod";

const createProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),

  title: z.string().min(1, "Title is required"),

  bio: z.string().min(1, "Bio is required"),

  avatar: z.string().url("Avatar must be a valid URL").optional(),

  resume: z.string().url("Resume must be a valid URL").optional(),

  subtitle: z.string().optional(),

  description: z.string().optional(),

  yearsExperience: z
    .number()
    .int("Years of experience must be a number")
    .min(0, "Years of experience cannot be negative"),
  projectsCompleted: z
    .number()
    .int("Projects completed must be a number")
    .min(0),
  openSource: z
    .number()
    .int("Open source contributions must be a number")
    .min(0)
    .default(0),

  globalReachText: z.string().optional(),
});

const updateProfileSchema = createProfileSchema.partial();

export { createProfileSchema ,updateProfileSchema};
