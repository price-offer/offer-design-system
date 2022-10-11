import type {
  IconButtonColorType,
  IconButtonProps,
  IconType
} from '@components'
import type { MouseEventHandler, ReactElement } from 'react'
import { IconButton } from '@components'
import { useState } from 'react'

type FillIconType = Extract<
  IconType,
  'checkCircle' | 'heart' | 'meh' | 'sad' | 'smile'
>
interface FillToggleButton {
  /**
   * ToggleButton의 스타일 타입을 정합니다.
   * @type 'fill'
   */
  type: 'fill'

  /**
   * ToggleButton의 type이 'fill'인 경우 사용 가능한 아이콘 타입을 정합니다.
   * @type "checkCircle" | "heart" | "meh" | "sad" | "smile" | undefined
   */
  icon: FillIconType
}
interface StrokeToggleButton {
  /**
   * ToggleButton으로 아이콘의 타입을 정합니다.
   * @type 'stroke'
   */
  type: 'stroke'

  /**
   * ToggleButton.
   * @type IconType
   */
  icon: IconType
}
export type ToggleButtonProps = IconButtonProps & {
  /**
   * ToggleButton의 색상 타입을 정합니다.
   * @type 'white' | 'black' | 'gray30' | 'primary' | 'primaryWeak' | 'sub' | 'subWeak' | undefined
   */
  colorType?: IconButtonColorType

  /**
   * ToggleButton이 toggle된 경우의 색상 타입을 정합니다.
   * @type 'white' | 'black' | 'gray30' | 'primary' | 'primaryWeak' | 'sub' | 'subWeak' | undefined
   */
  toggleColorType?: IconButtonColorType
} & ToggleButtonType

type ToggleButtonType = FillToggleButton | StrokeToggleButton

export const ToggleButton = ({
  onClick,
  type = 'stroke',
  colorType = 'black',
  toggleColorType = colorType,
  icon,
  ...props
}: ToggleButtonProps): ReactElement => {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const isFillType = type === 'fill'
  const toggleIcon = isFillType ? `${icon}Fill` : icon
  const renderIcon = {
    color: isToggle ? toggleColorType : colorType,
    icon: isToggle ? toggleIcon : icon
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    onClick?.(e)

    setIsToggle(!isToggle)
  }

  return (
    <IconButton
      colorType={renderIcon.color}
      icon={renderIcon.icon as IconType}
      onClick={handleClick}
      {...props}
    />
  )
}
