import styled from '@emotion/styled'
import type { ReactElement } from 'react'
import type { RadioProps } from './Default'

export type InputProps = Pick<RadioProps, 'formName'> & {
  value: string
}

export const Input = ({ value, formName }: InputProps): ReactElement => {
  return (
    <>
      <InputComponent
        id={`${formName}-${value}`}
        name={formName}
        type="radio"
        value={value}
      />
      <CheckMark />
    </>
  )
}

const InputComponent = styled.input`
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
