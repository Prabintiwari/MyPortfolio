export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceQuery {
  isActive?: boolean;
  page?: number;
  limit?: number;
}

