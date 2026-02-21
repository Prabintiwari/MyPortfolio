import { ColorVariant } from "@prisma/client";
import { z } from "zod";

const createSocialLinksSchema = z.object({
  icon: z.any().refine((val) => typeof val === "function", {
    message: "Icon must be a valid React component",
  }),

  url: z.string().trim().url("Invalid URL format").max(300, "URL is too long"),

  label: z
    .string()
    .trim()
    .min(2, "Label must be at least 2 characters")
    .max(50, "Label must be less than 50 characters"),

  variant: z.nativeEnum(ColorVariant),
  order: z.number().int().optional(),
  isActive: z.boolean().default(true).optional(),
});

const updateSocialLinkSchema = createSocialLinksSchema.partial();

const socialLinkIdParamsSchema = z.object({
  socialLinkId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid social link ID"),
});

const socialLinkQuerySchema = z.object({
  label: z.coerce.string().optional(),
  isActive: z.coerce.boolean().default(true).optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export {
  createSocialLinksSchema,
  updateSocialLinkSchema,
  socialLinkIdParamsSchema,
  socialLinkQuerySchema,
};
