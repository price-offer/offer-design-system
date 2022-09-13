import type { HTMLAttributes, ReactElement } from 'react'
import { useCallback, useRef } from 'react'
import styled from '@emotion/styled'

export interface TextAreaProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  placeholder?: string
  children: string
  guideMessage?: string
  BgType: 'filled' | 'ghost'
}

export const TextArea = ({
  label,
  placeholder = '내용을 입력하세요.',
  children,
  guideMessage,
  BgType,
  ...props
}: TextAreaProps): ReactElement => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return
    }
    ref.current.style.height = '120px'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [])

  return (
    <StyledTextAreaWrapper {...props}>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledTextArea
        ref={ref}
        BgType={BgType}
        placeholder={placeholder}
        onInput={handleResizeHeight}>
        {children}
      </StyledTextArea>
      {guideMessage && <StyledGuideMessage>{guideMessage}</StyledGuideMessage>}
    </StyledTextAreaWrapper>
  )
}

const StyledTextAreaWrapper = styled.div``

const StyledLabel = styled.div`
  color: ${({ theme }): string => theme.colors.grayScale.gray70};
  ${({ theme }): string => theme.fonts.body01M};
  margin-bottom: 8px;
`
const StyledTextArea = styled.textarea<TextAreaProps>`
  display: inline-block;
  resize: none;
  outline: none;
  min-width: 328px;
  max-width: 100%;
  height: 120px;
  padding: 10px 12px;
  border: none;
  color: ${({ theme }): string => theme.colors.grayScale.gray90};
  background-color: ${({ BgType, theme }): string =>
    BgType === 'filled'
      ? theme.colors.grayScale.gray05
      : theme.colors.grayScale.white};
  ${({ theme }): string => theme.fonts.body02M};

  ::placeholder {
    color: ${({ theme }): string => theme.colors.grayScale.gray50};
    ${({ theme }): string => theme.fonts.body02M};
  }
`

const StyledGuideMessage = styled.div`
  margin-top: 8px;
  color: ${({ theme }): string => theme.colors.grayScale.gray50};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`
