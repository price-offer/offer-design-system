import type { HTMLAttributes, MouseEventHandler, ReactElement } from 'react'
import { Icon } from '@components'
import type { IconType } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import type { Theme } from '@emotion/react'
import { useState } from 'react'

type IconButtonColor =
  | 'white'
  | 'black'
  | 'gray30'
  | 'primary'
  | 'primaryWeak'
  | 'sub'
  | 'subWeak'

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler
  type: IconType
  size?: 'small' | 'medium' | 'large'
  color?: IconButtonColor
  toggleType?: IconType
  toggleColor?: IconButtonColor
  hasShadow?: boolean
  iconButtonStyle?: 'rounded' | 'square' | 'ghost'
}

type StyledIconButtonProps = StyledProps<
  IconButtonProps,
  'size' | 'hasShadow' | 'iconButtonStyle'
> & {
  isToggle: boolean
  color: IconButtonColor
}

type StyledIconProps = StyledProps<StyledIconButtonProps, 'iconButtonStyle'> & {
  iconColor: IconButtonColor
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
  onClick,
  type,
  color,
  size = 'small',
  toggleType,
  toggleColor,
  hasShadow = false,
  iconButtonStyle = 'ghost',
  ...props
}: IconButtonProps): ReactElement => {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const isToggleButton = !!toggleType
  const renderIcon =
    isToggleButton && isToggle
      ? {
          color: toggleColor || 'black',
          type: toggleType
        }
      : {
          color: color || 'black',
          type
        }

  const handleClick: MouseEventHandler = e => {
    onClick && onClick(e)

    if (!isToggleButton) {
      return
    }

    setIsToggle(!isToggle)
  }

  return (
    <StyledIconButton
      {...props}
      color={renderIcon?.color}
      hasShadow={hasShadow}
      iconButtonStyle={iconButtonStyle}
      isToggle={isToggle}
      size={size}
      onClick={handleClick}>
      <StyledIcon
        iconButtonStyle={iconButtonStyle}
        iconColor={renderIcon?.color}
        size={ICON_BUTTON_SIZE[size].ICON}
        type={renderIcon?.type}
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

  ${({ size, theme, iconButtonStyle, hasShadow, color }): string => {
    const isGhost = iconButtonStyle === 'ghost'
    const isRounded = iconButtonStyle === 'rounded'

    return `
      width: ${ICON_BUTTON_SIZE[size].BUTTON}px;
      height: ${ICON_BUTTON_SIZE[size].BUTTON}px;
      background-color: ${
        isGhost ? 'transparent' : applyIconButtonColor(color, theme)
      };
      border-radius: ${isRounded ? theme.radius.round100 : 'none'};
      box-shadow: ${
        hasShadow ? `0px 2px 10px ${theme.colors.dim.opacity25}` : 'none'
      };
    `
  }}
`

const StyledIcon = styled(Icon)<StyledIconProps>`
  color: ${({ theme, iconColor, iconButtonStyle }): string => {
    const isBlack = iconButtonStyle !== 'ghost' && iconColor === 'white'
    const isGhost = iconButtonStyle !== 'ghost'

    if (isBlack) {
      return theme.colors.grayScale.black
    }

    if (isGhost) {
      return theme.colors.grayScale.white
    }

    return applyIconButtonColor(iconColor, theme)
  }};
`

const applyIconButtonColor = (color: IconButtonColor, theme: Theme): string => {
  const { brand, grayScale } = theme.colors
  const isGrayScale =
    color === 'black' || color === 'white' || color === 'gray30'

  if (isGrayScale) {
    return grayScale[color]
  }

  return brand[color]
}
