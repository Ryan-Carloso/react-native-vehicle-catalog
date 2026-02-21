export const BrandColors = {
  background: '#0f172a',
  backgroundElevated: '#111b31',
  surface: '#111827',
  surfaceMuted: '#1f2937',
  surfaceStrong: '#0b1222',
  border: '#243041',
  borderSoft: '#31415f',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#1e88e5',
  accentSoft: '#0b3b73',
  accentGlow: '#38bdf8',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  heroStart: '#15213b',
  heroEnd: '#0b1222',
  shadow: '#000000',
} as const;

export type TBrandColorName = keyof typeof BrandColors;
