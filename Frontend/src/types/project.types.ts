export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  image: string;
  createdAt: string;
}

export interface GetProjectsParams {
  category?: string;
  featured?: boolean;
}
