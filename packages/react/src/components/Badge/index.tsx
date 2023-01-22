import type { ForwardedRef, HTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import { Text } from '@offer-ui/components/Text'

type BadgeColorType = 'gray' | 'orange' | 'purple'
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Badge 컴포넌트의 색상 타입을 정합니다.
   * @type 'gray' | 'orange' | 'purple'
   */
  colorType: BadgeColorType
  /**
   * Badge 내부에 들어갈 내용을 정합니다.
   * @type ReactNode
   */
  children: Exclude<ReactNode, undefined | null>
}

type StyledBadgeProps = Pick<BadgeProps, 'colorType'>

const BADGE_COLORS = {
  orange: {
    background: 'brandPrimaryWeak',
    text: 'brandPrimary'
  },
  gray: {
    background: 'grayScale10',
    text: 'grayScale50'
  },
  purple: {
    background: 'brandSubWeak',
    text: 'brandSub'
  }
} as const

export const Badge = forwardRef(function Badge(
  { colorType, children, ...props }: BadgeProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledBadge ref={ref} colorType={colorType} {...props}>
      <Text color={BADGE_COLORS[colorType].text} styleType="caption01M">
        {children}
      </Text>
    </StyledBadge>
  )
})

const StyledBadge = styled.div<StyledBadgeProps>`
  display: inline-block;
  min-height: 20px;
  padding: 2px 6px;
  text-align: center;
  font-feature-settings: normal;
  background-color: ${({ colorType, theme }): string =>
    theme.colors[BADGE_COLORS[colorType].background]};
`
