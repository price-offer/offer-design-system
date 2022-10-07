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
} from '@constants/icons'
import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export type IconType = keyof typeof ICON_TYPES
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  size?: number
  color?: string
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

export const Icon = ({
  type,
  size = 24,
  color = 'black',
  ...props
}: IconProps): ReactElement => {
  const IconSvg = ICON_TYPES[type]

  return (
    <StyledIconWrapper color={color}>
      <IconSvg height={size} width={size} {...props} />
    </StyledIconWrapper>
  )
}

const StyledIconWrapper = styled.i<StyledIconWrapperProps>`
  display: flex;
  color: ${({ color }): string => color};
`
