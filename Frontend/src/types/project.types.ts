export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  liveDemo?: string;
  github?: string;
  isFeatured: boolean;
  isActive: boolean;
  date?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectQuery {
  category?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
