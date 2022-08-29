import type { ThemeOption } from '@types'

type RadiusKeys = keyof typeof radius
type RadiusValues = typeof radius[RadiusKeys]

export type Radius = ThemeOption<RadiusKeys, RadiusValues>

export const radius = {
  round04: '4px',
  round08: '8px',
  round12: '12px',
  round16: '16px'
} as const
