export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  period: string;
  current: boolean;
  location?: string;
  isActive?: boolean;
}
