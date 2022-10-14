import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal'
  size?: 'bold' | 'regular'
}
type StyledDividerProps = Pick<DividerProps, 'direction'>

export const Divider = ({
  direction = 'horizontal',
  size = 'regular',
  ...props
}: DividerProps): ReactElement => {
  return (
    <StyledDividerWrapper direction={direction} {...props}>
      <StyledDivider direction={direction} size={size} />
    </StyledDividerWrapper>
  )
}

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
        return `${border.bold} solid ${colors.grayScale.gray05}`
      case 'regular':
        return `${border.regular} solid ${colors.grayScale.gray10}`
      default:
        return 'none'
    }
  }};
`