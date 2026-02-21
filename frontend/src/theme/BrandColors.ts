export const BrandColors = {
  background: '#ffffff',
  backgroundElevated: '#f5f5f5',
  surface: '#fafafa',
  surfaceMuted: '#e5e5e5',
  surfaceStrong: '#d4d4d4',
  border: '#000000',
  borderSoft: '#404040',
  textPrimary: '#000000',
  textSecondary: '#404040',
  textMuted: '#808080',
  accent: '#000000',
  accentSoft: '#808080',
  accentGlow: '#000000',
  success: '#000000',
  warning: '#000000',
  danger: '#000000',
  heroStart: '#ffffff',
  heroEnd: '#ffffff',
  shadow: '#000000',
} as const;

export type TBrandColorName = keyof typeof BrandColors;
