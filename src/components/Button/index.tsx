import type { MouseEventHandler, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import styled from '@emotion/styled'
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
export interface ButtonProps {
  buttonStyle?: ButtonStyle
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  children: string
  option?: string
  iconUrl?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}
type StyledButtonProps = Pick<ButtonProps, 'buttonStyle' | 'size'>

export const Button = ({
  size,
  buttonStyle,
  type = 'button',
  children,
  option,
  iconUrl,
  onClick
}: ButtonProps): ReactElement => {
  const iconSize = size === 'small' ? ICON_SIZE.SMALL : ICON_SIZE.LARGE

  return (
    <StyledButton
      buttonStyle={buttonStyle}
      size={size}
      type={type}
      onClick={onClick}>
      {iconUrl && (
        <img alt="icon" height={iconSize} src={iconUrl} width={iconSize} />
      )}
      {children}
      {option && <StyledButtonOption>{option}</StyledButtonOption>}
    </StyledButton>
  )
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  ${({ theme }): string => theme.fonts.body02.bold}
  ${({ theme, size = 'medium', buttonStyle = 'solidPrimary' }): string =>
    renderButtonSizeStyle(theme, size, buttonStyle)}
  ${({ theme, buttonStyle = 'solidPrimary' }): string =>
    renderButtonColor(theme, buttonStyle as ButtonStyle)}

  img {
    padding-right: 4px;
    filter: ${({ theme, buttonStyle = 'solidPrimary' }): string =>
      hexToCSSFilter(renderFontColor(theme, buttonStyle)).filter};
  }
`

const StyledButtonOption = styled.span`
  padding-left: 8px;
  color: ${({ theme }): string => theme.colors.brand.primary};

  ${({ theme }): string => theme.fonts.body02.medium}
`

const renderButtonSizeStyle = (
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

const renderButtonColor = (theme: Theme, buttonStyle: ButtonStyle): string => {
  const { grayScale } = theme.colors

  switch (buttonStyle) {
    case 'solidDisabled':
      return `
                background-color: ${grayScale.gray20};
                color: ${renderFontColor(theme, buttonStyle)};
              `
    case 'solidPrimary':
      return `
                background-color: ${grayScale.black};
                color: ${renderFontColor(theme, buttonStyle)};
              `
    case 'solidSub':
      return `
                background-color: ${grayScale.gray05};
                color: ${renderFontColor(theme, buttonStyle)};
              `
    case 'outline':
      return `
                background-color: ${grayScale.white};
                border: 1px solid ${grayScale.gray20};
                color: ${renderFontColor(theme, buttonStyle)};
              `
    case 'outlineDisabled':
      return `
                background-color: ${grayScale.white};
                border: 1px solid ${grayScale.gray20};
                color: ${renderFontColor(theme, buttonStyle)};
              `
    case 'ghost':
      return `
                background-color: transparent;
                color: ${renderFontColor(theme, buttonStyle)};
              `
    default:
      return ``
  }
}

const renderFontColor = (theme: Theme, buttonStyle: ButtonStyle): string => {
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
