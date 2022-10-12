import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import { Text } from '@components'

export interface ChattingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  messageType: 'send' | 'receive'
  children: string
}

interface StyledBubbleProps {
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
    <StyledBubble {...props} isSend={isSend}>
      <StyledChattingText
        isSend={isSend}
        styleType={isSend ? 'body02M' : 'body02R'}>
        {noBlankChatLength <= MAXIMUM_NUMBER_OF_CHATTINGBUBBLE
          ? children
          : children?.substring(
              0,
              MAXIMUM_NUMBER_OF_CHATTINGBUBBLE + overChatLength
            )}
      </StyledChattingText>
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
          background-color: ${theme.colors.brand.primary};
          border-radius: 16px 0px 16px 16px;
          ${theme.fonts.body01M}
          `
    }

    return `
       background-color: ${theme.colors.grayScale.white};
       border-radius: 0px 16px 16px 16px;
       ${theme.fonts.body01R}
    `
  }}

  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: 230px;
    max-height: 136px;
    padding: 8px 12px;
  }
`

const StyledChattingText = styled(Text)<StyledBubbleProps>`
  color: ${({ theme, isSend }): string =>
    isSend ? theme.colors.grayScale.white : theme.colors.grayScale.gray90};
`
