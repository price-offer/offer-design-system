import type { ButtonHTMLAttributes, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Icon } from '@offer-ui/components/Icon'
import type { IconType } from '@offer-ui/components/Icon'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { theme } from '@offer-ui/themes'
import type { ThemeKeys } from '@offer-ui/themes'

export type IconButtonColorType = ThemeKeys['color']

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * IconButton으로 사용될 아이콘의 타입을 정합니다.
   * @type IconType
   */
  icon: IconType
  /**
   * IconButton의 크기를 정합니다.
   * @type 'number' | undefined
   */
  size?: number
  /**
   * IconButton의 색상 타입을 정합니다.
   * @type ColorKeys | undefined
   */
  color?: ThemeKeys['color']
  /**
   * IconButton가 그림자 여부를 정합니다.
   * @type boolean | undefined
   */
  hasShadow?: boolean
  /**
   * IconButton의 모양을 지정합니다.
   * @type 'rounded' | 'square' | 'ghost' | undefined
   */
}

type StyledIconButtonProps = StyledProps<IconButtonProps, 'hasShadow'>

export const IconButton = forwardRef(function IconButton(
  {
    color = 'black',
    size = 16,
    hasShadow = false,
    icon,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledIconButton {...props} ref={ref} hasShadow={hasShadow}>
      <Icon color={color} size={size} type={icon} />
    </StyledIconButton>
  )
})

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;

  ${({ hasShadow }): string => {
    return `
  
      background-color: transparent;
      box-shadow: ${
        hasShadow ? `0px 2px 10px ${theme.colors.dimOpacity25}` : 'none'
      };
    `
  }}
`
