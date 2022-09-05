import type { HTMLAttributes, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'

const ICON_SIZE = {
  LARGE: 24,
  SMALL: 16
}
export const BUTTON_STYLE_KEYS = {
  GHOST: 'ghost',
  OUTLINE: 'outline',
  OUTLINE_DISABLED: 'outlineDisabled',
  SOLID_DISABLED: 'solidDisabled',
  SOLID_PRIMARY: 'solidPrimary',
  SOLID_SUB: 'solidSub'
}

type ButtonStyle = typeof BUTTON_STYLE_KEYS[keyof typeof BUTTON_STYLE_KEYS]
type ButtonSize = 'large' | 'medium' | 'small'
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle
  size?: ButtonSize
  iconUrl?: string
  children: string
}
type StyledButtonProps = StyledProps<ButtonProps, 'buttonStyle' | 'size'>

export const Button = ({
  size = 'medium',
  buttonStyle = 'solidPrimary',
  iconUrl,
  children,
  ...props
}: ButtonProps): ReactElement => {
  const iconSize = size === 'small' ? ICON_SIZE.SMALL : ICON_SIZE.LARGE

  return (
    <StyledButton buttonStyle={buttonStyle} size={size} {...props}>
      {iconUrl && (
        <img alt="icon" height={iconSize} src={iconUrl} width={iconSize} />
      )}
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  color: ${({ theme, buttonStyle }): string =>
    applyFontColor(theme, buttonStyle)};

  ${({ theme }): string => theme.fonts.body02B}
  ${({ theme, size, buttonStyle }): string =>
    applyButtonSizeStyle(theme, size, buttonStyle)}
  ${({ theme, buttonStyle }): string =>
    applyButtonColor(theme, buttonStyle as ButtonStyle)}

  img {
    padding-right: 4px;
    filter: ${({ theme, buttonStyle }): string =>
      hexToCSSFilter(applyFontColor(theme, buttonStyle)).filter};
  }
`
const applyButtonSizeStyle = (
  theme: Theme,
  size: ButtonSize,
  buttonStyle: ButtonStyle
): string => {
  switch (size) {
    case 'large':
      return `width: 370px;
              height: 64px;`
    case 'medium':
      return `width: 370px;
              height: 48px;
              border-radius: ${
                buttonStyle.indexOf('outline') >= 0 && theme.radius.round100
              };`
    case 'small':
      return `display: inline-flex;
              border-radius: ${theme.radius.round4};`
    default:
      return ``
  }
}

const applyButtonColor = (theme: Theme, buttonStyle: ButtonStyle): string => {
  const { grayScale } = theme.colors

  switch (buttonStyle) {
    case 'solidDisabled':
      return `background-color: ${grayScale.gray20};`
    case 'solidPrimary':
      return `background-color: ${grayScale.black};`
    case 'solidSub':
      return `background-color: ${grayScale.gray05};`
    case 'outline':
      return `background-color: ${grayScale.white};
              border: 1px solid ${grayScale.gray20};`
    case 'outlineDisabled':
      return `background-color: ${grayScale.white};
              border: 1px solid ${grayScale.gray20};`
    case 'ghost':
      return `background-color: transparent;`
    default:
      return ``
  }
}

const applyFontColor = (theme: Theme, buttonStyle: ButtonStyle): string => {
  const { grayScale } = theme.colors

  switch (buttonStyle) {
    case 'solidDisabled':
      return grayScale.white
    case 'solidPrimary':
      return grayScale.white
    case 'solidSub':
      return grayScale.gray90
    case 'outline':
      return grayScale.gray90
    case 'outlineDisabled':
      return grayScale.gray30
    case 'ghost':
      return grayScale.gray50
    default:
      return ``
  }
}
