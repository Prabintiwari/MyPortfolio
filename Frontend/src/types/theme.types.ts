
export enum ColorVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
  INFO = 'INFO',
  ACCENT = 'ACCENT',
}

export interface ThemeColors {
  gradient: string;
  bg: string;
  text: string;
  hover: string;
  border: string;
  icon?: string;
  bgLight?: string;
}
