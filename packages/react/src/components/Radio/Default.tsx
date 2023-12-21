import styled from '@emotion/styled'
import { Text } from '@offer-ui/components'
import type { StyledProps } from '@offer-ui/types'
import { forwardRef } from 'react'
import type { ForwardedRef, ChangeEvent, ReactNode } from 'react'
import { Input } from './Input'

export const DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
} as const

type CommonProps = {
  /**
   * @type string
   * @description Radio 컴포넌트의 이름을 정합니다.(input name에 사용)
   */
  formName: string
  /**
   * @type 'horizontal' | 'vertical'
   * @description Radio 컴포넌트 내부 옵션의 방향을 정합니다.
   */
  direction: typeof DIRECTION[keyof typeof DIRECTION]
  /**
   * @type string | undefined
   * @description Radio에서 선택된 값을 지정합니다.
   */
  selectedValue?: string
  /**
   * @type void
   * @description Radio 컴포넌트의 값이 변경되는 경우 실행할 함수를 정합니다.
   */
  onChange(e: ChangeEvent<HTMLFormElement>): void
}
type DefaultProps = CommonProps & {
  /**
   * @type any
   * @description Radio 컴포넌트에 보여질 옵션들을 정합니다
   */
  items: any
  children?: never
}
type ChildrenProps = CommonProps & {
  /**
   * @type ReactNode
   * @description Radio 컴포넌트의 아이템 리스트를 자유로운 방식으로 구현합니다.
   */
  children: ReactNode
  items?: never
}

export type RadioProps = DefaultProps | ChildrenProps
type StyledFormProps = StyledProps<RadioProps, 'direction'>

export const Default = forwardRef(function Radio(
  {
    formName,
    onChange,
    items,
    direction = DIRECTION.HORIZONTAL,
    children,
    selectedValue,
    ...props
  }: RadioProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const radioList = items?.map((item: any) => (
    <Label key={item.code} className={`${direction}`}>
      <Input
        formName={formName}
        value={item.code}
        {...(selectedValue && { checked: selectedValue === item.code })}
      />
      <Text style={{ backgroundColor: 'white' }} styleType="body01R">
        {item.name}
      </Text>
    </Label>
  ))

  return (
    <Form ref={ref} {...props} direction={direction} onChange={onChange}>
      {children || radioList}
    </Form>
  )
})

const Form = styled.form<StyledFormProps>`
  display: flex;

  flex-direction: ${({ direction }): string =>
    direction === DIRECTION.VERTICAL ? 'column' : 'row'};
  gap: 10px;
`
export const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  color: ${({ theme }): string => theme.colors.grayScale90};

  ${({ theme }): string => theme.fonts.body02R};

  &.horizontal {
    margin-right: 30px;
  }
`
