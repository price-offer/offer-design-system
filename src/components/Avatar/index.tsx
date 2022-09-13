import { ICON } from '@constants'
import { Image } from '@components'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

export interface AvatarProps {
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
  alt = 'avatar',
  src = '',
  size = 'small'
}: AvatarProps): ReactElement => {
  const isBlank = src === ''

  return (
    <>
      {!isBlank && (
        <Image alt={alt} boxSize={AVATAR_SIZE[size]} radius="100%" src={src} />
      )}
      {isBlank && (
        <StyledBlankAvatarWrapper size={size}>
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
