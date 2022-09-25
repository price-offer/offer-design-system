import type { SelectBoxOption, StyledSelectProps } from '../index'
import type { ReactElement } from 'react'
import { SelectContext } from './index'
import styled from '@emotion/styled'
import { useContext } from 'react'

type HandleChangeValue = (item: SelectBoxOption) => void

export const Options = (): ReactElement => {
  const { setValue, options, value } = useContext(SelectContext)

  const handleChangeValue: HandleChangeValue = item => {
    setValue?.(item)
  }

  return (
    <>
      {options?.map(item => (
        <StyledOptionsWrapper
          key={item.value}
          isSelected={value === item.value}
          onClick={(): void => {
            handleChangeValue(item)
          }}>
          <StyledOption>{item.text}</StyledOption>
        </StyledOptionsWrapper>
      ))}
    </>
  )
}

const StyledOptionsWrapper = styled.li<Pick<StyledSelectProps, 'isSelected'>>`
  ${({ theme, isSelected }): string => `
    :hover {
      background-color: ${theme.colors.background.gray02};
      cursor: pointer;
    };

    background-color: ${isSelected ? theme.colors.background.gray02 : ''};
  `}
`
const StyledOption = styled.span`
  display: block;
  padding: 8px 4px;
  cursor: pointer;
`
