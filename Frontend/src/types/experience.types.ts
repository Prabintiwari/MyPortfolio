export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  order: number;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceQuery {
  title?: string;
  company?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
