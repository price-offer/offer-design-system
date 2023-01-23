import type {
  ChangeEvent,
  FormHTMLAttributes,
  ForwardedRef,
  ReactNode
} from 'react'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { Text } from '@offer-ui/components/Text'

export interface RadioProps extends FormHTMLAttributes<HTMLFormElement> {
  /** Radio 컴포넌트의 이름을 정합니다.(input name에 사용)
   * @type string
   */
  formName: string
  /** Radio 컴포넌트에 보여질 옵션들을 정합니다
   * @type { code: string, name: string } []
   */
  items: {
    code: string
    name: string
  }[]
  /** Radio 컴포넌트 내부 옵션의 방향을 정합니다.
   * @type 'horizontal' | 'vertical'
   */
  direction: 'horizontal' | 'vertical'
  /** Radio 컴포넌트의 값이 변경되는 경우 실행할 함수를 정합니다.
   * @type void
   */
  onChange(e: ChangeEvent<HTMLFormElement>): void
  /** Radio 컴포넌트에 들어갈 element들을 render시켜줄 함수를 전달합니다.
   * @type void
   */
  render?(name: string): ReactNode
}

type StyledFormProps = StyledProps<RadioProps, 'direction'>

export const Radio = forwardRef(function Radio(
  {
    formName,
    onChange,
    items,
    direction = 'horizontal',
    render,
    ...props
  }: RadioProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const handleRadiobutton = (
    e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLFormElement>
  ): void => {
    onChange(e)
  }

  const radioList = items?.map(({ code, name }) => (
    <StyledInputWrapper key={code} className={`${direction}`}>
      <StyledInput
        id={code}
        name={formName}
        type="radio"
        value={code}
        onChange={handleRadiobutton}
      />
      {render ? render(name) : <Text styleType="body01R">{name}</Text>}
      <StyledCheckMark />
    </StyledInputWrapper>
  ))

  return (
    <StyledForm ref={ref} {...props} direction={direction}>
      {radioList}
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
