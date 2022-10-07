import type { HTMLAttributes, ReactElement } from 'react'
import { ChattingInput } from './ChattingInput'
import { DefaultInput } from './DefaultInput'
import { EditInput } from './EditInput'
import { SearchInput } from './SearchInput'

type InputStyle = typeof INPUT_STYLE_KEYS[keyof typeof INPUT_STYLE_KEYS]
export type InputSize = 'large' | 'small'
export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  inputStyle?: InputStyle
  inputSize?: InputSize
  label?: string
  status?: 'none' | 'success' | 'error' | 'default'
  guideMessage?: string
  isPrice?: boolean
}
export type MainInputProps = Omit<InputProps, 'inputSize'> & {
  isSmall: boolean
}

export const INPUT_STYLE_KEYS = {
  CHATTING: 'chatting',
  DEFAULT: 'default',
  EDIT: 'edit',
  SEARCH: 'search'
} as const

export const Input = ({
  inputStyle = 'default',
  inputSize = 'small',
  ...props
}: InputProps): ReactElement => {
  const renderInput = (inputStyle: InputStyle): ReactElement => {
    const { EDIT, DEFAULT, CHATTING, SEARCH } = INPUT_STYLE_KEYS
    const isSmall = inputSize === 'small'
    const inputTypeProps = { isSmall, ...props }

    switch (inputStyle) {
      case DEFAULT:
        return <DefaultInput {...inputTypeProps} />
      case CHATTING:
        return <ChattingInput {...inputTypeProps} />
      case SEARCH:
        return <SearchInput {...inputTypeProps} />
      case EDIT:
        return <EditInput {...inputTypeProps} />
      default:
        return <DefaultInput {...inputTypeProps} />
    }
  }

  return renderInput(inputStyle)
}
