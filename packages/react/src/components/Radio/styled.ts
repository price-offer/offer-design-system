import styled from '@emotion/styled'
import type { StyledFormProps } from './types'

const Form = styled.form<StyledFormProps>`
  display: ${({ direction }): string =>
    direction === 'vertical' ? 'block' : 'flex'};
  gap: 10px;
`
const Label = styled.label`
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

const Input = styled.input`
  display: none;
  cursor: pointer;
  margin-right: 10px;

  :checked ~ span {
    background-color: ${({ theme }): string => theme.colors.brandPrimary};
    border: none;
  }
  :checked ~ span:after {
    display: block;
  }
`

const CheckMark = styled.span`
  position: relative;
  height: 20px;
  width: 20px;
  background-color: ${({ theme }): string => theme.colors.white};
  border: solid ${({ theme }): string => theme.colors.grayScale10};
  border-radius: ${({ theme }): string => theme.radius.round100};

  :after {
    content: '';
    position: absolute;
    display: none;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    border-radius: ${({ theme }): string => theme.radius.round100};
    background: ${({ theme }): string => theme.colors.white};
  }
`

export const Styled = {
  Form,
  Input,
  Label,
  CheckMark
}
