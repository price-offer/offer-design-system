import type { ThemeOption } from '@types'

export type FontStyleKeys = keyof typeof fonts
type FontStyleValues = typeof fonts[FontStyleKeys]

export type Fonts = ThemeOption<FontStyleKeys, FontStyleValues>

export const fonts = {
  body01B:
    'font-size: 16px; font-weight: bold; line-height: 24px; letter-spacing: -0.1px;',
  body01M:
    'font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: -0.1px;',
  body01R:
    'font-size: 16px; font-weight: normal; line-height: 24px; letter-spacing: -0.1px;',
  body02B:
    'font-size: 14px; font-weight: bold; line-height: 24px; letter-spacing: -0.1px;',
  body02L:
    'font-size: 14px; font-weight: normal; line-height: 26px; letter-spacing: -0.1px;',
  body02M: 'font-size: 14px; font-weight: 500; line-height: 20px;',
  body02R:
    'font-size: 14px; font-weight: normal; line-height: 20px; letter-spacing: -0.1px;',
  caption01B:
    'font-size: 12px; font-weight: bold; line-height: 16px; letter-spacing: -0.05px;',
  caption01M:
    'font-size: 12px; font-weight: 500; line-height: 16px; letter-spacing: -0.05px;',
  display01B:
    'font-size: 36px; font-weight: bold; line-height: 40px; letter-spacing: -0.1px;',
  display02B: 'font-size: 28px; font-weight: bold; line-height: 28px;',
  display02M: 'font-size: 28px; font-weight: 500; line-height: 28px;',
  headline01B: 'font-size: 24px; font-weight: bold; line-height: 32px;',
  headline02B:
    'font-size: 20px; font-weight: bold; line-height: 28px; letter-spacing: -0.1px;',
  subtitle01B:
    'font-size: 18px; font-weight: bold; line-height: 22px; letter-spacing: -0.1px;',
  subtitle01M:
    'font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: -0.05px;'
} as const
