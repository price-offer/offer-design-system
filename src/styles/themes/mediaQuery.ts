import type { ThemeOption } from '@types'

type MediaQueryKeys = keyof typeof mediaQuery
type MediaQueryValues = typeof mediaQuery[MediaQueryKeys]

export type MediaQuery = ThemeOption<MediaQueryKeys, MediaQueryValues>

export const mediaQuery = {
  desktop: '1920px',
  mobile: '360px',
  tablet: '768px'
} as const
