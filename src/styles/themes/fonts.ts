import type { ThemeOption } from '@types'

export type FontStyleKeys = keyof typeof fonts
type FontStyleValues = typeof fonts[FontStyleKeys]

export type Fonts = ThemeOption<FontStyleKeys, FontStyleValues>

export const fonts = {
  body01B:
    'font-size: 16px; font-weight: bold; line-height: 24px; letter-spacing: -0.6%;',
  body01M:
    'font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: -0.6%;',
  body01R:
    'font-size: 16px; font-weight: regular; line-height: 24px; letter-spacing: -0.6%;',
  body02B:
    'font-size: 14px; font-weight: bold; line-height: 24px; letter-spacing: -0.6%;',
  body02L:
    'font-size: 14px; font-weight: regular; line-height: 26px; letter-spacing: -0.4%;',
  body02M: 'font-size: 14px; font-weight: 500; line-height: 20px;',
  body02R:
    'font-size: 14px; font-weight: regular; line-height: 14px; letter-spacing: -0.4%;',
  caption:
    'font-size: 12px; font-weight: bold; line-height: 16px; letter-spacing: -0.3%;',
  display01:
    'font-size: 36px; font-weight: bold; line-height: 40px; letter-spacing: -0.6%;',
  display02B: 'font-size: 28px; font-weight: bold; line-height: 28px;',
  display02M: 'font-size: 28px; font-weight: 500; line-height: 28px;',
  headline01: 'font-size: 24px; font-weight: bold; line-height: 32px;',
  headline02: 'font-size: 20px; font-weight: bold; line-height: 28px;',
  subtitle01B:
    'font-size: 18px; font-weight: bold; line-height: 22px; letter-spacing: -0.6%;',
  subtitle01M:
    'font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: -0.4%;'
} as const
