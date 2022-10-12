import type { ChangeEvent, HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import { Text } from '@components'
import { useRef } from 'react'

export interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  label?: string
  guideMessage?: string
  bgType?: 'filled' | 'ghost'
  onInput?(e: ChangeEvent<HTMLTextAreaElement>): void
}

interface StyledTextAreaProps {
  isFilled: boolean
}
export const TextArea = ({
  label = '',
  placeholder = '내용을 입력하세요.',
  guideMessage = '',
  bgType = 'filled',
  onInput,
  ...props
}: TextAreaProps): ReactElement => {
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
        ref={textAreaRef}
        isFilled={isFilled}
        placeholder={placeholder}
        rows={1}
        onInput={handleResizeHeight}
      />
      <StyledGuideMessage styleType="caption01M" tag="p">
        {guideMessage}
      </StyledGuideMessage>
    </>
  )
}

const StyledLabel = styled.label`
  display: block;
  color: ${({ theme }): string => theme.colors.grayScale.gray70};
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
  color: ${({ theme }): string => theme.colors.grayScale.gray90};
  background-color: ${({ isFilled, theme }): string =>
    isFilled ? theme.colors.grayScale.gray05 : theme.colors.grayScale.white};
  ${({ theme }): string => theme.fonts.body02M};

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
    ${({ theme }): string => theme.fonts.body02M};
  }
  :hover {
    background-color: ${({ isFilled, theme }): string =>
      isFilled ? theme.colors.background.gray04 : ''};
  }
  :focus {
    background-color: ${({ isFilled, theme }): string =>
      isFilled ? theme.colors.background.gray04 : ''};
  }
`

const StyledGuideMessage = styled(Text)`
  display: block;
  margin-top: 8px;
  color: ${({ theme }): string => theme.colors.grayScale.gray50};
`
