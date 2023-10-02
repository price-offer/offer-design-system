import type { StyledProps } from '@offer-ui/types'
import type { ChangeEvent, ReactNode } from 'react'

type CommonProps = {
  /** Radio 컴포넌트의 이름을 정합니다.(input name에 사용)
   * @type string
   */
  formName: string
  /** Radio 컴포넌트 내부 옵션의 방향을 정합니다.
   * @type 'horizontal' | 'vertical'
   */
  direction: 'horizontal' | 'vertical'
  /** Radio 컴포넌트의 값이 변경되는 경우 실행할 함수를 정합니다.
   * @type void
   */
  onChange(e: ChangeEvent<HTMLFormElement>): void
}
type DefaultProps = CommonProps & {
  /** Radio 컴포넌트에 보여질 옵션들을 정합니다
   * @type any
   */
  items: any
  children?: never
}
type ChildrenProps = CommonProps & {
  /** Radio 컴포넌트의 아이템 리스트를 자유로운 방식으로 구현합니다.
   * @type ReactNode
   */
  children: ReactNode
  items?: never
}

export type RadioProps = DefaultProps | ChildrenProps

export type InputProps = Pick<RadioProps, 'formName'> & {
  value: string
}

export type StyledFormProps = StyledProps<RadioProps, 'direction'>
