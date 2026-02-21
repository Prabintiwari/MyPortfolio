import { ColorVariant } from "./theme.types";

export interface SocialLinks {
  id: string;
  url: string;
  label: string;
  icon: string;
  variant: ColorVariant;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinksQuery {
  label?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
