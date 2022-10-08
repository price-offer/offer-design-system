import type { IconButtonColor, IconButtonProps, IconType } from '@components'
import type { MouseEventHandler, ReactElement } from 'react'
import { IconButton } from '@components'
import { useState } from 'react'

export type ToggleButtonProps = Omit<IconButtonProps, 'icon' | 'color'> & {
  defaultIcon: IconType
  defaultColor?: IconButtonColor
  toggleIcon?: IconType
  toggleColor?: IconButtonColor
}

export const ToggleButton = ({
  onClick,
  defaultIcon,
  defaultColor = 'black',
  toggleColor = 'black',
  toggleIcon = defaultIcon,
  ...props
}: ToggleButtonProps): ReactElement => {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const renderIcon = {
    color: isToggle ? toggleColor : defaultColor,
    icon: isToggle ? toggleIcon : defaultIcon
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    onClick && onClick(e)

    setIsToggle(!isToggle)
  }

  return (
    <IconButton
      color={renderIcon.color}
      icon={renderIcon.icon}
      onClick={handleClick}
      {...props}
    />
  )
}
