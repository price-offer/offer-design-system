import {
  ArrowLeft,
  ArrowUp,
  Avatar,
  Box,
  Camera,
  Check,
  CheckCircle,
  CheckCircleFill,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Close,
  Filter,
  Google,
  Heart,
  HeartFill,
  Kakao,
  Meh,
  MehFill,
  Menu,
  Message,
  More,
  Picture,
  Refresh,
  Sad,
  SadFill,
  Search,
  Setting,
  Smile,
  SmileFill,
  Store,
  TriangleDown
} from '@offer-ui/constants/icons'
import type { ForwardedRef, SVGAttributes } from 'react'
import type { ColorKeys } from '@offer-ui/themes'
import { forwardRef } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@offer-ui/types'

export type IconType = keyof typeof ICON_TYPES
export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  /**
   * Icon의 크기를 정합니다.
   * @type number | undefined
   */
  size?: number
  /**
   * Icon의 색상을 정합니다.
   * @type ColorKeys | undefined
   */
  color?: ColorKeys
  /**
   * Icon의 타입을 정합니다.
   * @type IconType
   */
  type: IconType
}

type StyledIconWrapperProps = StyledProps<IconProps, 'color'>
export const ICON_TYPES = {
  arrowLeft: ArrowLeft,
  arrowUp: ArrowUp,
  avatar: Avatar,
  box: Box,
  camera: Camera,
  check: Check,
  checkCircle: CheckCircle,
  checkCircleFill: CheckCircleFill,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clock: Clock,
  close: Close,
  filter: Filter,
  google: Google,
  heart: Heart,
  heartFill: HeartFill,
  kakao: Kakao,
  meh: Meh,
  mehFill: MehFill,
  menu: Menu,
  message: Message,
  more: More,
  picture: Picture,
  refresh: Refresh,
  sad: Sad,
  sadFill: SadFill,
  search: Search,
  setting: Setting,
  smile: Smile,
  smileFill: SmileFill,
  store: Store,
  triangleDown: TriangleDown
} as const

export const Icon = forwardRef(function Icon(
  { type, size = 24, color = 'gsBlack', ...props }: IconProps,
  ref: ForwardedRef<SVGSVGElement>
) {
  const IconSvg = ICON_TYPES[type]

  return (
    <StyledIconWrapper color={color}>
      <IconSvg ref={ref} height={size} width={size} {...props} />
    </StyledIconWrapper>
  )
})

const StyledIconWrapper = styled.i<StyledIconWrapperProps>`
  display: flex;
  color: ${({ theme, color }): string => theme.colors[color]};
`
