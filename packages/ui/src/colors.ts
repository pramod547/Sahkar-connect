export const colors = {
  coopTeal900: '#0B4F4A',
  coopTeal600: '#147D74',
  coopSaffron500: '#E8A33D',
  coopCream50: '#FBF7EF',
  coopCharcoal800: '#2B2B2B',
  coopSuccess600: '#2E8B57',
  coopWarning500: '#D97706',
  coopDanger600: '#C0392B',
} as const;

export type ColorTokens = typeof colors;
