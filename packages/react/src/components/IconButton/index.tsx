import type { HTMLAttributes, ReactElement } from 'react'
import { Icon } from '@components'
import type { IconType } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'

export type IconButtonColorType =
  | 'white'
  | 'black'
  | 'gray30'
  | 'primary'
  | 'primaryWeak'
  | 'sub'
  | 'subWeak'
type IconButtonSize = 'small' | 'medium' | 'large'
type IconButtonShape = 'rounded' | 'square' | 'ghost'

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * IconButton으로 사용될 아이콘의 타입을 정합니다.
   * @type IconType
   */
  icon: IconType
  /**
   * IconButton의 크기를 정합니다.
   * @type 'small' | 'medium' | 'large' | undefined
   */
  size?: IconButtonSize
  /**
   * IconButton의 색상 타입을 정합니다.
   * @type 'white' | 'black' | 'gray30' | 'primary' | 'primaryWeak' | 'sub' | 'subWeak' | undefined
   */
  colorType?: IconButtonColorType
  /**
   * IconButton가 그림자 여부를 정합니다.
   * @type boolean | undefined
   */
  hasShadow?: boolean
  /**
   * IconButton의 모양을 지정합니다.
   * @type 'rounded' | 'square' | 'ghost' | undefined
   */
  shape?: IconButtonShape
}

type StyledIconButtonProps = StyledProps<
  IconButtonProps,
  'size' | 'hasShadow' | 'shape' | 'colorType'
>
type StyledIconProps = StyledProps<StyledIconButtonProps, 'shape'> & {
  colorType: IconButtonColorType
}

const ICON_BUTTON_SIZE = {
  large: {
    BUTTON: 40,
    ICON: 24
  },
  medium: {
    BUTTON: 32,
    ICON: 16
  },
  small: {
    BUTTON: 24,
    ICON: 16
  }
}

export const IconButton = ({
  colorType = 'black',
  size = 'small',
  shape = 'ghost',
  hasShadow = false,
  icon,
  ...props
}: IconButtonProps): ReactElement => {
  return (
    <StyledIconButton
      {...props}
      colorType={colorType}
      hasShadow={hasShadow}
      shape={shape}
      size={size}>
      <StyledIcon
        colorType={colorType}
        shape={shape}
        size={ICON_BUTTON_SIZE[size].ICON}
        type={icon}
      />
    </StyledIconButton>
  )
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;

  ${({ size, theme, shape, hasShadow, colorType }): string => {
    const isGhost = shape === 'ghost'
    const isRounded = shape === 'rounded'

    return `
      width: ${ICON_BUTTON_SIZE[size].BUTTON}px;
      height: ${ICON_BUTTON_SIZE[size].BUTTON}px;
      background-color: ${
        isGhost ? 'transparent' : applyIconButtonColor(colorType, theme)
      };
      border-radius: ${isRounded ? theme.radius.round100 : 'none'};
      box-shadow: ${
        hasShadow && !isGhost
          ? `0px 2px 10px ${theme.colors.dim.opacity25}`
          : 'none'
      };
    `
  }}
`

const StyledIcon = styled(Icon)<StyledIconProps>`
  color: ${({ theme, colorType, shape }): string => {
    const isBlack = shape !== 'ghost' && colorType === 'white'
    const isGhost = shape !== 'ghost'

    if (isBlack) {
      return theme.colors.grayScale.black
    }

    if (isGhost) {
      return theme.colors.grayScale.white
    }

    return applyIconButtonColor(colorType, theme)
  }};
`

const applyIconButtonColor = (
  colorType: IconButtonColorType,
  theme: Theme
): string => {
  const { brand, grayScale } = theme.colors
  const isGrayScale =
    colorType === 'black' || colorType === 'white' || colorType === 'gray30'

  if (isGrayScale) {
    return grayScale[colorType]
  }

  return brand[colorType]
}
