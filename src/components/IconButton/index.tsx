import type { HTMLAttributes, MouseEventHandler, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useState } from 'react'

type IconButtonStyle =
  typeof ICON_BUTTON_STYLE_KEYS[keyof typeof ICON_BUTTON_STYLE_KEYS]
export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  iconButtonStyle?: IconButtonStyle
  onClick?: MouseEventHandler
}
type IconButtonStyleSheet = {
  [key in IconButtonStyle]: {
    iconUrl: string
    size: number
    toggleIconUrl?: string
  }
}
type StyledIconButtonProps = StyledProps<IconButtonProps, 'iconButtonStyle'> & {
  size: number
  isToggle: boolean
}

export const ICON_BUTTON_STYLE_KEYS = {
  CHEVRON_LEFT: 'chevronLeft',
  CHEVRON_RIGHT: 'chevronRight',
  FAB: 'FAB',
  HEART: 'heart'
} as const
const ICON_BUTTON_STYLE_SHEET: IconButtonStyleSheet = {
  FAB: {
    iconUrl: ICON.ARROW_UP_24,
    size: 40
  },
  chevronLeft: {
    iconUrl: ICON.CHEVRON_LEFT_16,
    size: 24
  },
  chevronRight: {
    iconUrl: ICON.CHEVRON_RIGHT_16,
    size: 24
  },
  heart: {
    iconUrl: ICON.HEART_16,
    size: 24,
    toggleIconUrl: ICON.HEART_ACTIVE_16
  }
} as const

export const IconButton = ({
  iconButtonStyle = 'heart',
  onClick
}: IconButtonProps): ReactElement => {
  const {
    iconUrl,
    size,
    toggleIconUrl = ''
  } = ICON_BUTTON_STYLE_SHEET[iconButtonStyle]
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const renderIcon = isToggle ? toggleIconUrl : iconUrl

  const handleClick: MouseEventHandler = e => {
    onClick && onClick(e)

    if (!toggleIconUrl) {
      return
    }

    setIsToggle(!isToggle)
  }

  return (
    <StyledIconButton
      iconButtonStyle={iconButtonStyle}
      isToggle={isToggle}
      size={size}
      onClick={handleClick}>
      <img alt="icon-button" src={renderIcon} />
    </StyledIconButton>
  )
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }): string => `${size}px`};
  height: ${({ size }): string => `${size}px`};
  background-color: white;
  border-radius: ${({ theme }): string => theme.radius.round100};
  border: none;
  cursor: pointer;

  ${({ theme, iconButtonStyle, isToggle }): string => {
    switch (iconButtonStyle) {
      case ICON_BUTTON_STYLE_KEYS.HEART:
        return `
         ${
           !isToggle &&
           `img{filter: ${
             hexToCSSFilter(theme.colors.grayScale.gray20).filter
           };}`
         }
        `
      default:
        return `
          box-shadow: 0px 2px 10px ${theme.colors.dim.opacity25};
        `
    }
  }};
`
