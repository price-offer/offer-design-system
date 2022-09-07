import type { HTMLAttributes, ReactElement } from 'react'
import type { FontStyleKeys } from '@themes'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  textStyle: FontStyleKeys
  tag?: 'p' | 'span'
  children: string
  color?: string
}

type StyledTextProps = StyledProps<TextProps, 'textStyle' | 'color'>

export const Text = ({
  tag = 'span',
  children,
  textStyle = 'body01M',
  color = 'black'
}: TextProps): ReactElement => {
  return (
    <StyledText as={tag} color={color} textStyle={textStyle}>
      {children}
    </StyledText>
  )
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ color }): string => color};

  ${({ theme, textStyle }): string => theme.fonts[textStyle]};
`
