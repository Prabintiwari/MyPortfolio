import { ColorVariant } from "./theme.types";

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
  category: string;
  variant: ColorVariant;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SkillQuery {
  name?: string;
  category?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
