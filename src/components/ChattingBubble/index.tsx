import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'

export interface ChattingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  type: 'send' | 'receive'
  children: string
}

interface StyledBubbleProps {
  type: 'send' | 'receive'
  isSend: boolean
}

export const ChattingBubble = ({
  type,
  children,
  ...props
}: ChattingBubbleProps): ReactElement => {
  const newLineRegex = /\s/gi
  const blankChatLength = children?.length
  const noBlankchatLength = children?.replace(newLineRegex, '').length
  const overChatLength = blankChatLength - noBlankchatLength
  const isSend = type === 'send'

  return (
    <StyledBubble {...props} isSend={isSend} type={type}>
      {noBlankchatLength <= 100
        ? children
        : children?.substring(0, 100 + overChatLength)}
    </StyledBubble>
  )
}

const StyledBubble = styled.p<StyledBubbleProps>`
  display: inline-block;
  word-break: break-all;
  max-width: 332px;
  max-height: 144px;
  padding: 12px 16px;
  color: ${({ theme, isSend }): string =>
    isSend ? theme.colors.grayScale.white : theme.colors.grayScale.gray90};
  ${({ theme, isSend }): string =>
    isSend ? theme.fonts.body01M : theme.fonts.body01R}
  background-color: ${({ theme, isSend }): string =>
    isSend ? theme.colors.brand.primary : theme.colors.grayScale.white};
  border-radius: ${({ isSend }): string =>
    isSend ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};

  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: 230px;
    max-height: 136px;
    padding: 8px 12px;
    ${({ theme, isSend }): string =>
      isSend
        ? theme.fonts.body02M
        : 'font-size: 14px; font-weight: regular; line-height: 20px; letter-spacing: -0.4%;'}
  }
`
