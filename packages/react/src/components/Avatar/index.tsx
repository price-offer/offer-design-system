import type { SerializedStyles } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@offer-ui/components/Icon'
import { Image } from '@offer-ui/components/Image'
import type { StyledProps } from '@offer-ui/types'
import type { ForwardedRef, HTMLAttributes } from 'react'
import { forwardRef } from 'react'

export type AvatarProps = {
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
} & HTMLAttributes<HTMLDivElement>

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

export const Avatar = forwardRef(function Avatar(
  { alt, src, size = 'small', ...props }: AvatarProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const isBlank = src === ''

  return (
    <>
      {!isBlank && (
        <div ref={ref} {...props}>
          <Image
            alt={alt}
            boxSize={AVATAR_WRAPPER_SIZE[size]}
            radius="100%"
            src={src}
          />
        </div>
      )}
      {isBlank && (
        <StyledBlankAvatarWrapper ref={ref} size={size} {...props}>
          <Icon
            color="grayScale20"
            size={AVATAR_IMAGE_SIZE[size]}
            type="avatar"
          />
        </StyledBlankAvatarWrapper>
      )}
    </>
  )
})

const StyledBlankAvatarWrapper = styled.div<StyledBlankAvatarWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  ${({ theme, size }): SerializedStyles => css`
    width: ${AVATAR_WRAPPER_SIZE[size]};
    height: ${AVATAR_WRAPPER_SIZE[size]};
    min-width: ${AVATAR_WRAPPER_SIZE[size]};
    min-height: ${AVATAR_WRAPPER_SIZE[size]};
    max-width: ${AVATAR_WRAPPER_SIZE[size]};
    max-height: ${AVATAR_WRAPPER_SIZE[size]};
    background-color: ${theme.colors.grayScale05};
  `}
`
