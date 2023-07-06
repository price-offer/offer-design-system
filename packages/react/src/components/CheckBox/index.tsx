import styled from '@emotion/styled'
import type {
  ChangeEvent,
  FormHTMLAttributes,
  ForwardedRef,
  ReactNode
} from 'react'
import { forwardRef } from 'react'

export interface CheckBoxProps extends FormHTMLAttributes<HTMLFormElement> {
  /** CheckBox 컴포넌트의 이름을 정합니다.(input name에 사용)
   * @type string
   */
  formName: string
  /** CheckBox 컴포넌트에 사용될 key 값인 code를 정합니다
   * @type string
   */
  code: any
  /** CheckBox 컴포넌트에 사용될 checked 유무를 확인할 checked를 정합니다.
   * @type string
   */
  checked: boolean
  /** CheckBox 컴포넌트에 사용될 element를 정합니다.
   * @type string
   */
  element: ReactNode
  /** CheckBox 컴포넌트의 값이 변경되는 경우 실행할 함수를 정합니다.
   * @type void
   */
  onChange(e: ChangeEvent<HTMLFormElement>): void
  /** CheckBox 컴포넌트를 눌렀을때 실행할 함수를 정합니다.
   * @type void
   */
  onCheck(code: any): void | undefined
  /** CheckBox 컴포넌트에 추가로 render시킬 함수를 정합니다.
   * @type void
   */
}

export const CheckBox = forwardRef(function CheckBox(
  {
    formName,
    onChange,
    code,
    checked,
    element,
    onCheck,
    ...props
  }: CheckBoxProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const handleRadiobutton = (
    e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLFormElement>
  ): void => {
    onChange(e)
  }

  return (
    <StyledForm ref={ref} {...props}>
      <StyledInputWrapper key={code}>
        <StyledInput
          checked={checked}
          id={code}
          name={formName}
          type="checkbox"
          value={code}
          onChange={handleRadiobutton}
          onClick={(): void => {
            onCheck(code)
          }}
        />
        {element}
        <StyledCheckMark />
      </StyledInputWrapper>
    </StyledForm>
  )
})

const StyledForm = styled.form`
  gap: 10px;
`
const StyledInputWrapper = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 25px;
  margin-bottom: 8px;
  ${({ theme }): string => theme.fonts.body02R};

  color: ${({ theme }): string => theme.colors.grayScale90};
  &.vertical {
    margin-bottom: 20px;
  }
  &.horizontal {
    margin-right: 30px;
  }

  input:checked ~ span {
    background-color: ${({ theme }): string => theme.colors.brandPrimary};
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
    background: ${({ theme }): string => theme.colors.white};
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
  background-color: ${({ theme }): string => theme.colors.white};
  border: solid ${({ theme }): string => theme.colors.grayScale10};
  border-radius: 50%;
  :after {
    content: '';
    position: absolute;
    display: none;
  }
`
