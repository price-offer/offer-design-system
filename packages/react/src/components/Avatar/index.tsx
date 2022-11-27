import type { HTMLAttributes, ReactElement } from 'react'
import { Icon, Image } from '@components'
import { colors } from '@styles/themes'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Avatar 컴포넌트 이미지의 alt 속성을 정합니다.
   * @type string
   */
  alt: string
  /** Avatar 컴포넌트 이미지의 src 속성을 정합니다.
   * @type string
   */
  src: string
  /** Avatar 컴포넌트 크기를 정합니다.
   * @type "large" | "medium" | "small" | "xsmall" | undefined
   */
  size?: keyof typeof AVATAR_WRAPPER_SIZE
}

type StyledBlankAvatarWrapperProps = StyledProps<AvatarProps, 'size'>

export const AVATAR_WRAPPER_SIZE = {
  large: '112px',
  medium: '80px',
  small: '46px',
  xsmall: '32px'
} as const

const AVATAR_IMAGE_SIZE = {
  large: 55,
  medium: 40,
  small: 23,
  xsmall: 16
} as const

export const Avatar = ({
  alt,
  src,
  size = 'small',
  ...props
}: AvatarProps): ReactElement => {
  const isBlank = src === ''

  return (
    <>
      {!isBlank && (
        <div {...props}>
          <Image
            alt={alt}
            boxSize={AVATAR_WRAPPER_SIZE[size]}
            radius="100%"
            src={src}
          />
        </div>
      )}
      {isBlank && (
        <StyledBlankAvatarWrapper size={size} {...props}>
          <Icon
            color={colors.grayScale.gray20}
            size={AVATAR_IMAGE_SIZE[size]}
            type="avatar"
          />
        </StyledBlankAvatarWrapper>
      )}
    </>
  )
}

const StyledBlankAvatarWrapper = styled.div<StyledBlankAvatarWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  ${({ theme, size }): string => `
    width: ${AVATAR_WRAPPER_SIZE[size]};
    height: ${AVATAR_WRAPPER_SIZE[size]};
    background-color: ${theme.colors.grayScale.gray05};
  `}
`
