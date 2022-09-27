import type { CSSProperties, HTMLAttributes, ReactElement } from 'react'
import { useEffect, useState } from 'react'
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
  // const [isRefNull, SetisRefNull] = useState<boolean>(false)
  // const ref = useRef<HTMLTextAreaElement>(null)
  const textAreaDefaultHeight = '120px'
  const isFilled = bgType === 'filled'
  const [textAreaElement, setTextAreaElement] = useState<HTMLTextAreaElement>()
  const isRefValueNull =
    textAreaElement === undefined || textAreaElement === null

  const handleTextAreaElement = (elem: HTMLTextAreaElement): void => {
    if (textAreaElement !== undefined && !elem) {
      return
    }
    setTextAreaElement(elem)
  }

  useEffect(() => {
    handleResizeHeight()
  }, [textAreaElement])

  const handleResizeHeight = (): void => {
    if (isRefValueNull) {
      return
    }
    textAreaElement.style.height = textAreaDefaultHeight
    textAreaElement.style.height = `${textAreaElement.scrollHeight + 'px'}`
  }

  return (
    <div {...props}>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextArea
        ref={handleTextAreaElement}
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
