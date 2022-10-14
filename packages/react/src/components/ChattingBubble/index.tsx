import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface ChattingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /** ChattingBubble 컴포넌트의 수신 또는 발신에 대한 형태를 정합니다.
   * @type 'send' | 'receive'
   */
  messageType: 'send' | 'receive'

  /** ChattingBubble 컴포넌트의 메시지에 입력될 내용입니다.
   * @type string
   */
  children: string
}

type StyledBubbleProps = StyledProps<ChattingBubbleProps, 'messageType'> & {
  isSend: boolean
}

export const ChattingBubble = ({
  messageType,
  children,
  ...props
}: ChattingBubbleProps): ReactElement => {
  const newLineRegex = /\s/gi
  const blankChatLength = children.length
  const noBlankChatLength = children.replace(newLineRegex, '').length
  const overChatLength = blankChatLength - noBlankChatLength
  const isSend = messageType === 'send'
  const MAXIMUM_NUMBER_OF_CHATTINGBUBBLE = 100

  return (
    <StyledBubble {...props} isSend={isSend} messageType={messageType}>
      {noBlankChatLength <= MAXIMUM_NUMBER_OF_CHATTINGBUBBLE
        ? children
        : children?.substring(
            0,
            MAXIMUM_NUMBER_OF_CHATTINGBUBBLE + overChatLength
          )}
    </StyledBubble>
  )
}

const StyledBubble = styled.p<StyledBubbleProps>`
  display: inline-block;
  word-break: break-all;
  max-width: 332px;
  max-height: 144px;
  padding: 12px 16px;

  ${({ theme, isSend }): string => {
    if (isSend) {
      return `
          color: ${theme.colors.grayScale.white};
          background-color: ${theme.colors.brand.primary};
          border-radius: 16px 0px 16px 16px;
          ${theme.fonts.body01M}
          `
    }

    return `
       color: ${theme.colors.grayScale.gray90};
       background-color: ${theme.colors.grayScale.white};
       border-radius: 0px 16px 16px 16px;
       ${theme.fonts.body01R}
    `
  }}

  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: 230px;
    max-height: 136px;
    padding: 8px 12px;
    ${({ theme, isSend }): string =>
      isSend ? theme.fonts.body02M : theme.fonts.body02R}
  }
`
