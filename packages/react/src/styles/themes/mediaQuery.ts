import type { ThemeOption } from '@offer-ui/types'

type MediaQueryKeys = keyof typeof mediaQuery
type MediaQueryValues = typeof mediaQuery[MediaQueryKeys]

export type MediaQuery = ThemeOption<MediaQueryKeys, MediaQueryValues>

export const mediaQuery = {
  desktop: '@media (max-width: 1920px)',
  mobile: '@media (max-width: 699px)',
  tablet: '@media (max-width: 1023px)'
} as const
