
import { ColorVariant, ThemeColors } from '../types/theme.types';

export const themeConfig = {
  [ColorVariant.PRIMARY]: {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    hover: 'hover:bg-blue-500',
    border: 'border-blue-500',
    icon: 'text-blue-400',
    bgLight: 'bg-blue-500/10',
  },
  
  [ColorVariant.SECONDARY]: {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    hover: 'hover:bg-purple-500',
    border: 'border-purple-500',
    icon: 'text-purple-400',
    bgLight: 'bg-purple-500/10',
  },
  
  [ColorVariant.SUCCESS]: {
    gradient: 'from-green-500 to-teal-500',
    bg: 'bg-green-500',
    text: 'text-green-500',
    hover: 'hover:bg-green-500',
    border: 'border-green-500',
    icon: 'text-green-400',
    bgLight: 'bg-green-500/10',
  },
  
  [ColorVariant.WARNING]: {
    gradient: 'from-yellow-500 to-orange-500',
    bg: 'bg-yellow-500',
    text: 'text-yellow-500',
    hover: 'hover:bg-yellow-500',
    border: 'border-yellow-500',
    icon: 'text-yellow-400',
    bgLight: 'bg-yellow-500/10',
  },
  
  [ColorVariant.DANGER]: {
    gradient: 'from-red-500 to-pink-500',
    bg: 'bg-red-500',
    text: 'text-red-500',
    hover: 'hover:bg-red-500',
    border: 'border-red-500',
    icon: 'text-red-400',
    bgLight: 'bg-red-500/10',
  },
  
  [ColorVariant.INFO]: {
    gradient: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-500',
    text: 'text-indigo-500',
    hover: 'hover:bg-indigo-500',
    border: 'border-indigo-500',
    icon: 'text-indigo-400',
    bgLight: 'bg-indigo-500/10',
  },
  
  [ColorVariant.ACCENT]: {
    gradient: 'from-violet-500 to-fuchsia-500',
    bg: 'bg-violet-500',
    text: 'text-violet-500',
    hover: 'hover:bg-violet-500',
    border: 'border-violet-500',
    icon: 'text-violet-400',
    bgLight: 'bg-violet-500/10',
  },
};

// Helper function to get theme colors
export const getThemeColors = (variant: ColorVariant): ThemeColors => {
  return themeConfig[variant] || themeConfig[ColorVariant.PRIMARY];
};