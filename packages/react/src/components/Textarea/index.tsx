import type { ChangeEvent, ForwardedRef, TextareaHTMLAttributes } from 'react'
import { forwardRef, useRef } from 'react'
import { mergeRefs } from '@offer-ui/utils/mergeRefs'
import styled from '@emotion/styled'
import { Text } from '@offer-ui/components/Text'
import { theme } from '@offer-ui/themes'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** TextArea 컴포넌트 상단의 label 정합니다.
   * @type string | undefined
   */
  label?: string
  /** TextArea 컴포넌트 하단의 안내 메시지를 정합니다.
   * @type string
   */
  guideMessage?: string
  /** TextArea 컴포넌트의 보여질 형태를 정합니다.
   * @type 'filled' | 'ghost' | undefined
   */
  bgType?: 'filled' | 'ghost'
  /** TextArea 컴포넌트의 onInput을 정의합니다.
   * @type void | undefined
   */
  onInput?(e: ChangeEvent<HTMLTextAreaElement>): void
}

interface StyledTextAreaProps {
  isFilled: boolean
}

export const TextArea = forwardRef(function TextArea(
  {
    label = '',
    placeholder = '내용을 입력하세요.',
    guideMessage = '',
    bgType = 'filled',
    onInput,
    ...props
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const TEXT_AREA_DEFAULT_HEIGHT = '120px'
  const isFilled = bgType === 'filled'

  const handleResizeHeight = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (!textAreaRef || !textAreaRef.current) {
      return
    }
    textAreaRef.current.style.height = TEXT_AREA_DEFAULT_HEIGHT
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    onInput?.(e)
  }

  return (
    <>
      <StyledLabel>
        {label && <Text styleType="body01M">{label}</Text>}
      </StyledLabel>
      <StyledTextArea
        {...props}
        ref={mergeRefs<HTMLTextAreaElement>([textAreaRef, ref])}
        isFilled={isFilled}
        placeholder={placeholder}
        rows={1}
        onInput={handleResizeHeight}
      />
      <StyledGuideMessage color="grayScale50" styleType="caption01M" tag="p">
        {guideMessage}
      </StyledGuideMessage>
    </>
  )
})

const StyledLabel = styled.label`
  display: block;
  color: ${theme.colors.grayScale70};
  margin-bottom: 8px;
`
const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  display: inline-block;
  resize: none;
  outline: none;
  height: 120px;
  min-width: 328px;
  max-width: 100%;
  padding: 10px 12px;
  border: none;
  color: ${theme.colors.grayScale90};
  background-color: ${({ isFilled }): string =>
    isFilled ? theme.colors.grayScale05 : theme.colors.white};
  ${theme.fonts.body02M};
  ::placeholder {
    color: ${theme.colors.grayScale50};
    ${theme.fonts.body02M};
  }
  :hover {
    background-color: ${({ isFilled }): string =>
      isFilled ? theme.colors.bgGray04 : ''};
  }
  :focus {
    background-color: ${({ isFilled }): string =>
      isFilled ? theme.colors.bgGray04 : ''};
  }
`

const StyledGuideMessage = styled(Text)`
  display: block;
  margin-top: 8px;
`
