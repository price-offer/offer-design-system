import type { ReactElement, ReactNode } from 'react'
import { SelectContext, SelectStyleContext } from './index'
import styled from '@emotion/styled'
import type { StyledSelectProps } from '../index'
import { useContext } from 'react'

interface OptionListProps {
  children: ReactNode
}

export const OptionList = ({ children }: OptionListProps): ReactElement => {
  const { isOpen } = useContext(SelectContext)
  const { size } = useContext(SelectStyleContext)

  return (
    <>
      {isOpen && (
        <StyledOptionListWrapper size={size}>
          <StyledOptionList>{children}</StyledOptionList>
        </StyledOptionListWrapper>
      )}
    </>
  )
}

const StyledOptionListWrapper = styled.div<Pick<StyledSelectProps, 'size'>>`
  position: absolute;
  left: 0;
  top: ${({ size }): string => `${size === 'small' ? '40px' : '48px'}`};
`
const StyledOptionList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px 4px;
  gap: 8px;
  user-select: none;
  min-width: 120px;
  border-radius: 4px;
  ${({ theme }): string => `
    background-color: ${theme.colors.grayScale.white};
    border: 1px solid ${theme.colors.grayScale.gray10};

    ${theme.mediaQuery.desktop} {
      font-size: 12px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    }

    ${theme.mediaQuery.tablet} {
      font-size: 14px;
      box-shadow: none;
    }
  `}
`
