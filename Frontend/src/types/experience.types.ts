export interface Experience {
  id: string;
  position: string;
  company: string;
  period: string;
  description: string;
  location: string;
  current:boolean;
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
