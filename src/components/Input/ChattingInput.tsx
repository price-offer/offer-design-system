import type { ChangeEventHandler, ReactElement } from 'react'
import type { InputProps, InputStyleOption, InputStylesheet } from './index'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import { useState } from 'react'

type ChattingInputProps = Omit<
  InputProps,
  'label' | 'status' | 'message' | 'isPrice'
>

type ChattingStyleOption =
  | 'WIDTH'
  | 'RIGHT'
  | 'TOP'
  | 'BUTTON_RIGHT'
  | 'HEIGHT'
  | 'BUTTON_TOP'
  | 'FONT'
type ChattingStylesheet = InputStyleOption<ChattingStyleOption>

interface StyledInputProps {
  inputStylesheet: ChattingStylesheet
}

const CHATTING_STYLESHEET: InputStylesheet<ChattingStylesheet> = {
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
}

export const ChattingInput = ({
  inputSize = 'large',
  onChange,
  ...props
}: ChattingInputProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('')
  const inputStylesheet = CHATTING_STYLESHEET[inputSize]

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange && onChange(e)
    setInputValue(e.currentTarget.value)
  }

  return (
    <StyledInputForm>
      <StyledInput
        inputStylesheet={inputStylesheet}
        onChange={handleChange}
        {...props}
      />
      <StyledInputButton
        disabled={!inputValue}
        inputStylesheet={inputStylesheet}>
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
  width: ${({ inputStylesheet }): string => `${inputStylesheet['WIDTH']}px`};
  height: ${({ inputStylesheet }): string => `${inputStylesheet['HEIGHT']}px`};
  padding: ${({ inputStylesheet }): string => `
        ${inputStylesheet['FONT']}px 
        ${inputStylesheet['RIGHT'] + 40}px 
        ${inputStylesheet['TOP']}px 
        ${inputStylesheet['RIGHT']}px 
    `};
  background-color: ${({ theme }): string => theme.colors.background.gray02};
  border: none;
  border-radius: ${({ theme }): string => theme.radius.round16};

  ${({ theme, inputStylesheet }): string =>
    theme.fonts[inputStylesheet['FONT']]}

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
  right: ${({ inputStylesheet }): string =>
    `${inputStylesheet['BUTTON_RIGHT']}px`};
  top: ${({ inputStylesheet }): string => `${inputStylesheet['BUTTON_TOP']}px`};
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
