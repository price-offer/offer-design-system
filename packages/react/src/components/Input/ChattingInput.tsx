import type { ChangeEventHandler, ForwardedRef } from 'react'
import { forwardRef, useState } from 'react'
import { IconButton } from '@offer-ui/components/IconButton'
import type { MainInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'

type ChattingInputProps = Omit<
  MainInputProps,
  'label' | 'status' | 'message' | 'isPrice'
>

type StyledInputProps = StyledProps<ChattingInputProps, 'isSmall'>
type StyledIconButtonProps = StyledInputProps & {
  disabled: boolean
}

export const ChattingInput = forwardRef(function ChattingInput(
  { isSmall, onChange, ...props }: ChattingInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [inputValue, setInputValue] = useState<string>('')
  const isDisabled = !inputValue

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange?.(e)
    setInputValue(e.currentTarget.value)
  }

  return (
    <StyledInputForm>
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

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`

const StyledInput = styled.input<StyledInputProps>`
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
        width: 328px;
        height: 40px;
        padding: 10px 52px 10px 12px;
      `
    }
    return `
      width: 639px;
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
