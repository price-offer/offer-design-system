import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type InputSize = 'small' | 'large'
export interface EditInputProps extends HTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize
  label?: string
  message?: string
  status?: 'none' | 'success' | 'error' | 'default'
}

type InputStyleOption = 'WIDTH' | 'HEIGHT' | 'FONT' | 'WON_BOTTOM'
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
type StyledMessageProps = StyledProps<EditInputProps, 'status'>

const INPUT_SIZE_STYLESHEET: InputSizeStylesheet = {
  large: {
    FONT: 'display02M',
    HEIGHT: 36,
    WIDTH: 714,
    WON_BOTTOM: 16
  },
  small: {
    FONT: 'body01R',
    HEIGHT: 32,
    WIDTH: 360,
    WON_BOTTOM: 14
  }
}

export const EditInput = ({
  inputSize = 'large',
  label = '',
  message = '',
  status = 'default',
  ...props
}: EditInputProps): ReactElement => {
  const hasMessage = status !== 'none'
  return (
    <StyledInputForm>
      <StyledInputLabel>
        {label}
        <StyledInput inputSize={inputSize} {...props} />
        <StyledInputWon inputSize={inputSize}>원</StyledInputWon>
      </StyledInputLabel>
      {hasMessage && (
        <StyledInputMessage status={status}>{message}</StyledInputMessage>
      )}
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
  padding: 8px 20px 8px 0;
  margin-bottom: 8px;
  border: none;
  border-bottom: ${({ theme }): string =>
    `1px solid ${theme.colors.grayScale.black}`};

  ${({ inputSize, theme }): string =>
    theme.fonts[getStylesheetValue(inputSize, 'FONT')]}

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
  }
`

const StyledInputWon = styled.span<StyledInputProps>`
  position: absolute;
  bottom: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'WON_BOTTOM')}px`};
  right: 0;
  color: ${({ theme }): string => theme.colors.grayScale.gray90};

  ${({ theme }): string => theme.fonts.subtitle01M}
`

const StyledInputMessage = styled.span<StyledMessageProps>`
  color: ${({ theme, status }): string => {
    const hasStatus = status === 'error' || status === 'success'

    if (!hasStatus) {
      return theme.colors.grayScale.gray50
    }

    return theme.colors.action[status]
  }};

  ${({ theme }): string => theme.fonts.caption01M}
`

const getStylesheetValue = (
  inputSize: InputSize,
  styleOption: InputStyleOption
): StylesheetValue => INPUT_SIZE_STYLESHEET[inputSize][styleOption]
