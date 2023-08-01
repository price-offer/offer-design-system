import styled from '@emotion/styled'
import { Text } from '@offer-ui/components/Text'
import { useMediaQuery } from '@offer-ui/hooks'
import { forwardRef } from 'react'
import type { ForwardedRef, HTMLAttributes } from 'react'

export type ChattingBubbleProps = {
  /** ChattingBubble 컴포넌트의 수신 또는 발신에 대한 형태를 정합니다.
   * @type 'send' | 'receive'
   */
  messageType: 'send' | 'receive'
  /** ChattingBubble 컴포넌트의 메시지에 입력될 내용입니다.
   * @type string
   */
  children: string
} & HTMLAttributes<HTMLDivElement>

type StyledBubbleProps = {
  isSend: boolean
}

export const ChattingBubble = forwardRef(function ChattingBubble(
  { messageType, children, ...props }: ChattingBubbleProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const newLineRegex = /\s/gi
  const blankChatLength = children.length
  const noBlankChatLength = children.replace(newLineRegex, '').length
  const overChatLength = blankChatLength - noBlankChatLength
  const isSend = messageType === 'send'
  const MAXIMUM_NUMBER_OF_CHATTINGBUBBLE = 100
  const isDesktop = useMediaQuery('(min-width:1023px)')
  const desktopTextStyleType = isSend ? 'body01M' : 'body01R'
  const mobileTextStyleType = isSend ? 'body02M' : 'body02R'

  return (
    <StyledBubble ref={ref} {...props} isSend={isSend}>
      <StyledChattingMessage
        isSend={isSend}
        styleType={isDesktop ? desktopTextStyleType : mobileTextStyleType}>
        {noBlankChatLength <= MAXIMUM_NUMBER_OF_CHATTINGBUBBLE
          ? children
          : children?.substring(
              0,
              MAXIMUM_NUMBER_OF_CHATTINGBUBBLE + overChatLength
            )}
      </StyledChattingMessage>
    </StyledBubble>
  )
})

const StyledBubble = styled.p<StyledBubbleProps>`
  display: inline-block;
  word-break: break-all;
  max-width: 332px;
  padding: 12px 16px;
  ${({ theme, isSend }): string => {
    if (isSend) {
      return `
          background-color: ${theme.colors.brandPrimary};
          border-radius: 16px 0px 16px 16px;
          `
    }
    return `
       background-color: ${theme.colors.white};
       border-radius: 0px 16px 16px 16px;
    `
  }}
  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: 230px;
    padding: 8px 12px;
  }
`

const StyledChattingMessage = styled(Text)<StyledBubbleProps>`
  color: ${({ theme, isSend }): string =>
    isSend ? theme.colors.white : theme.colors.grayScale90};
`
