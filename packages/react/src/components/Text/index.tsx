import type { HTMLAttributes, ReactElement } from 'react'
import type { FontStyleKeys } from '@themes'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Text의 스타일을 정합니다.
   * @type FontStyleKeys
   */
  styleType: FontStyleKeys
  /**
   * Text의 태그를 정합니다.
   * @type 'p' | 'span' | undefined
   */
  tag?: 'p' | 'span'
  /**
   * Text로 작성할 문자열을 정합니다.
   * @type string
   */
  children: string
  /**
   * Text의 색상을 정합니다.
   * @type string | undefined
   */
  color?: string
}

type StyledTextProps = StyledProps<TextProps, 'styleType' | 'color'>

export const Text = ({
  tag = 'span',
  children,
  styleType: textStyle = 'body01M',
  color = 'black'
}: TextProps): ReactElement => {
  return (
    <StyledText as={tag} color={color} styleType={textStyle}>
      {children}
    </StyledText>
  )
}

const StyledText = styled.span<StyledTextProps>`
  color: ${({ color }): string => color};

  ${({ theme, styleType }): string => theme.fonts[styleType]};
`
