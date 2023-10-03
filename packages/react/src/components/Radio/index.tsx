import { Default } from './Default'
import { Input } from './Input'
import { Styled } from './styled'

export const Radio = Object.assign(Default, {
  Input,
  Label: Styled.Label
})
