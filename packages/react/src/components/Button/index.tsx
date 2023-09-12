import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { Styled } from './styled'
import type { ButtonProps } from './types'

export const Button = forwardRef(function Button(
  {
    width = '100%',
    size = 'medium',
    styleType = 'solidPrimary',
    icon,
    children,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Styled.Button
      ref={ref}
      size={size}
      styleType={styleType}
      width={width}
      {...props}>
      {icon && <Styled.Icon styleType={styleType} type={icon} />}
      {children}
    </Styled.Button>
  )
})
