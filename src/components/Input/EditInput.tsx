import type { InputProps, InputStyleOption, InputStylesheet } from './index'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type EditInputProps = Omit<InputProps, 'isPrice'>

type EditStyleOption = 'WIDTH' | 'HEIGHT' | 'FONT' | 'PRICE_UNIT_BOTTOM'
type EditStylesheet = InputStyleOption<EditStyleOption>

interface StyledInputProps {
  inputStylesheet: EditStylesheet
}
type StyledMessageProps = StyledProps<EditInputProps, 'status'>

const EDIT_STYLESHEET: InputStylesheet<EditStylesheet> = {
  large: {
    FONT: 'display02M',
    HEIGHT: 36,
    PRICE_UNIT_BOTTOM: 16,
    WIDTH: 714
  },
  small: {
    FONT: 'body01R',
    HEIGHT: 32,
    PRICE_UNIT_BOTTOM: 14,
    WIDTH: 360
  }
} as const

export const EditInput = ({
  inputSize = 'large',
  label = '',
  message = '',
  status = 'default',
  ...props
}: EditInputProps): ReactElement => {
  const hasMessage = status !== 'none'
  const inputStylesheet = EDIT_STYLESHEET[inputSize]

  return (
    <StyledInputForm>
      <StyledInputLabel>
        {label}
        <StyledInput inputStylesheet={inputStylesheet} {...props} />
        <StyledPriceUnit inputStylesheet={inputStylesheet}>원</StyledPriceUnit>
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
  width: ${({ inputStylesheet }): string => `${inputStylesheet['WIDTH']}px`};
  height: ${({ inputStylesheet }): string => `${inputStylesheet['HEIGHT']}px`};
  padding: 8px 20px 8px 0;
  margin-bottom: 8px;
  border: none;
  border-bottom: ${({ theme }): string =>
    `1px solid ${theme.colors.grayScale.black}`};

  ${({ inputStylesheet, theme }): string =>
    theme.fonts[inputStylesheet['FONT']]}

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
  }
`

const StyledPriceUnit = styled.span<StyledInputProps>`
  position: absolute;
  bottom: ${({ inputStylesheet }): string =>
    `${inputStylesheet['PRICE_UNIT_BOTTOM']}px`};
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
