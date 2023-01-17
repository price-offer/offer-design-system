import type { ForwardedRef, MouseEventHandler } from 'react'
import { forwardRef, useState } from 'react'
import type {
  IconButtonColorType,
  IconButtonProps
} from '@offer-ui/components/IconButton'
import { IconButton } from '@offer-ui/components/IconButton'
import type { IconType } from '@offer-ui/components/Icon'

type FillIconType = Extract<
  IconType,
  'checkCircle' | 'heart' | 'meh' | 'sad' | 'smile'
>
interface FillToggleButton {
  /**
   * ToggleButton의 보여질 형태를 정합니다.
   * @type 'fill'
   */
  styleType: 'fill'
  /**
   * ToggleButton의 styleType이 'fill'인 경우 사용 가능한 아이콘 타입을 정합니다.
   * @type "checkCircle" | "heart" | "meh" | "sad" | "smile" | undefined
   */
  icon: FillIconType
}
interface StrokeToggleButton {
  /**
   * ToggleButton의 보여질 형태를 정합니다.
   * @type 'stroke'
   */
  styleType: 'stroke'
  /**
   * ToggleButton의 styleType이 'stoke'인 경우 사용 가능한 아이콘 타입을 정합니다.
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

export const ToggleButton = forwardRef(function ToggleButton(
  {
    onClick,
    styleType = 'stroke',
    colorType = 'gsBlack',
    toggleColorType = colorType,
    icon,
    ...props
  }: ToggleButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [isToggle, setIsToggle] = useState<boolean>(false)
  const isFillType = styleType === 'fill'
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
      ref={ref}
      colorType={renderIcon.color}
      icon={renderIcon.icon as IconType}
      onClick={handleClick}
      {...props}
    />
  )
})
