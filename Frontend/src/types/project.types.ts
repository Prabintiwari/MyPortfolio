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
  createdAt: string;
  updatedAt: string;
}

export interface ProjectQuery {
  category?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

