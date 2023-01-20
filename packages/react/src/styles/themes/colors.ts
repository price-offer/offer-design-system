export type Colors = typeof colors
export type ColorKeys = keyof typeof colors

export const colors = {
  // action
  actError: '#F36140',
  actSuccess: '#4AB783',

  // background
  bgGray01: '#FAFAFA',
  bgGray02: '#F6F6F7',
  bgGray03: '#F3F3F3',
  bgGray04: '#EDEEEF',
  bgPrimary: '#FF6E59',
  bgPrimaryWeak: '#FFF0EE',

  // brand
  brandPrimary: '#FF6E59',
  brandPrimaryWeak: '#FFECE9',
  brandSub: '#673CE6',
  brandSubWeak: '#E1D8FA',

  // dim
  dimOpacity25: '#00000040',
  dimOpacity40: '#00000066',
  dimOpacity50: '#00000080',
  dimOpacity70: '#000000B2',

  //grayScale
  white: '#FFFFFF',
  black: '#000000',
  grayScale05: '#F6F6F7',
  grayScale10: '#E8E8EA',
  grayScale20: '#D1D3D6',
  grayScale30: '#C6C8CC',
  grayScale50: '#929399',
  grayScale70: '#65646A',
  grayScale90: '#2F2E36'
} as const
