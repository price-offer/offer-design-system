import type { HTMLAttributes, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type InputSize = 'small' | 'large'
interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
}
type StyledInputProps = StyledProps<SearchInputProps, 'inputSize'>
type InputStyleOption = 'WIDTH' | 'HEIGHT' | 'PADDING_TOP' | 'FONT'
type StylesheetValue = string | number
type InputSizeStylesheet = {
  [key in InputSize]: {
    [key in InputStyleOption]: StylesheetValue
  }
}

const INPUT_SIZE_STYLESHEET: InputSizeStylesheet = {
  large: {
    FONT: 'body01R',
    HEIGHT: 56,
    PADDING_TOP: 18,
    WIDTH: 360
  },
  small: {
    FONT: 'body02R',
    HEIGHT: 40,
    PADDING_TOP: 10,
    WIDTH: 328
  }
}

export const SearchInput = ({
  inputSize = 'large',
  ...props
}: SearchInputProps): ReactElement => {
  return (
    <StyledInputForm>
      <StyledInputIcon inputSize={inputSize} src={ICON.SEARCH_24} />
      <StyledInput inputSize={inputSize} {...props} />
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`
const StyledInput = styled.input<StyledInputProps>`
  padding: ${({ inputSize }): string => `
        ${getStylesheetValue(inputSize, 'PADDING_TOP')}px 12px 
        ${getStylesheetValue(inputSize, 'PADDING_TOP')}px 43px
    `};
  width: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'WIDTH')}px`};
  height: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'HEIGHT')}px`};
  color: ${({ theme }): string => theme.colors.grayScale.gray90};
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;
  ${({ inputSize, theme }): string =>
    theme.fonts[getStylesheetValue(inputSize, 'FONT')]}

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
  }
`

const StyledInputIcon = styled.img<StyledInputProps>`
  top: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'PADDING_TOP')}px`};
  left: 12px;
  position: absolute;
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray50).filter};
`

const getStylesheetValue = (
  inputSize: InputSize,
  styleOption: InputStyleOption
): StylesheetValue => INPUT_SIZE_STYLESHEET[inputSize][styleOption]
