import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'

export interface ChattingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  user: 'sender' | 'receiver'
  children: string
}

interface StyledBubbleProps {
  user: 'sender' | 'receiver'
}

export const ChattingBubble = ({
  user,
  children,
  ...props
}: ChattingBubbleProps): ReactElement => {
  const redex = /\s/gi
  const BlankChatLength = children?.length
  const NoBlankchatLength = children?.replace(redex, '').length

  const overChatLength = BlankChatLength - NoBlankchatLength
  return (
    <StyledBubble {...props} user={user}>
      {NoBlankchatLength <= 100
        ? children
        : children?.substring(0, 100 + overChatLength)}
    </StyledBubble>
  )
}

const StyledBubble = styled.div<StyledBubbleProps>`
  display: inline-block;
  word-break: break-all;
  max-width: 332px;
  max-height: 144px;
  height: 100%;
  line-height: 24px;
  color: ${({ user, theme }): string =>
    user === 'sender'
      ? theme.colors.grayScale.white
      : theme.colors.grayScale.gray90};
  font-size: 14px;
  font-weight: 400;
  background-color: ${({ user, theme }): string =>
    user === 'sender'
      ? theme.colors.brand.primary
      : theme.colors.grayScale.white};
  border-radius: ${({ user }): string =>
    user === 'sender' ? '16px 0px 16px 16px' : '0px 16px 16px 16px'};

  padding: 12px 16px;
`