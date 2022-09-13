import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useImage } from '@hooks'

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none'

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  boxSize: string
  radius?: string
  fallbackSrc?: string
  objectFit?: ObjectFit
}
type StyledImgProps = StyledProps<
  ImageProps,
  'boxSize' | 'radius' | 'objectFit'
>
interface ApplyStyleParams {
  boxSize: string
  radius: string
}
type ApplyStyle = (params: ApplyStyleParams) => string

export const Image = ({
  src,
  fallbackSrc = '',
  objectFit = 'cover',
  boxSize = '276px',
  radius = '0px',
  ...props
}: ImageProps): ReactElement => {
  const { imgRef, isError } = useImage({ fallbackSrc, src })

  return (
    <>
      {isError && <StyledPlaceholder boxSize={boxSize} radius={radius} />}
      {!isError && (
        <StyledImage
          ref={imgRef}
          boxSize={boxSize}
          objectFit={objectFit}
          radius={radius}
          src={src}
          {...props}
        />
      )}
    </>
  )
}

const StyledPlaceholder = styled.div<Omit<StyledImgProps, 'objectFit'>>`
  ${({ boxSize, radius, theme }): string => `
    ${applyStyle({ boxSize, radius })}
    background-color: ${theme.colors.grayScale.gray10}
  `}
`
const StyledImage = styled.img<StyledImgProps>`
  ${({ boxSize, radius, objectFit }): string => `
    ${applyStyle({ boxSize, radius })}
    object-fit: ${objectFit}
  `}
`

const applyStyle: ApplyStyle = ({ radius, boxSize }) => {
  return `
    width: ${boxSize};
    height: ${boxSize};
    border-radius: ${radius};
  `
}
