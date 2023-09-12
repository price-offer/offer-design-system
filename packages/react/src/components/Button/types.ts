import type { IconType } from '@offer-ui/components'
import type { StyledProps } from '@offer-ui/types'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export const BUTTON_STYLE_KEYS = {
  GHOST: 'ghost',
  OUTLINE: 'outline',
  SOLID_PRIMARY: 'solidPrimary',
  SOLID_SUB: 'solidSub'
} as const

export type ButtonStyleType =
  typeof BUTTON_STYLE_KEYS[keyof typeof BUTTON_STYLE_KEYS]
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonProps = {
  /**
   * Button의 보여질 형태를 정합니다.
   * @type "ghost" | "outline" | "solidPrimary" | "solidSub" | undefined
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

export type StyledButtonProps = StyledProps<
  ButtonProps,
  'styleType' | 'size' | 'width'
>
export type StyledIconProps = StyledProps<ButtonProps, 'styleType'>
