import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type InputSize = 'large' | 'small'
export interface DefaultInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string
  status?: 'none' | 'success' | 'error' | 'default'
  message?: string
  hasWon?: boolean
  inputSize?: InputSize
}

type StyledInputProps = StyledProps<DefaultInputProps, 'hasWon' | 'inputSize'>
type StyledStatusProps = StyledProps<DefaultInputProps, 'status'>
type StyledWonProps = StyledProps<DefaultInputProps, 'inputSize'>
type InputStyleOption = 'FONT' | 'HEIGHT' | 'PADDING_BOTTOM'
type StylesheetValue = string | number
type InputSizeStylesheet = {
  [key in InputSize]: { [key in InputStyleOption]: StylesheetValue }
}

const INPUT_SIZE_STYLESHEET: InputSizeStylesheet = {
  large: {
    FONT: 'subtitle01M',
    HEIGHT: 54,
    PADDING_BOTTOM: 16
  },
  small: {
    FONT: 'body02M',
    HEIGHT: 40,
    PADDING_BOTTOM: 10
  }
}

export const DefaultInput = ({
  label,
  status = 'default',
  message,
  hasWon = false,
  inputSize = 'large',
  ...args
}: DefaultInputProps): ReactElement => {
  const hasMessage = status !== 'none'

  return (
    <StyledWrapper>
      <StyledLabel>
        {label}
        <StyledInput hasWon={hasWon} inputSize={inputSize} {...args} />
        <StyledWon inputSize={inputSize}>{hasWon && '원'}</StyledWon>
      </StyledLabel>
      {hasMessage && <StyledStatus status={status}>{message}</StyledStatus>}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  color: ${({ theme }): string => theme.colors.grayScale.gray70};

  ${({ theme }): string => theme.fonts.body01M};
`
const StyledInput = styled.input<StyledInputProps>`
  margin: 8px 0;
  padding: ${({ inputSize, hasWon }): string => `
      ${getStylesheetValue(inputSize, 'PADDING_BOTTOM')}px 
      ${hasWon ? 35 : 12}px 
      ${getStylesheetValue(inputSize, 'PADDING_BOTTOM')}px 12px
    `};
  width: 328px;
  height: ${({ inputSize }): string =>
    `${getStylesheetValue(inputSize, 'HEIGHT')}px`};
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;

  &::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};

    ${({ theme, inputSize }): string =>
      theme.fonts[getStylesheetValue(inputSize, 'FONT')]}
  }
`

const StyledWon = styled.span<StyledWonProps>`
  position: absolute;
  bottom: ${({ inputSize }): string =>
    `${(getStylesheetValue(inputSize, 'PADDING_BOTTOM') as number) + 8}px`};
  right: 12px;
  ${({ theme, inputSize }): string =>
    theme.fonts[getStylesheetValue(inputSize, 'FONT')]}
`
const StyledStatus = styled.span<StyledStatusProps>`
  color: ${({ theme, status }): string => {
    const hasStatus = 'error' || 'success'

    switch (status) {
      case hasStatus:
        return theme.colors.action[status]
      default:
        return theme.colors.grayScale.gray50
    }
  }};

  ${({ theme }): string => theme.fonts.caption};
`

const getStylesheetValue = (
  inputSize: InputSize,
  styleOption: InputStyleOption
): StylesheetValue => INPUT_SIZE_STYLESHEET[inputSize][styleOption]
