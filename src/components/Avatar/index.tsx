import type { HTMLAttributes, ReactElement } from 'react'
import { ICON } from '@constants'
import { Image } from '@components'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  alt: string
  src: string
  size?: keyof typeof AVATAR_SIZE
}

type StyledBlankAvatarWrapperProps = StyledProps<AvatarProps, 'size'>

export const AVATAR_SIZE = {
  large: '112px',
  medium: '80px',
  small: '46px',
  xsmall: '32px'
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
            boxSize={AVATAR_SIZE[size]}
            radius="100%"
            src={src}
          />
        </div>
      )}
      {isBlank && (
        <StyledBlankAvatarWrapper size={size} {...props}>
          <Image
            alt={alt}
            boxSize="51%"
            objectFit="contain"
            src={ICON.AVATAR}
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
    width: ${AVATAR_SIZE[size]};
    height: ${AVATAR_SIZE[size]};
    background-color: ${theme.colors.grayScale.gray05};
  `}
`
