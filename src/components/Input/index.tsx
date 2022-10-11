import type { HTMLAttributes, ReactElement } from 'react'
import { ChattingInput } from './ChattingInput'
import { DefaultInput } from './DefaultInput'
import { EditInput } from './EditInput'
import { SearchInput } from './SearchInput'

type InputStyleType = typeof INPUT_STYLE_KEYS[keyof typeof INPUT_STYLE_KEYS]
export type InputSize = 'large' | 'small'
export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  /**
   * Input의 스타일 타입을 정합니다.
   * @type "chatting" | "default" | "edit" | "search" | undefined
   */
  styleType?: InputStyleType

  /**
   * Input의 사이즈를 정합니다.
   * @type 'large' | 'small' | undefined
   */
  inputSize?: InputSize

  /**
   * Input의 label 메세지를 정합니다.
   * @type string | undefined
   */
  label?: string

  /**
   * Input의 추가 설명 메세지의 상태를 정합니다.
   * @type 'none' | 'success' | 'error' | 'default' | undefined
   */
  status?: 'none' | 'success' | 'error' | 'default'

  /**
   * Input의 설명 메세지를 정합니다.
   * @type string | undefined
   */
  guideMessage?: string

  /**
   * Input 값으로 가격을 받는지 여부를 정합니다.
   * @type boolean | undefined
   */
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
  styleType = 'default',
  inputSize = 'small',
  ...props
}: InputProps): ReactElement => {
  const renderInput = (styleType: InputStyleType): ReactElement => {
    const { EDIT, DEFAULT, CHATTING, SEARCH } = INPUT_STYLE_KEYS
    const isSmall = inputSize === 'small'
    const inputTypeProps = { isSmall, ...props }

    switch (styleType) {
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

  return renderInput(styleType)
}
