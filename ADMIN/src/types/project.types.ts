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
  isActive?: boolean;
  order: number;
  date: string;
}

export interface ProjectQuery {
  category?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
