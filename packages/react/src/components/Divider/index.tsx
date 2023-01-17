import type { ForwardedRef, HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import styled from '@emotion/styled'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Divider 컴포넌트의 방향을 정합니다.
   * @type 'vertical' | 'horizontal' | undefined
   */
  direction?: 'vertical' | 'horizontal'
  /** Divider 컴포넌트의 두께를 정합니다.
   * @type 'bold' | 'regular'
   */
  size?: 'bold' | 'regular'
}
type StyledDividerProps = Pick<DividerProps, 'direction'>

export const Divider = forwardRef(function Divider(
  { direction = 'horizontal', size = 'regular', ...props }: DividerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledDividerWrapper ref={ref} direction={direction} {...props}>
      <StyledDivider direction={direction} size={size} />
    </StyledDividerWrapper>
  )
})

const StyledDividerWrapper = styled.div<StyledDividerProps>`
  display: ${({ direction }): string =>
    direction === 'horizontal' ? 'block' : 'inline-block'};
`
const StyledDivider = styled.hr<DividerProps>`
  margin: 0;
  padding: 0;
  width: 100%;
  display: ${({ direction }): string =>
    direction === 'horizontal' ? 'block' : 'inline'};
  border: ${({ theme, size }): string => {
    const { border, colors } = theme

    switch (size) {
      case 'bold':
        return `${border.bold} solid ${colors.gsGray05}`
      case 'regular':
        return `${border.regular} solid ${colors.gsGray10}`
      default:
        return 'none'
    }
  }};
`
