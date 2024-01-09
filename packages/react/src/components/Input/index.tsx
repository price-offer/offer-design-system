import type { InputHTMLAttributes } from 'react'
import { Chatting } from './Chatting'
import { Default } from './Default'
import { Edit } from './Edit'
import { Search } from './Search'

export type InputSize = 'large' | 'small'
export type InputProps = {
  /**
   * Input의 스타일 타입을 정합니다.
   * @type "chatting" | "default" | "edit" | "search" | undefined
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
  /**
   * Input 너비를 정합니다.
   * @type string | undefined
   */
  width?: string
} & InputHTMLAttributes<HTMLInputElement>

export const INPUT_GUIDE_MESSAGE_STYLE = {
  DEFAULT: 'grayScale',
  SUCCESS: 'actSuccess',
  ERROR: 'actionError'
} as const

export const isSmallSize = (size: InputSize): boolean => size === 'small'

export const Input = Object.assign(Default, {
  Chatting,
  Search,
  Edit
})
