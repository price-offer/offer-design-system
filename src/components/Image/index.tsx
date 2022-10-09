import type { HTMLAttributes, ReactElement } from 'react'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useImage } from '@hooks'

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none'

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  alt: string
  src: string
  width?: string
  height?: string
  boxSize?: string
  radius?: string
  fallbackSrc?: string
  objectFit?: ObjectFit
}

type StyledImgProps = StyledProps<
  ImageProps,
  'boxSize' | 'radius' | 'objectFit' | 'width' | 'height'
>
interface ApplyShapeParams {
  boxSize: string
  radius: string
  width: string
  height: string
}
type ApplyShape = (params: ApplyShapeParams) => string

export const Image = ({
  alt,
  src,
  fallbackSrc,
  objectFit = 'cover',
  width = '',
  height = '',
  boxSize = '276px',
  radius = '0px',
  ...props
}: ImageProps): ReactElement => {
  const { onFallbackError, onLoadImage, status } = useImage({
    fallbackSrc,
    src
  })
  const isLoaded = status === 'loaded'

  const isShowFallback = fallbackSrc && !isLoaded && status !== 'failedFallback'
  if (isShowFallback) {
    return (
      <StyledImage
        alt={alt}
        boxSize={boxSize}
        height={height}
        objectFit={objectFit}
        radius={radius}
        src={fallbackSrc}
        width={width}
        onError={onFallbackError}
        {...props}
      />
    )
  }

  return (
    <>
      {!isLoaded && (
        <StyledPlaceholder
          boxSize={boxSize}
          height={height}
          radius={radius}
          width={width}
          {...props}
        />
      )}
      {isLoaded && (
        <StyledImage
          alt={alt}
          boxSize={boxSize}
          height={height}
          objectFit={objectFit}
          radius={radius}
          src={src}
          width={width}
          onLoad={onLoadImage}
          {...props}
        />
      )}
    </>
  )
}

const StyledPlaceholder = styled.div<Omit<StyledImgProps, 'objectFit'>>`
  ${({ boxSize, radius, theme, width, height }): string => `
    ${applyShape({ boxSize, height, radius, width })}
    background-color: ${theme.colors.grayScale.gray10};
  `}
`
const StyledImage = styled.img<StyledImgProps>`
  ${({ boxSize, radius, objectFit, width, height }): string => `
    ${applyShape({ boxSize, height, radius, width })}
    object-fit: ${objectFit};
  `}
`

const applyShape: ApplyShape = ({ radius, boxSize, width, height }) => {
  return `
    width: ${width || boxSize};
    height: ${height || boxSize};
    border-radius: ${radius};
  `
}
