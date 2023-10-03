import type { ReactElement } from 'react'
import { Styled } from './styled'
import type { InputProps } from './types'

export const Input = ({ value, formName }: InputProps): ReactElement => {
  return (
    <>
      <Styled.Input
        id={`${formName}-${value}`}
        name={formName}
        type="radio"
        value={value}
      />
      <Styled.CheckMark />
    </>
  )
}
