import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'

export interface RadioProps extends HTMLAttributes<HTMLDivElement> {
  formName: string
  items: { code: string; name: string }[]
  radioDirection: string
  onChange(e: unknown): void
}

interface FormProps extends HTMLAttributes<HTMLDivElement> {
  radioDirection: string
}
const Radio = ({
  formName,
  onChange,
  items,
  radioDirection = 'horizental',
  ...props
}: RadioProps): ReactElement => {
  const handleRadiobutton = (e: unknown): void => {
    onChange && onChange(e)
  }

  const radioList = items?.map(({ code, name }) => (
    <StyledInputWrapper key={code} className={`${radioDirection}`}>
      {name}
      <StyledInput
        id={code}
        name={formName}
        type="radio"
        value={code}
        onChange={(e): void => {
          handleRadiobutton(e)
        }}
      />
      <StyledCheckMark />
    </StyledInputWrapper>
  ))

  return (
    <StyledRadioWrapper {...props}>
      <StyledForm radioDirection={radioDirection}>{radioList}</StyledForm>
    </StyledRadioWrapper>
  )
}

const StyledRadioWrapper = styled.div``
const StyledForm = styled.form<FormProps>`
  display: ${({ radioDirection }): string =>
    radioDirection === 'vertical' ? 'block' : 'flex'};
  gap: 10px;
`
const StyledInputWrapper = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 30px;
  padding-top: 2px;
  margin-bottom: 12px;

  &.vertical {
    margin-bottom: 20px;
  }
  &.horizontal {
    margin-right: 30px;
  }

  input:checked ~ span {
    background-color: ${({ theme }): string => theme.colors.brand.primary};
    border: none;
  }
  input:checked ~ span:after {
    display: block;
  }
  span:after {
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    border-radius: 100px;
    background: ${({ theme }): string => theme.colors.grayScale.white};
  }
`

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  margin-right: 10px;
`

const StyledCheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${({ theme }): string => theme.colors.grayScale.white};
  border: solid ${({ theme }): string => theme.colors.grayScale.gray10};
  border-radius: 50%;
  :after {
    content: '';
    position: absolute;
    display: none;
  }
`

export default Radio
