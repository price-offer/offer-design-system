import { Text } from '@offer-ui/components/Text'
import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Input } from './Input'
import { Styled } from './styled'
import type { RadioProps } from './types'

export const Default = forwardRef(function Radio(
  {
    formName,
    onChange,
    items,
    direction = 'horizontal',
    children,
    ...props
  }: RadioProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const radioList = items?.map((item: any) => (
    <Styled.Label key={item.code} className={`${direction}`}>
      <Input formName={formName} value={item.code} />
      <Text style={{ backgroundColor: 'white' }} styleType="body01R">
        {item.name}
      </Text>
    </Styled.Label>
  ))

  return (
    <Styled.Form ref={ref} {...props} direction={direction} onChange={onChange}>
      {children || radioList}
    </Styled.Form>
  )
})
