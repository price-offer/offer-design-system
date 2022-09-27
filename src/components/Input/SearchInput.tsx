import type { InputProps, InputStyleOption, InputStylesheet } from './index'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'

type SearchInputProps = Omit<
  InputProps,
  'label' | 'status' | 'message' | 'isPrice'
>

type SearchStyleOption =
  | 'WIDTH'
  | 'HEIGHT'
  | 'PADDING_TOP'
  | 'FONT'
  | 'ICON_TOP'
type SearchStylesheet = InputStyleOption<SearchStyleOption>

interface StyledInputProps {
  inputStylesheet: SearchStylesheet
}
const SEARCH_STYLESHEET: InputStylesheet<SearchStylesheet> = {
  large: {
    FONT: 'body01R',
    HEIGHT: 56,
    ICON_TOP: 15,
    PADDING_TOP: 18,
    WIDTH: 360
  },
  small: {
    FONT: 'body02R',
    HEIGHT: 40,
    ICON_TOP: 7,
    PADDING_TOP: 10,
    WIDTH: 328
  }
} as const

export const SearchInput = ({
  inputSize = 'large',
  ...props
}: SearchInputProps): ReactElement => {
  const InputStylesheet = SEARCH_STYLESHEET[inputSize]

  return (
    <StyledInputForm>
      <StyledInputIcon inputStylesheet={InputStylesheet} src={ICON.SEARCH_24} />
      <StyledInput inputStylesheet={InputStylesheet} {...props} />
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`
const StyledInput = styled.input<StyledInputProps>`
  padding: ${({ inputStylesheet }): string => `
        ${inputStylesheet['PADDING_TOP']}px 12px 
        ${inputStylesheet['PADDING_TOP']}px 43px
    `};
  width: ${({ inputStylesheet }): string => `${inputStylesheet['WIDTH']}px`};
  height: ${({ inputStylesheet }): string => `${inputStylesheet['HEIGHT']}px`};
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;
  ${({ inputStylesheet, theme }): string =>
    theme.fonts[inputStylesheet['FONT']]}

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
  }

  &:hover {
    background-color: ${({ theme }): string => theme.colors.background.gray04};
  }

  &:focus {
    background-color: ${({ theme }): string => theme.colors.background.gray04};
  }
`

const StyledInputIcon = styled.img<StyledInputProps>`
  top: ${({ inputStylesheet }): string => `${inputStylesheet['ICON_TOP']}px`};
  left: 12px;
  position: absolute;
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray50).filter};
`
