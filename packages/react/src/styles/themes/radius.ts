import type { ThemeOption } from '@offer-ui/types'

type RadiusKeys = keyof typeof radius
type RadiusValues = typeof radius[RadiusKeys]

export type Radius = ThemeOption<RadiusKeys, RadiusValues>

export const radius = {
  round100: '100px',
  round12: '12px',
  round16: '16px',
  round4: '4px',
  round8: '8px'
} as const
