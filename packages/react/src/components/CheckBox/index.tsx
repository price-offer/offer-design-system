import type {
  ChangeEvent,
  FormHTMLAttributes,
  ForwardedRef,
  ReactNode
} from 'react'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'

export interface CheckBoxProps extends FormHTMLAttributes<HTMLFormElement> {
  /** CheckBox 컴포넌트의 이름을 정합니다.(input name에 사용)
   * @type string
   */
  formName: string
  /** CheckBox 컴포넌트에 보여질 옵션들을 정합니다
   * @type { code: string, name: string } []
   */
  items: {
    code: string
    checked: boolean
    element: ReactNode
  }[]
  /** CheckBox 컴포넌트 내부 input 타입을 정합니다.
   * @type 'radio' | 'checkbox'
   */
  componentType: 'radio' | 'checkbox'
  /** CheckBox 컴포넌트 내부 옵션의 방향을 정합니다.
   * @type 'horizontal' | 'vertical'
   */
  direction: 'horizontal' | 'vertical'
  /** CheckBox 컴포넌트의 값이 변경되는 경우 실행할 함수를 정합니다.
   * @type void
   */
  onChange(e: ChangeEvent<HTMLFormElement>): void
  /** CheckBox 컴포넌트를 눌렀을때 실행할 함수를 정합니다.
   * @type void
   */
  onCheck(code: string): void | undefined
  /** CheckBox 컴포넌트에 추가로 render시킬 함수를 정합니다.
   * @type void
   */
}

type StyledFormProps = StyledProps<CheckBoxProps, 'direction'>

export const Radio = forwardRef(function Radio(
  {
    formName,
    onChange,
    items,
    direction = 'horizontal',
    componentType,
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

  const checkBoxList = items?.map(({ code, checked, element }) => (
    <StyledInputWrapper key={code} className={`${direction}`}>
      <StyledInput
        checked={checked}
        id={code}
        name={formName}
        type={componentType}
        value={code}
        onChange={handleRadiobutton}
        onClick={(): void => {
          onCheck(code)
        }}
      />
      {element}
      <StyledCheckMark />
    </StyledInputWrapper>
  ))

  return (
    <StyledForm ref={ref} {...props} direction={direction}>
      {checkBoxList}
    </StyledForm>
  )
})

const StyledForm = styled.form<StyledFormProps>`
  display: ${({ direction }): string =>
    direction === 'vertical' ? 'block' : 'flex'};
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
