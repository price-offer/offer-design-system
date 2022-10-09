import { colors } from '@themes'
import { Icon } from '@components'
import type { MainInputProps } from './index'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type SearchInputProps = Omit<
  MainInputProps,
  'label' | 'status' | 'message' | 'isPrice'
>
type StyledInputProps = StyledProps<SearchInputProps, 'isSmall'>

export const SearchInput = ({
  isSmall,
  ...props
}: SearchInputProps): ReactElement => {
  return (
    <StyledInputForm>
      <StyledIcon
        color={colors.grayScale.gray50}
        isSmall={isSmall}
        type="search"
      />
      <StyledInput isSmall={isSmall} {...props} />
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`
const StyledInput = styled.input<StyledInputProps>`
  border: none;

  ${({ isSmall, theme }): string => `
    background-color: ${theme.colors.background.gray02};
    ${theme.fonts[isSmall ? 'body02R' : 'body01R']}

    ::placeholder {
        color: ${theme.colors.grayScale.gray50};
    }

    &:hover {
      background-color: ${theme.colors.background.gray04};
    }

    &:focus {
      background-color: ${theme.colors.background.gray04};
    }
  `}

  ${({ isSmall }): string => {
    if (isSmall) {
      return `
      padding: 10px 12px 10px 43px;
      width: 328px;
      height: 40px;
    `
    }
    return `
      padding: 18px 12px 18px 43px;
      width: 360px;
      height: 56px;
    `
  }}
`

const StyledIcon = styled(Icon)<StyledInputProps>`
  top: ${({ isSmall }): string => (isSmall ? '7px' : '15px')};
  left: 12px;
  position: absolute;
`
