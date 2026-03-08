export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  period: string;
  current: boolean;
  location?: string;
  order?: number;
  isActive?: boolean;
}
