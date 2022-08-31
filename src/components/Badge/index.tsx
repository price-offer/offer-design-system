import type { HTMLAttributes, ReactElement } from 'react'
import type { Colors } from '@themes/colors'
import styled from '@emotion/styled'

type BadgeColorScheme = 'gray' | 'orange' | 'purple'
interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  colorScheme: BadgeColorScheme
}

type StyledBadgeProps = Pick<BadgeProps, 'colorScheme'>
type ApplyColorScheme = (
  colorScheme: BadgeColorScheme,
  colors: Colors
) => string

export const Badge = ({
  colorScheme,
  children,
  ...props
}: BadgeProps): ReactElement => {
  return (
    <StyledBadge colorScheme={colorScheme} {...props}>
      {children}
    </StyledBadge>
  )
}

const applyColorScheme: ApplyColorScheme = (colorScheme, colors) => {
  switch (colorScheme) {
    case 'gray':
      return `
        color: ${colors.grayScale.gray50};
        background: ${colors.grayScale.gray10};
      `
    case 'orange':
      return `
          color: ${colors.brand.primary};
          background: ${colors.brand.primaryWeak};
        `
    case 'purple':
      return `
          color: ${colors.brand.sub};
          background: ${colors.brand.subWeak};
        `
    default:
      return ''
  }
}

const StyledBadge = styled.div<StyledBadgeProps>`
  display: inline-block;
  min-height: 20px;
  padding: 3px 6px 2px 6px;
  text-align: center;
  font-feature-settings: normal;
  ${({ colorScheme, theme }): string =>
    applyColorScheme(colorScheme, theme.colors)};
`
