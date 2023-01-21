import type { ForwardedRef, MouseEventHandler } from 'react'
import { forwardRef, useState } from 'react'
import type { ColorKeys } from '@offer-ui/styles/themes'
import { IconButton } from '@offer-ui/components/IconButton'
import type { IconButtonProps } from '@offer-ui/components/IconButton'
import type { IconType } from '@offer-ui/components/Icon'

export interface ToggleButtonProps extends IconButtonProps {
  /**
   * ToggleButton이 toggle된 경우의 아이콘 타입을 정합니다.
   * @type IconType | undefined
   */
  toggleIcon?: IconType
  /**
   * ToggleButton이 toggle된 경우의 색상을 정합니다.
   * @type ColorKeys | undefined
   */
  toggleColor?: ColorKeys
  /**
   * ToggleButton이 토글 기본 상태를 정합니다.
   * @type boolean | undefined
   */
  isToggle?: boolean
}

export const ToggleButton = forwardRef(function ToggleButton(
  {
    onClick,
    icon,
    color = 'black',
    toggleColor = color,
    toggleIcon = icon,
    isToggle: defaultIsToggle = false,
    ...props
  }: ToggleButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [isToggle, setIsToggle] = useState<boolean>(defaultIsToggle)
  const renderIcon = {
    color: isToggle ? toggleColor : color,
    icon: isToggle ? toggleIcon : icon
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    onClick?.(e)

    setIsToggle(!isToggle)
  }

  return (
    <IconButton
      ref={ref}
      color={renderIcon.color}
      icon={renderIcon.icon}
      onClick={handleClick}
      {...props}
    />
  )
})
