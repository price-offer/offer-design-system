import type { ChangeEventHandler, HTMLAttributes, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useState } from 'react'

type InputSize = 'large' | 'small'
interface ChattingInputProps extends HTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
}

type InputStyleOption =
  | 'WIDTH'
  | 'RIGHT'
  | 'TOP'
  | 'BUTTON_RIGHT'
  | 'HEIGHT'
  | 'BUTTON_TOP'
  | 'FONT'
type InputStyleValue = number | string
type StyledFontOption = {
  [key in Extract<InputStyleOption, 'FONT'>]: string
}
type StyledOption = {
  [key in Exclude<InputStyleOption, 'FONT'>]: number
}
type InputSizeStylesheet = {
  [key in InputSize]: StyledInputOption
}

type StyledInputOption = StyledFontOption & StyledOption
type StyledInputProps = StyledProps<ChattingInputProps, 'inputSize'>

const INPUT_SIZE_STYLESHEET: InputSizeStylesheet = {
  large: {
    BUTTON_RIGHT: 10,
    BUTTON_TOP: 8,
    FONT: 'body01R',
    HEIGHT: 48,
    RIGHT: 20,
    TOP: 12,
    WIDTH: 639
  },
  small: {
    BUTTON_RIGHT: 8,
    BUTTON_TOP: 4,
    FONT: 'body02R',
    HEIGHT: 40,
    RIGHT: 12,
    TOP: 10,
    WIDTH: 328
  }
} as const

export const ChattingInput = ({
  inputSize = 'large',
  onChange,
  ...props
}: ChattingInputProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('')
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange && onChange(e)
    setInputValue(e.currentTarget.value)
  }

  return (
    <StyledInputForm>
      <StyledInput inputSize={inputSize} onChange={handleChange} {...props} />
      <StyledInputButton disabled={!inputValue} inputSize={inputSize}>
        <img src={ICON.ARROW_UP_24} />
      </StyledInputButton>
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`

const StyledInput = styled.input<StyledInputProps>`
  width: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'WIDTH')}px`};
  height: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'HEIGHT')}px`};
  padding: ${({ inputSize }): string => `
        ${getStylesheetValue(inputSize, 'TOP')}px 
        ${(getStylesheetValue(inputSize, 'RIGHT') as number) + 40}px 
        ${getStylesheetValue(inputSize, 'TOP')}px 
        ${getStylesheetValue(inputSize, 'RIGHT')}px 
    `};
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;
  border-radius: ${({ theme }): string => theme.radius.round16};

  ${({ theme, inputSize }): string =>
    theme.fonts[getStylesheetValue(inputSize, 'FONT')]}

  &::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
  }

  &:hover {
    background-color: ${({ theme }): string => theme.colors.background.gray04};
  }

  &:focus {
    background-color: ${({ theme }): string => theme.colors.background.gray04};
  }
`

const StyledInputButton = styled.button<StyledInputProps>`
  position: absolute;
  right: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'BUTTON_RIGHT')}px`};
  top: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'BUTTON_TOP')}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }): string => theme.colors.brand.primary};
  border: none;
  border-radius: ${({ theme }): string => theme.radius.round100};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }): string => theme.colors.brand.primaryWeak};
  }

  img {
    filter: ${({ theme }): string =>
      hexToCSSFilter(theme.colors.grayScale.white).filter};
  }
`

const getStylesheetValue = (
  inputSize: InputSize,
  styleOption: InputStyleOption
): InputStyleValue => INPUT_SIZE_STYLESHEET[inputSize][styleOption]
