import type { InputHTMLAttributes } from 'react'
import { Chatting } from './Chatting'
import { Default } from './Default'
import { Edit } from './Edit'
import { Search } from './Search'

export type InputSize = 'large' | 'small'
export type InputProps = {
  /**
   * Input의 사이즈를 정합니다.
   * @type 'large' | 'small' | undefined
   */
  inputSize?: InputSize
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
