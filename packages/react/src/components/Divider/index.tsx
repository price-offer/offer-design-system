import type { ForwardedRef, HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types/offer'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider 컴포넌트의 방향을 정합니다.
   * @type 'vertical' | 'horizontal' | undefined
   */
  direction?: 'vertical' | 'horizontal'
  /** Divider 컴포넌트의 두께를 정합니다.
   * @type 'bold' | 'regular'
   */
  size?: 'bold' | 'regular'
  /** Divider 컴포넌트의 띄울 값을 정합니다.
   * @type 'number' | 'undefined'
   */
  gap?: number
  /** Divider 컴포넌트의 길이를 정합니다.
   * @type 'string' | 'undefined'
   */
  length?: string
}
type StyledDividerProps = StyledProps<
  DividerProps,
  'direction' | 'size' | 'length' | 'gap'
>

export const Divider = forwardRef(function Divider(
  {
    direction = 'horizontal',
    size = 'regular',
    gap = 0,
    length = '',
    ...props
  }: DividerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledDivider
      ref={ref}
      direction={direction}
      gap={gap}
      length={length}
      size={size}
      {...props}
    />
  )
})

const StyledDivider = styled.div<StyledDividerProps>`
  ${({ direction, size, theme, gap, length }): string =>
    direction === 'vertical'
      ? `
        display: inline-block;
        width: ${theme.border[size]};
        height: ${length || '14px'};
        margin: 0 ${gap}px;
      `
      : `
        width: ${length || '100%'};
        height: ${theme.border[size]};
        margin: ${gap}px 0;
      `}

  background-color:${({ size, theme }): string =>
    size === 'bold' ? theme.colors.grayScale05 : theme.colors.grayScale10}
`
