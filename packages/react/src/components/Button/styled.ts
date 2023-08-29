import { css } from '@emotion/react'
import type { Theme, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon as IconComponent } from '@offer-ui/components'
import type {
  ButtonSize,
  ButtonStyleType
} from '@offer-ui/components/Button/types'
import { BUTTON_STYLE_KEYS } from './types'
import type { StyledButtonProps, StyledIconProps } from './types'

const FONT_COLOR = {
  ghost: 'grayScale50',
  outline: 'grayScale90',
  solidPrimary: 'white',
  solidSub: 'grayScale90'
} as const

const applyButtonSizeStyle = (
  theme: Theme,
  styleType: ButtonStyleType,
  size: ButtonSize,
  width: string
): SerializedStyles => {
  const { round100, round4 } = theme.radius

  switch (size) {
    case 'medium':
      return css`
        width: ${width};
        height: 48px;
        border-radius: ${styleType.indexOf('outline') >= 0 && round100};
      `
    case 'small':
      return css`
        display: inline-flex;
        height: 32px;
        padding: 4px 8px;
        border-radius: ${round4};
      `
    case 'large':
    default:
      return css`
        width: ${width};
        height: 64px;
      `
  }
}

const applyButtonColor = (
  theme: Theme,
  styleType: ButtonStyleType
): SerializedStyles => {
  const { grayScale20, grayScale30, black, grayScale05, white } = theme.colors
  const { SOLID_PRIMARY, SOLID_SUB, OUTLINE, GHOST } = BUTTON_STYLE_KEYS

  switch (styleType) {
    case SOLID_SUB:
      return css`
        background-color: ${grayScale05};
        &:disabled {
          background-color: ${grayScale20};
          color: ${white};

          cursor: default;

          svg {
            color: ${white};
          }
        }
      `
    case OUTLINE:
      return css`
        background-color: ${white};
        border: 1px solid ${grayScale20};
        &:disabled {
          background-color: ${white};
          border: 1px solid ${grayScale20};
          color: ${grayScale30};

          svg {
            color: ${grayScale30};
          }

          cursor: default;
        }
      `
    case GHOST:
      return css`
        background-color: transparent;

        &:disabled {
          cursor: default;
        }
      `
    case SOLID_PRIMARY:
    default:
      return css`
        background-color: ${black};
        &:disabled {
          background-color: ${grayScale20};

          cursor: default;
        }
      `
  }
}

const applyButtonFontColor = (
  theme: Theme,
  styleType: ButtonStyleType
): string => theme.colors[FONT_COLOR[styleType]]

const Button = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  color: ${({ theme, styleType }): string =>
    applyButtonFontColor(theme, styleType)};

  ${({ theme }): string => theme.fonts.body02B}
  ${({ theme, size, styleType, width }): SerializedStyles =>
    applyButtonSizeStyle(theme, styleType, size, width)}
  ${({ theme, styleType }): SerializedStyles =>
    applyButtonColor(theme, styleType)}
`

const Icon = styled(IconComponent)<StyledIconProps>`
  margin-right: 4px;
  color: ${({ theme, styleType }): string =>
    applyButtonFontColor(theme, styleType)};
`

export const Styled = {
  Button,
  Icon
}
