import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@offer-ui/components/Icon'
import type { IconType } from '@offer-ui/components/Icon'
import type { StyledProps } from '@offer-ui/types'
import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from 'react'
import { forwardRef } from 'react'

type ButtonStyleType = typeof BUTTON_STYLE_KEYS[keyof typeof BUTTON_STYLE_KEYS]
type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonProps = {
  /**
   * Button의 보여질 형태를 정합니다.
   * @type "ghost" | "outline" | "outlineDisabled" | "solidDisabled" | "solidPrimary" | "solidSub" | undefined
   */
  styleType?: ButtonStyleType
  /**
   * Button의 너비를 정합니다.
   * @type string | undefined
   */
  width?: string
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
  children: Exclude<ReactNode, undefined | null>
} & ButtonHTMLAttributes<HTMLButtonElement>
type StyledButtonProps = StyledProps<
  ButtonProps,
  'styleType' | 'size' | 'width'
>
type StyledIconProps = StyledProps<ButtonProps, 'styleType'>
type ApplyButtonColor = (theme: Theme, styleType: ButtonStyleType) => string
type ApplyButtonSizeStyle = (
  theme: Theme,
  styleType: ButtonStyleType,
  size: ButtonSize,
  width: string
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
  ghost: 'grayScale50',
  outline: 'grayScale90',
  outlineDisabled: 'grayScale30',
  solidDisabled: 'white',
  solidPrimary: 'white',
  solidSub: 'grayScale90'
} as const

export const Button = forwardRef(function Button(
  {
    width = '100%',
    size = 'medium',
    styleType = 'solidPrimary',
    icon,
    children,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledButton
      ref={ref}
      size={size}
      styleType={styleType}
      width={width}
      {...props}>
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
  ${({ theme, size, styleType, width }): string =>
    applyButtonSizeStyle(theme, styleType, size, width)}
  ${({ theme, styleType }): string => applyButtonColor(theme, styleType)}
`
const applyButtonSizeStyle: ApplyButtonSizeStyle = (
  theme,
  styleType,
  size,
  width
) => {
  const { round100, round4 } = theme.radius

  switch (size) {
    case 'large':
      return `width: ${width};
              height: 64px;`
    case 'medium':
      return `width: ${width};
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
  const { grayScale20, black, grayScale05, white } = theme.colors
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
      return `background-color: ${grayScale20};`
    case SOLID_PRIMARY:
      return `background-color: ${black};`
    case SOLID_SUB:
      return `background-color: ${grayScale05};`
    case OUTLINE:
      return `background-color: ${white};
              border: 1px solid ${grayScale20};`
    case OUTLINE_DISABLED:
      return `background-color: ${white};
              border: 1px solid ${grayScale20};`
    case GHOST:
      return `background-color: transparent;`
    default:
      return ``
  }
}

const applyButtonFontColor: ApplyButtonColor = (theme, styleType) =>
  theme.colors[FONT_COLOR[styleType]]
