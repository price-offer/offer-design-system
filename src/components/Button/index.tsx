import type { HTMLAttributes, ReactElement } from 'react'
import { Icon } from '@components'
import type { IconType } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'

type ButtonStyle = typeof BUTTON_STYLE_KEYS[keyof typeof BUTTON_STYLE_KEYS]
type ButtonSize = 'small' | 'medium' | 'large'
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle
  size?: ButtonSize
  iconType?: IconType
  children: string
}
type StyledButtonProps = StyledProps<ButtonProps, 'buttonStyle' | 'size'>
type StyledIconProps = StyledProps<ButtonProps, 'buttonStyle'>
type ApplyButtonColor = (theme: Theme, buttnStyle: ButtonStyle) => string
type ApplyButtonSizeStyle = (
  theme: Theme,
  buttnStyle: ButtonStyle,
  size: ButtonSize
) => string

export const BUTTON_STYLE_KEYS = {
  GHOST: 'ghost',
  OUTLINE: 'outline',
  OUTLINE_DISABLED: 'outlineDisabled',
  SOLID_DISABLED: 'solidDisabled',
  SOLID_PRIMARY: 'solidPrimary',
  SOLID_SUB: 'solidSub'
} as const
const FONT_COLOR = {
  ghost: 'gray50',
  outline: 'gray90',
  outlineDisabled: 'gray30',
  solidDisabled: 'white',
  solidPrimary: 'white',
  solidSub: 'gray90'
} as const

export const Button = ({
  size = 'medium',
  buttonStyle = 'solidPrimary',
  iconType,
  children,
  ...props
}: ButtonProps): ReactElement => {
  return (
    <StyledButton buttonStyle={buttonStyle} size={size} {...props}>
      {iconType && <StyledIcon buttonStyle={buttonStyle} type={iconType} />}
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
    applyButtonFontColor(theme, buttonStyle)};

  ${({ theme }): string => theme.fonts.body02B}
  ${({ theme, size, buttonStyle }): string =>
    applyButtonSizeStyle(theme, buttonStyle, size)}
  ${({ theme, buttonStyle }): string => applyButtonColor(theme, buttonStyle)}
`
const applyButtonSizeStyle: ApplyButtonSizeStyle = (
  theme,
  buttonStyle,
  size
) => {
  const { round100, round4 } = theme.radius

  switch (size) {
    case 'large':
      return `width: 370px;
              height: 64px;`
    case 'medium':
      return `width: 370px;
              height: 48px;
              border-radius: ${
                buttonStyle.indexOf('outline') >= 0 && round100
              };`
    case 'small':
      return `display: inline-flex;
              height: 32px;
              padding: 4px 8px;
              border-radius: ${round4};`
    default:
      return ``
  }
}

const StyledIcon = styled(Icon)<StyledIconProps>`
  margin-right: 4px;
  color: ${({ theme, buttonStyle }): string =>
    applyButtonFontColor(theme, buttonStyle)};
`

const applyButtonColor: ApplyButtonColor = (theme, buttonStyle) => {
  const { gray20, black, gray05, white } = theme.colors.grayScale
  const {
    SOLID_DISABLED,
    SOLID_PRIMARY,
    SOLID_SUB,
    OUTLINE,
    OUTLINE_DISABLED,
    GHOST
  } = BUTTON_STYLE_KEYS

  switch (buttonStyle) {
    case SOLID_DISABLED:
      return `background-color: ${gray20};`
    case SOLID_PRIMARY:
      return `background-color: ${black};`
    case SOLID_SUB:
      return `background-color: ${gray05};`
    case OUTLINE:
      return `background-color: ${white};
              border: 1px solid ${gray20};`
    case OUTLINE_DISABLED:
      return `background-color: ${white};
              border: 1px solid ${gray20};`
    case GHOST:
      return `background-color: transparent;`
    default:
      return ``
  }
}

const applyButtonFontColor: ApplyButtonColor = (theme, buttonStyle) =>
  theme.colors.grayScale[FONT_COLOR[buttonStyle]]
