import type { ColorVariant } from "./theme.types";

export interface ContactMethod {
  id: string;
  title: string;
  description: string;
  value: string;
  icon?: string;
  variant?: ColorVariant;
  order: number;
}
