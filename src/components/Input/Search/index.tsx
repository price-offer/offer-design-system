import type { HTMLAttributes, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type InputSize = 'small' | 'large'
interface SearchInputProps extends HTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
}

type InputStyleOption = 'WIDTH' | 'HEIGHT' | 'PADDING_TOP' | 'FONT' | 'ICON_TOP'
type StylesheetValue = string | number
type StyledFontOption = {
  [key in Extract<InputStyleOption, 'FONT'>]: string
}
type StyledOption = {
  [key in Exclude<InputStyleOption, 'FONT'>]: number
}
type InputSizeStylesheet = {
  [key in InputSize]: StyledInputOption
}

type StyledInputProps = StyledProps<SearchInputProps, 'inputSize'>
type StyledInputOption = StyledFontOption & StyledOption

const INPUT_STYLESHEET: InputSizeStylesheet = {
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
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;
  ${({ inputSize, theme }): string =>
    theme.fonts[getStylesheetValue(inputSize, 'FONT')]}

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
  top: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'ICON_TOP')}px`};
  left: 12px;
  position: absolute;
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray50).filter};
`

const getStylesheetValue = (
  inputSize: InputSize,
  styleOption: InputStyleOption
): StylesheetValue => INPUT_STYLESHEET[inputSize][styleOption]
