import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'
import { theme } from '@offer-ui/themes'
import type { ThemeKeys } from '@offer-ui/themes'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Text의 스타일을 정합니다.
   * @type FontKeys
   */
  styleType: ThemeKeys['fonts']
  /**
   * Text의 태그를 정합니다.
   * @type 'p' | 'span' | undefined
   */
  tag?: 'p' | 'span'
  /**
   * Text로 작성할 문자열을 정합니다.
   * @type string
   */
  children: Exclude<ReactNode, undefined | null>
  /**
   * Text의 색상을 정합니다.
   * @type ColorKeys | undefined
   */
  color?: ThemeKeys['color'] | ''
}

type StyledTextProps = StyledProps<TextProps, 'styleType' | 'color'>

export const Text = forwardRef(function Text(
  {
    tag = 'span',
    children,
    styleType: textStyle = 'body01M',
    color = '',
    ...props
  }: TextProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <StyledText
      ref={ref}
      as={tag}
      color={color}
      styleType={textStyle}
      {...props}>
      {children}
    </StyledText>
  )
})

const StyledText = styled.span<StyledTextProps>`
  color: ${({ color }): string => color && theme.colors[color]};

  ${({ styleType }): string => theme.fonts[styleType]};
`
