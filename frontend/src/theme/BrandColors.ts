export const BrandColors = {
  background: '#090a0b',
  backgroundElevated: '#111317',
  surface: '#0d0f12',
  surfaceMuted: '#1a1f25',
  surfaceStrong: '#13171c',
  border: '#2d333a',
  borderSoft: '#4e5661',
  textPrimary: '#f2f3f5',
  textSecondary: '#c2c7cf',
  textMuted: '#8d96a3',
  accent: '#eadb2f',
  accentSoft: '#a1932b',
  accentGlow: '#f3e56a',
  success: '#8ed27f',
  warning: '#eadb2f',
  danger: '#ea6d6d',
  heroStart: '#181c22',
  heroEnd: '#0d1014',
  shadow: '#000000',
  overlayLine: 'rgba(255,255,255,0.035)',
  overlayVignette: 'rgba(0,0,0,0.58)',
  cardDepth: 'rgba(0,0,0,0.36)',
  cardHighlight: 'rgba(255,255,255,0.12)',
  backgroundGradient: ['#232326', '#141416', '#0a0a0b'],
  backgroundGradientLocations: [0, 0.45, 1],
  cardGradient: ['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.02)', 'rgba(0,0,0,0.26)'],
  cardGradientLocations: [0, 0.15, 1],
} as const;

export const SKELETON_START = { x: 0, y: 0 } as const;
export const SKELETON_END = { x: 0, y: 1 } as const;

export type TBrandColorName = keyof typeof BrandColors;
