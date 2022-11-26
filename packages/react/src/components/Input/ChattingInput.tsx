import type { ChangeEventHandler, ReactElement } from 'react'
import { IconButton } from '@components/IconButton'
import type { MainInputProps } from './index'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useState } from 'react'

type ChattingInputProps = Omit<
  MainInputProps,
  'label' | 'status' | 'message' | 'isPrice'
>

type StyledInputProps = StyledProps<ChattingInputProps, 'isSmall'>
type StyledIconButtonProps = StyledInputProps & {
  disabled: boolean
}

export const ChattingInput = ({
  isSmall,
  onChange,
  ...props
}: ChattingInputProps): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('')
  const isDisabled = !inputValue

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    onChange?.(e)
    setInputValue(e.currentTarget.value)
  }

  return (
    <StyledInputForm>
      <StyledInput isSmall={isSmall} onChange={handleChange} {...props} />
      <StyledIconButton
        colorType={isDisabled ? 'primaryWeak' : 'primary'}
        disabled={isDisabled}
        icon="arrowUp"
        isSmall={isSmall}
        shape="rounded"
        size="medium"
      />
    </StyledInputForm>
  )
}

const StyledInputForm = styled.form`
  display: inline-flex;
  position: relative;
`

const StyledInput = styled.input<StyledInputProps>`
  border: none;

  ${({ theme, isSmall }): string => `
    background-color: ${theme.colors.background.gray02};
    border-radius: ${theme.radius.round16};
     ${theme.fonts[isSmall ? 'body02R' : 'body01R']}

    &::placeholder {
      color: ${theme.colors.grayScale.gray50};
    }

    &:hover {
      background-color: ${theme.colors.background.gray04};
    }

    &:focus {
      background-color: ${theme.colors.background.gray04};
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
  border: none;
  cursor: pointer;

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

  ${({ theme }): string => `
    border-radius: ${theme.radius.round100};
  `}

  &:disabled {
    cursor: default;
  }
`
