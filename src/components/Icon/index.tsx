import type {
  ActionColorKeys,
  BackgroundColorKeys,
  BrandColorKeys,
  DimColorKeys,
  GrayScaleColorKeys
} from '@styles/themes'
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

export type IconType = keyof typeof ICON_TYPES
interface IconColorOption<Type, Scheme> {
  type: Type
  scheme: Scheme
}
type IconColor =
  | IconColorOption<'action', ActionColorKeys>
  | IconColorOption<'background', BackgroundColorKeys>
  | IconColorOption<'brand', BrandColorKeys>
  | IconColorOption<'dim', DimColorKeys>
  | IconColorOption<'grayScale', GrayScaleColorKeys>
export interface IconProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, 'color'> {
  size?: number
  color?: IconColor
  type: IconType
}

interface StyledIconWrapperProps {
  _color: IconColor
}

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
  color = { scheme: 'black', type: 'grayScale' },
  size = 24,
  ...props
}: IconProps): ReactElement => {
  const IconSvg = ICON_TYPES[type]

  return (
    <StyledIconWrapper _color={color}>
      <IconSvg height={size} width={size} {...props} />
    </StyledIconWrapper>
  )
}

const StyledIconWrapper = styled.i<StyledIconWrapperProps>`
  display: flex;
  color: ${({ theme, _color }): string =>
    `${theme.colors[_color.type][_color.scheme]}`};
`
