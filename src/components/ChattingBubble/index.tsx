import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import { Text } from '@components'
import { useMediaQuery } from '@hooks'

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
  const isDesktop = useMediaQuery('(min-width:1023px)')
  const desktopTextStyleType = isSend ? 'body01M' : 'body01R'
  const mobileTextStyleType = isSend ? 'body02M' : 'body02R'

  return (
    <StyledBubble {...props} isSend={isSend}>
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
}

const StyledBubble = styled.p<StyledBubbleProps>`
  display: inline-block;
  word-break: break-all;
  max-width: 332px;
  padding: 12px 16px;

  ${({ theme, isSend }): string => {
    if (isSend) {
      return `
          background-color: ${theme.colors.brand.primary};
          border-radius: 16px 0px 16px 16px;
          `
    }

    return `
       background-color: ${theme.colors.grayScale.white};
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
    isSend ? theme.colors.grayScale.white : theme.colors.grayScale.gray90};
`
