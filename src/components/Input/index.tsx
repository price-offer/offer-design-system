import type { HTMLAttributes, ReactElement } from 'react'
import { ChattingInput } from './Chatting'
import { DefaultInput } from './Default'
import type { DefaultInputProps } from './Default'
import { SearchInput } from './Search'

type InputStyle = typeof INPUT_STYLE_KEYS[keyof typeof INPUT_STYLE_KEYS]
export interface InputProps
  extends HTMLAttributes<HTMLInputElement>,
    DefaultInputProps {
  inputStyle?: InputStyle
}

export const INPUT_STYLE_KEYS = {
  CHATTING: 'chatting',
  DEFAULT: 'default',
  EDIT: 'edit',
  SEARCH: 'search'
}

export const Input = ({
  inputStyle = 'default',
  ...props
}: InputProps): ReactElement => {
  const renderInput = (inputStyle: InputStyle): ReactElement => {
    switch (inputStyle) {
      case INPUT_STYLE_KEYS.DEFAULT:
        return <DefaultInput {...props} />
      case INPUT_STYLE_KEYS.CHATTING:
        return <ChattingInput {...props} />
      case INPUT_STYLE_KEYS.SEARCH:
        return <SearchInput {...props} />
      default:
        return <DefaultInput {...props} />
    }
  }

  return renderInput(inputStyle)
}
