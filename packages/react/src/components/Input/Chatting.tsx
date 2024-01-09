import styled from '@emotion/styled'
import { IconButton } from '@offer-ui/components/IconButton'
import type { StyledProps } from '@offer-ui/types'
import type { ChangeEventHandler, ForwardedRef } from 'react'
import { forwardRef, useState } from 'react'
import { isSmallSize, type InputProps } from './index'

export type ChattingInputProps = InputProps
type StyledInputProps = { isSmall: boolean }
type StyledIconButtonProps = StyledInputProps & {
  disabled: boolean
}
type StyledInputFormProps = StyledProps<ChattingInputProps, 'width'>

export const Chatting = forwardRef(function Chatting(
  {
    onChange,
    width = '100%',
    inputSize = 'small',
    ...props
  }: ChattingInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [inputValue, setInputValue] = useState<string>('')
  const isDisabled = !inputValue
  const isSmall = isSmallSize(inputSize)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange?.(e)
    setInputValue(e.currentTarget.value)
  }

  return (
    <StyledInputForm width={width}>
      <StyledInput
        ref={ref}
        isSmall={isSmall}
        onChange={handleChange}
        {...props}
      />
      <StyledIconButton
        color="white"
        disabled={isDisabled}
        icon="arrowUp"
        isSmall={isSmall}
        size={16}
      />
    </StyledInputForm>
  )
})

const StyledInputForm = styled.form<StyledInputFormProps>`
  display: inline-flex;
  position: relative;
  width: ${({ width }): string => width};
`

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: none;

  ${({ theme, isSmall }): string => `
    background-color: ${theme.colors.bgGray02};
    border-radius: ${theme.radius.round16};
     ${theme.fonts[isSmall ? 'body02R' : 'body01R']}

    &::placeholder {
      color: ${theme.colors.grayScale50};
    }

    &:hover {
      background-color: ${theme.colors.bgGray04};
    }

    &:focus {
      background-color: ${theme.colors.bgGray04};
    }
  `}

  ${({ isSmall }): string => {
    if (isSmall) {
      return `
        height: 40px;
        padding: 10px 52px 10px 12px;
      `
    }
    return `
      height: 48px;
      padding: 12px 60px 12px 20px;
    `
  }}
`

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;

  ${({ theme, disabled }): string => `
    background-color: ${
      disabled ? theme.colors.brandPrimaryWeak : theme.colors.brandPrimary
    };
    border-radius: ${theme.radius.round100};
  `}

  ${({ isSmall }): string => {
    if (isSmall) {
      return `
        right: 8px;
        top: 4px;
      `
    }

    return `
      right: 10px;
      top: 8px;
    `
  }}


  &:disabled {
    cursor: default;
  }
`
