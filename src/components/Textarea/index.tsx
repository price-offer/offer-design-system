import type { CSSProperties, HTMLAttributes, ReactElement } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

export interface TextAreaProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  placeholder?: string
  children?: string
  guideMessage?: string
  textAreaStyle?: CSSProperties
  bgType?: 'filled' | 'ghost'
  autoFocus?: boolean
}

interface StyledTextAreaProps {
  isFilled: boolean
}
export const TextArea = ({
  label = '',
  placeholder = '내용을 입력하세요.',
  children = '',
  guideMessage = '',
  bgType = 'filled',
  textAreaStyle,
  autoFocus,
  ...props
}: TextAreaProps): ReactElement => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const isRefValueNull = ref === null || ref.current === null
  const isFilled = bgType === 'filled'
  const textAreaHeight = '120px'

  const handleResizeHeight = useCallback(() => {
    if (isRefValueNull) {
      return
    }
    ref.current.style.height = ref.current.style.height = textAreaHeight
    ref.current.scrollHeight + 'px'
  }, [])

  useEffect(() => {
    handleResizeHeight()
  }, [])

  return (
    <div {...props}>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextArea
        ref={ref}
        autoFocus={autoFocus}
        isFilled={isFilled}
        placeholder={placeholder}
        rows={1}
        style={textAreaStyle}
        onInput={handleResizeHeight}>
        {children}
      </StyledTextArea>
      <StyledGuideMessage>{guideMessage}</StyledGuideMessage>
    </div>
  )
}

const StyledLabel = styled.label`
  display: block;
  color: ${({ theme }): string => theme.colors.grayScale.gray70};
  ${({ theme }): string => theme.fonts.body01M};
  margin-bottom: 8px;
`
const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  display: inline-block;
  resize: none;
  outline: none;
  min-width: 328px;
  max-width: 100%;
  height: 120px;
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

const StyledGuideMessage = styled.p`
  display: block;
  margin-top: 8px;
  color: ${({ theme }): string => theme.colors.grayScale.gray50};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`
