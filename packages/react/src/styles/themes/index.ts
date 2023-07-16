import { border } from './border'
import type { BorderKeys } from './border'
import type { ColorKeys } from './colors'
import { colors } from './colors'
import type { FontKeys } from './fonts'
import { fonts } from './fonts'
import { mediaQuery } from './mediaQuery'
import type { MediaQueryKeys } from './mediaQuery'
import { radius } from './radius'
import type { RadiusKeys } from './radius'
import { zIndex } from './zIndex'
import type { ZIndexKeys } from './zIndex'

export type Theme = typeof theme
export interface ThemeKeys {
  border: BorderKeys
  color: ColorKeys
  fonts: FontKeys
  mediaQuery: MediaQueryKeys
  radius: RadiusKeys
  zIndex: ZIndexKeys
}

export const theme = {
  border,
  colors,
  fonts,
  mediaQuery,
  radius,
  zIndex
} as const
