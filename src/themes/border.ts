import type { ThemeOption } from '@types'

type BorderKeys = keyof typeof border
type BorderValues = typeof border[BorderKeys]

export type Border = ThemeOption<BorderKeys, BorderValues>

export const border = {
  bold: '8px',
  regular: '1px'
} as const
