import type { ChangeEvent, HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface RadioProps extends HTMLAttributes<HTMLFormElement> {
  /** Radio 컴포넌트의 이름을 정합니다.(input name에 사용)
   * @type string
   */
  formName: string

  /** Radio 컴포넌트의 들어갈 요소들을 정합니다
   * @type { code: string, name: string } []
   */
  items: { code: string; name: string }[]

  /** Radio 컴포넌트의 방향을 정합니다.
   * @type 'horizontal' | 'vertical'
   */
  direction: 'horizontal' | 'vertical'

  /** Radio 컴포넌트의 onChange를 정의합니다.
   * @type void
   */
  onChange(e: ChangeEvent<HTMLFormElement>): void
}

type StyledFormProps = StyledProps<RadioProps, 'direction'>

export const Radio = ({
  formName,
  onChange,
  items,
  direction = 'horizontal',
  ...props
}: RadioProps): ReactElement => {
  const handleRadiobutton = (
    e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLFormElement>
  ): void => {
    onChange(e)
  }

  const radioList = items?.map(({ code, name }) => (
    <StyledInputWrapper key={code} className={`${direction}`}>
      {name}
      <StyledInput
        id={code}
        name={formName}
        type="radio"
        value={code}
        onChange={handleRadiobutton}
      />
      <StyledCheckMark />
    </StyledInputWrapper>
  ))

  return (
    <StyledForm {...props} direction={direction}>
      {radioList}
    </StyledForm>
  )
}

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

  color: ${({ theme }): string => theme.colors.grayScale.gray90};
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
