import type { HTMLAttributes, ReactElement } from 'react'
import type { FontStyleKeys } from '@themes'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  styleType: FontStyleKeys
  tag?: 'p' | 'span'
  children: string
  color?: string
}

type StyledTextProps = StyledProps<TextProps, 'styleType' | 'color'>

export const Text = ({
  tag = 'span',
  children,
  styleType: textStyle = 'body01M',
  color = '',
  ...props
}: TextProps): ReactElement => {
  return (
    <StyledText as={tag} color={color} styleType={textStyle} {...props}>
      {children}
    </StyledText>
  )
}

const StyledText = styled.span<StyledTextProps>`
  ${({ color }): string => (color ? `color: ${color}` : '')};

  ${({ theme, styleType }): string => theme.fonts[styleType]};
`
