import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { Icon } from '@offer-ui/components/Icon'
import type { IconType } from '@offer-ui/components/Icon'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import type { Theme } from '@emotion/react'

type ButtonStyleType = typeof BUTTON_STYLE_KEYS[keyof typeof BUTTON_STYLE_KEYS]
type ButtonSize = 'small' | 'medium' | 'large'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button의 보여질 형태를 정합니다.
   * @type "ghost" | "outline" | "outlineDisabled" | "solidDisabled" | "solidPrimary" | "solidSub" | undefined
   */
  styleType?: ButtonStyleType
  /**
   * Button의 크기를 정합니다.
   * @type 'small' | 'medium' | 'large' | undefined
   */
  size?: ButtonSize
  /**
   * Button에 포함될 아이콘 타입을 정합니다.
   * @type IconType | undefined
   */
  icon?: IconType
  /**
   * Button 내부에 작성할 문자열을 정합니다.
   * @type string
   */
  children: Exclude<ReactNode, 'undefined' | 'null'>
}
type StyledButtonProps = StyledProps<ButtonProps, 'styleType' | 'size'>
type StyledIconProps = StyledProps<ButtonProps, 'styleType'>
type ApplyButtonColor = (theme: Theme, styleType: ButtonStyleType) => string
type ApplyButtonSizeStyle = (
  theme: Theme,
  styleType: ButtonStyleType,
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
  ghost: 'gsGray50',
  outline: 'gsGray90',
  outlineDisabled: 'gsGray30',
  solidDisabled: 'gsWhite',
  solidPrimary: 'gsWhite',
  solidSub: 'gsGray90'
} as const

export const Button = forwardRef(function Button(
  {
    size = 'medium',
    styleType = 'solidPrimary',
    icon,
    children,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledButton ref={ref} size={size} styleType={styleType} {...props}>
      {icon && <StyledIcon styleType={styleType} type={icon} />}
      {children}
    </StyledButton>
  )
})

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  color: ${({ theme, styleType }): string =>
    applyButtonFontColor(theme, styleType)};

  ${({ theme }): string => theme.fonts.body02B}
  ${({ theme, size, styleType }): string =>
    applyButtonSizeStyle(theme, styleType, size)}
  ${({ theme, styleType }): string => applyButtonColor(theme, styleType)}
`
const applyButtonSizeStyle: ApplyButtonSizeStyle = (theme, styleType, size) => {
  const { round100, round4 } = theme.radius

  switch (size) {
    case 'large':
      return `width: 100%;
              height: 64px;`
    case 'medium':
      return `width: 100%;
              height: 48px;
              border-radius: ${styleType.indexOf('outline') >= 0 && round100};`
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
  color: ${({ theme, styleType }): string =>
    applyButtonFontColor(theme, styleType)};
`

const applyButtonColor: ApplyButtonColor = (theme, styleType) => {
  const { gsGray20, gsBlack, gsGray05, gsWhite } = theme.colors
  const {
    SOLID_DISABLED,
    SOLID_PRIMARY,
    SOLID_SUB,
    OUTLINE,
    OUTLINE_DISABLED,
    GHOST
  } = BUTTON_STYLE_KEYS

  switch (styleType) {
    case SOLID_DISABLED:
      return `background-color: ${gsGray20};`
    case SOLID_PRIMARY:
      return `background-color: ${gsBlack};`
    case SOLID_SUB:
      return `background-color: ${gsGray05};`
    case OUTLINE:
      return `background-color: ${gsWhite};
              border: 1px solid ${gsGray20};`
    case OUTLINE_DISABLED:
      return `background-color: ${gsWhite};
              border: 1px solid ${gsGray20};`
    case GHOST:
      return `background-color: transparent;`
    default:
      return ``
  }
}

const applyButtonFontColor: ApplyButtonColor = (theme, styleType) =>
  theme.colors[FONT_COLOR[styleType]]
