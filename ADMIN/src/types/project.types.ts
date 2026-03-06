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
  order: number;
  date: string;
}

export interface CreateProject {
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveDemo?: string;
  github?: string;
  order?: number;
  isFeatured?: boolean;
  date: string;
}

export interface UpdateProject {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  liveDemo?: string;
  github?: string;
  image?: string;
  order?: number;
  isFeatured?: boolean;
  date?: string;
  isActive?: boolean;
}

export interface ProjectQuery {
  category?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
