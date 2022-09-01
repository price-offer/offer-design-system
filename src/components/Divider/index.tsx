import type { ReactElement } from 'react'
import styled from '@emotion/styled'

export interface DividerProps {
  orientation?: 'vertical' | 'horizontal'
  size?: 'bold' | 'regular'
}
type StyledDividerProps = Pick<DividerProps, 'orientation'>

export const Divider = ({
  orientation = 'horizontal',
  size = 'regular'
}: DividerProps): ReactElement => {
  return (
    <StyledDividerWrapper orientation={orientation}>
      <StyledDivider orientation={orientation} size={size} />
    </StyledDividerWrapper>
  )
}

const StyledDividerWrapper = styled.div<StyledDividerProps>`
  display: ${({ orientation }): string =>
    orientation === 'horizontal' ? 'block' : 'inline-block'};
`
const StyledDivider = styled.hr<DividerProps>`
  margin: 0;
  padding: 0;
  border: none;
  width: 100%;
  display: ${({ orientation }): string =>
    orientation === 'horizontal' ? 'block' : 'inline'};
  border: ${({ theme, size }): string => {
    const { border, colors } = theme

    switch (size) {
      case 'bold':
        return `${border.bold} solid ${colors.grayScale.gray05}`
      case 'regular':
        return `${border.regular} solid ${colors.grayScale.gray10}`
      default:
        return ''
    }
  }};
`
