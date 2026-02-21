import { ColorVariant } from "./theme.types"

export interface ContactMethod {
  id: string;
  icon: string;
  title: string;
  value: string;
  description: string;
  variant: ColorVariant;
  order: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMethodQuery {
  title?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

