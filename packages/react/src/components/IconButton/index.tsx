import type { ButtonHTMLAttributes, ForwardedRef } from 'react'
import type { ColorKeys } from '@offer-ui/themes'
import { forwardRef } from 'react'
import { Icon } from '@offer-ui/components/Icon'
import type { IconType } from '@offer-ui/components/Icon'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'

export type IconButtonColorType = Extract<
  ColorKeys,
  | 'gsWhite'
  | 'gsBlack'
  | 'gsGray30'
  | 'brandPrimary'
  | 'brandPrimaryWeak'
  | 'brandSub'
  | 'brandSubWeak'
>
type IconButtonSize = 'small' | 'medium' | 'large'
type IconButtonShape = 'rounded' | 'square' | 'ghost'

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
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

export const IconButton = forwardRef(function IconButton(
  {
    colorType = 'gsBlack',
    size = 'small',
    shape = 'ghost',
    hasShadow = false,
    icon,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledIconButton
      {...props}
      ref={ref}
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
})

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
      background-color: ${isGhost ? 'transparent' : theme.colors[colorType]};
      border-radius: ${isRounded ? theme.radius.round100 : 'none'};
      box-shadow: ${
        hasShadow && !isGhost
          ? `0px 2px 10px ${theme.colors.dimOpacity25}`
          : 'none'
      };
    `
  }}
`

const StyledIcon = styled(Icon)<StyledIconProps>`
  color: ${({ theme, colorType, shape }): string => {
    const isBlack = shape !== 'ghost' && colorType === 'gsWhite'
    const isGhost = shape !== 'ghost'

    if (isBlack) {
      return theme.colors.gsBlack
    }

    if (isGhost) {
      return theme.colors.gsWhite
    }

    return theme.colors[colorType]
  }};
`
