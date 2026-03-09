export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  order: number;
  isActive?: boolean;
}
