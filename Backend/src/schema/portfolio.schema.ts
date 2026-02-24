import { z } from "zod";

const portfolioFilesSchema = z.object({
  avatar: z.string().url("Invalid avatar URL").optional(),

  resume: z.string().url("Invalid resume URL").optional(),

  logo: z.string().url("Invalid logo URL").optional(),
});

const updatePortfolioFilesSchema = portfolioFilesSchema.partial();

export { portfolioFilesSchema, updatePortfolioFilesSchema };
