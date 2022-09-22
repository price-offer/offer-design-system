import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type InputSize = 'small' | 'large'
export interface EditInputProps extends HTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
  label?: string
  message?: string
}

type InputStyleOption = 'WIDTH' | 'HEIGHT' | 'FONT'
type StyledFontOption = {
  [key in Extract<InputStyleOption, 'FONT'>]: string
}
type StyledOption = {
  [key in Exclude<InputStyleOption, 'FONT'>]: number
}
type StyledInputOption = StyledFontOption & StyledOption
type InputSizeStylesheet = {
  [key in InputSize]: StyledInputOption
}

type StylesheetValue = number | string
type StyledInputProps = StyledProps<EditInputProps, 'inputSize'>

const INPUT_SIZE_STYLESHEET: InputSizeStylesheet = {
  large: {
    FONT: 'display02M',
    HEIGHT: 36,
    WIDTH: 714
  },
  small: {
    FONT: 'body01R',
    HEIGHT: 32,
    WIDTH: 360
  }
}

export const EditInput = ({
  inputSize = 'large',
  label = '',
  message = '',
  ...props
}: EditInputProps): ReactElement => {
  return (
    <StyledInputForm>
      <StyledInputLabel>
        {label}
        <StyledInput inputSize={inputSize} {...props} />
        <StyledInputWon>원</StyledInputWon>
      </StyledInputLabel>
      <StyledInputMessage>{message}</StyledInputMessage>
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  flex-direction: column;
`
const StyledInputLabel = styled.label`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  color: ${({ theme }): string => theme.colors.grayScale.gray70};

  ${({ theme }): string => theme.fonts.body01M}
`
const StyledInput = styled.input<StyledInputProps>`
  width: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'WIDTH')}px`};
  height: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'HEIGHT')}px`};
  padding: 0 20px 8px 0;
  margin: 8px 0;
  border: none;
  border-bottom: ${({ theme }): string =>
    `1px solid ${theme.colors.grayScale.black}`};

  ${({ inputSize, theme }): string =>
    theme.fonts[getStylesheetValue(inputSize, 'FONT')]}

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
  }
`

const StyledInputWon = styled.span`
  position: absolute;
  bottom: 16px;
  right: 0;

  ${({ theme }): string => theme.fonts.subtitle01M}
`

const StyledInputMessage = styled.span`
  color: ${({ theme }): string => theme.colors.grayScale.gray50};

  ${({ theme }): string => theme.fonts.caption}
`

const getStylesheetValue = (
  inputSize: InputSize,
  styleOption: InputStyleOption
): StylesheetValue => INPUT_SIZE_STYLESHEET[inputSize][styleOption]
