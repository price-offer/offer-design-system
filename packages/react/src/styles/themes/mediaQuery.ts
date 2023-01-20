export type MediaQuery = typeof mediaQuery

export const mediaQuery = {
  desktop: '@media (max-width: 1920px)',
  mobile: '@media (max-width: 699px)',
  tablet: '@media (max-width: 1023px)'
} as const
