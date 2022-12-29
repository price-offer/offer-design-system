import type { ThemeOption } from '@offer-ui/types'

type BackgroundColorKeys = keyof typeof colors.background
type BackgroundColorValues = typeof colors.background[BackgroundColorKeys]
type BrandColorKeys = keyof typeof colors.brand
type BrandColorValues = typeof colors.brand[BrandColorKeys]
type ActionColorKeys = keyof typeof colors.action
type ActionColorValues = typeof colors.action[ActionColorKeys]
type GrayScaleColorKeys = keyof typeof colors.grayScale
type GrayScaleColorValues = typeof colors.grayScale[GrayScaleColorKeys]
type DimColorKeys = keyof typeof colors.dim
type DimColorValues = typeof colors.dim[DimColorKeys]

export interface Colors {
  background: ThemeOption<BackgroundColorKeys, BackgroundColorValues>
  brand: ThemeOption<BrandColorKeys, BrandColorValues>
  action: ThemeOption<ActionColorKeys, ActionColorValues>
  grayScale: ThemeOption<GrayScaleColorKeys, GrayScaleColorValues>
  dim: ThemeOption<DimColorKeys, DimColorValues>
}

export const colors = {
  action: {
    error: '#F36140',
    success: '#4AB783'
  },
  background: {
    gray01: '#FAFAFA',
    gray02: '#F6F6F7',
    gray03: '#F3F3F3',
    gray04: '#EDEEEF',
    primary: '#FF6E59',
    primaryWeak: '#FFF0EE',
    white: '#FFFFFF'
  },
  brand: {
    primary: '#FF6E59',
    primaryWeak: '#FFECE9',
    sub: '#673CE6',
    subWeak: '#E1D8FA'
  },
  dim: {
    opacity25: '#00000040',
    opacity40: '#00000066',
    opacity50: '#00000080',
    opacity70: '#000000B2'
  },
  grayScale: {
    black: '#000000',
    gray05: '#F6F6F7',
    gray10: '#E8E8EA',
    gray20: '#D1D3D6',
    gray30: '#C6C8CC',
    gray50: '#929399',
    gray70: '#65646A',
    gray90: '#2F2E36',
    white: '#FFFFFF'
  }
} as const
