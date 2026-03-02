/* ==========================================================================
   Design Tokens — Colors (TypeScript)
   Use este arquivo para referenciar cores em código TS/JS,
   ex: styled-components, inline styles, testes, etc.
   ========================================================================== */

export const colors = {
  blue: {
    base: '#2C46B1',
    dark: '#2C4091',
  },
  gray: {
    white: '#FFFFFF',
    100: '#F9F9FB',
    200: '#E4E6EC',
    300: '#CDCFD5',
    400: '#74798B',
    500: '#4D505C',
    600: '#1F2025',
  },
  feedback: {
    danger: '#B12C4D',
  },
} as const;

export type ColorToken = typeof colors;
