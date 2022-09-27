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
  message?: string
  isPrice?: boolean
}

export type InputStyleOption<T extends string> = {
  [key in Extract<T, 'FONT'>]: string
} & {
  [key in Exclude<T, 'FONT'>]: number
}
export type InputStylesheet<T> = {
  [key in InputSize]: T
}

export const INPUT_STYLE_KEYS = {
  CHATTING: 'chatting',
  DEFAULT: 'default',
  EDIT: 'edit',
  SEARCH: 'search'
} as const

export const Input = ({
  inputStyle = 'default',
  ...props
}: InputProps): ReactElement => {
  const renderInput = (inputStyle: InputStyle): ReactElement => {
    const { EDIT, DEFAULT, CHATTING, SEARCH } = INPUT_STYLE_KEYS
    switch (inputStyle) {
      case DEFAULT:
        return <DefaultInput {...props} />
      case CHATTING:
        return <ChattingInput {...props} />
      case SEARCH:
        return <SearchInput {...props} />
      case EDIT:
        return <EditInput {...props} />
      default:
        return <DefaultInput {...props} />
    }
  }

  return renderInput(inputStyle)
}
