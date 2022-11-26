import type { HTMLAttributes, ReactElement } from 'react'
import type { Colors } from '@themes/colors'
import styled from '@emotion/styled'

type BadgeColorType = 'gray' | 'orange' | 'purple'
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Badge 컴포넌트의 색상 타입을 정합니다.
   * @type 'gray' | 'orange' | 'purple'
   */
  colorType: BadgeColorType
  /**
   * Badge 내부에 들어갈 내용을 정합니다.
   * @type string
   */
  children: string
}

type StyledBadgeProps = Pick<BadgeProps, 'colorType'>
type ApplyColorScheme = (colorType: BadgeColorType, colors: Colors) => string

export const Badge = ({
  colorType,
  children,
  ...props
}: BadgeProps): ReactElement => {
  return (
    <StyledBadge colorType={colorType} {...props}>
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
  padding: 2px 6px;
  text-align: center;
  font-feature-settings: normal;
  ${({ theme }): string => theme.fonts.caption01M}
  font-weight: 500;
  ${({ colorType: colorScheme, theme }): string =>
    applyColorScheme(colorScheme, theme.colors)};
`
