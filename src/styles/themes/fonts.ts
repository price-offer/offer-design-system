import type { ThemeOption } from '@types'

type FontStyleKeys = 'bold' | 'medium' | 'regular' | 'long'
type FontStyle = ThemeOption<FontStyleKeys, string>

export interface Fonts {
  body01: Omit<FontStyle, 'long'>
  body02: FontStyle
  caption: string
  display01: string
  display02: Pick<FontStyle, 'bold' | 'medium'>
  headline01: string
  headline02: string
  subtitle01: Pick<FontStyle, 'bold' | 'medium'>
}

export const fonts: Fonts = {
  body01: {
    bold: 'font-size: 16px; font-weight: bold; line-height: 24px; letter-spacing: -0.6%;',
    medium:
      'font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: -0.6%;',
    regular:
      'font-size: 16px; font-weight: regular; line-height: 24px; letter-spacing: -0.6%;'
  },
  body02: {
    bold: 'font-size: 14px; font-weight: bold; line-height: 24px; letter-spacing: -0.6%;',
    long: 'font-size: 14px; font-weight: regular; line-height: 26px; letter-spacing: -0.4%;',
    medium: 'font-size: 14px; font-weight: 500; line-height: 20px;',
    regular:
      'font-size: 14px; font-weight: regular; line-height: 14px; letter-spacing: -0.4%;'
  },
  caption:
    'font-size: 12px; font-weight: bold; line-height: 16px; letter-spacing: -0.3%;',
  display01:
    'font-size: 36px; font-weight: bold; line-height: 40px; letter-spacing: -0.6%;',
  display02: {
    bold: 'font-size: 28px; font-weight: bold; line-height: 28px;',
    medium: 'font-size: 28px; font-weight: 500; line-height: 28px;'
  },
  headline01: 'font-size: 24px; font-weight: bold; line-height: 32px;',
  headline02: 'font-size: 20px; font-weight: bold; line-height: 28px;',
  subtitle01: {
    bold: 'font-size: 18px; font-weight: bold; line-height: 22px; letter-spacing: -0.6%;',
    medium:
      'font-size: 18px; font-weight: 500; line-height: 22px; letter-spacing: -0.4%;'
  }
} as const
