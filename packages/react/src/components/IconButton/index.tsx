import styled from '@emotion/styled'
import type { ButtonHTMLAttributes, ForwardedRef } from 'react'
import { forwardRef } from 'react'
import type { ColorKeys } from '../../styles/themes'
import type { StyledProps } from '../../types'
import type { IconType } from '../Icon'
import { Icon } from '../Icon'

export type IconButtonColorType = ColorKeys

export type IconButtonProps = {
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
  color?: ColorKeys
  /**
   * IconButton가 그림자 여부를 정합니다.
   * @type boolean | undefined
   */
  hasShadow?: boolean
  /**
   * IconButton의 모양을 지정합니다.
   * @type 'rounded' | 'square' | 'ghost' | undefined
   */
} & ButtonHTMLAttributes<HTMLButtonElement>

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

  ${({ theme, hasShadow }): string => {
    return `
  
      background-color: transparent;
      box-shadow: ${
        hasShadow ? `0px 2px 10px ${theme.colors.dimOpacity25}` : 'none'
      };
    `
  }}
`
