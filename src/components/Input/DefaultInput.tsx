import type {
  InputProps as DefaultInputProps,
  InputStyleOption,
  InputStylesheet
} from './index'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

type DefaultSTyleOption = 'FONT' | 'HEIGHT' | 'PADDING_BOTTOM'
type DefaultStylesheet = InputStyleOption<DefaultSTyleOption>

interface StyledPriceUnitProps {
  inputStylesheet: DefaultStylesheet
}
type StyledInputProps = StyledProps<DefaultInputProps, 'isPrice'> &
  StyledPriceUnitProps
type StyledStatusProps = StyledProps<DefaultInputProps, 'status'>

const DEFUALT_STYLESHEET: InputStylesheet<DefaultStylesheet> = {
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
} as const

export const DefaultInput = ({
  label,
  status = 'default',
  message = '',
  isPrice = false,
  inputSize = 'large',
  ...args
}: DefaultInputProps): ReactElement => {
  const hasMessage = status !== 'none'
  const inputStylesheet = DEFUALT_STYLESHEET[inputSize]

  return (
    <StyledWrapper>
      <StyledLabel>
        {label}
        <StyledInput
          inputStylesheet={inputStylesheet}
          isPrice={isPrice}
          {...args}
        />
        <StyledPriceUnit inputStylesheet={inputStylesheet}>
          {isPrice && '원'}
        </StyledPriceUnit>
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
  padding: ${({ inputStylesheet, isPrice }): string => `
      ${inputStylesheet['PADDING_BOTTOM']}px 
      ${isPrice ? 35 : 12}px 
      ${inputStylesheet['PADDING_BOTTOM']}px 12px
    `};
  width: 328px;
  height: ${({ inputStylesheet }): string => `${inputStylesheet['HEIGHT']}px`};
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;

  ${({ theme, inputStylesheet }): string =>
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

const StyledPriceUnit = styled.span<StyledPriceUnitProps>`
  position: absolute;
  bottom: ${({ inputStylesheet }): string =>
    `${(inputStylesheet['PADDING_BOTTOM'] as number) + 9}px`};
  right: 12px;
  ${({ theme, inputStylesheet }): string =>
    theme.fonts[inputStylesheet['FONT']]}
  color:${({ theme }): string => theme.colors.grayScale.gray90};
`
const StyledStatus = styled.span<StyledStatusProps>`
  color: ${({ theme, status }): string => {
    const hasStatus = status === 'error' || status === 'success'

    if (!hasStatus) {
      return theme.colors.grayScale.gray50
    }

    return theme.colors.action[status]
  }};

  ${({ theme }): string => theme.fonts.caption01M};
`
