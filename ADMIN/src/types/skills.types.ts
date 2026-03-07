import type { ColorVariant } from "./theme.types";

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
  order?: number;
  variant?: ColorVariant;
  isActive?: boolean;
}
