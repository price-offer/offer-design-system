import type { CSSProperties, HTMLAttributes, ReactElement } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

export interface TextAreaProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  placeholder?: string
  children: string
  guideMessage?: string
  textAreaStyle?: CSSProperties
  BgType: 'filled' | 'ghost'
  autoFocus?: boolean
}

export const TextArea = ({
  label,
  placeholder = '내용을 입력하세요.',
  children,
  guideMessage,
  BgType,
  textAreaStyle,
  autoFocus,
  ...props
}: TextAreaProps): ReactElement => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const isRefValueNull = ref === null || ref.current === null
  const handleResizeHeight = useCallback(() => {
    if (isRefValueNull) {
      return
    }
    ref.current.style.height = '120px'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [])

  useEffect(() => {
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
        autoFocus={autoFocus}
        placeholder={placeholder}
        style={textAreaStyle}
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
  :hover {
    background-color: ${({ BgType, theme }): string =>
      BgType && BgType === 'filled' ? theme.colors.background.gray04 : ''};
  }
  :focus {
    background-color: ${({ BgType, theme }): string =>
      BgType && BgType === 'filled' ? theme.colors.background.gray04 : ''};
  }
`

const StyledGuideMessage = styled.div`
  margin-top: 8px;
  color: ${({ theme }): string => theme.colors.grayScale.gray50};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`
