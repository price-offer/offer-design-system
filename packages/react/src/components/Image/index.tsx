import styled from '@emotion/styled'
import { useImage } from '@offer-ui/hooks'
import type { StyledProps } from '@offer-ui/types'
import type { ForwardedRef, ImgHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none'

export type ImageProps = {
  /** image의 alt 속성을 정합니다.
   * @type string
   */
  alt: string
  /** image의 src 속성을 정합니다.
   * @type string
   */
  src: string
  /** image의 너비를 정합니다.
   * @type string | undefined
   */
  width?: string
  /** image의 높이를 정합니다.
   * @type string | undefined
   */
  height?: string
  /** image의 너비와 높이를 동시에 정합니다.
   * @type string | undefined
   */
  boxSize?: string
  /** image의 border-radius 속성을 정합니다.
   * @type string | undefined
   */
  radius?: string
  /** image의 src에서 오류 발생 시, 대체할 src 속성을 정합니다.
   * @type string | undefined
   */
  fallbackSrc?: string
  /** image의 object-fit 속성을 정합니다.
   * @type "fill" | "contain" | "cover" | "none" | undefined
   */
  objectFit?: ObjectFit
} & ImgHTMLAttributes<HTMLImageElement>

type StyledImgProps = StyledProps<
  ImageProps,
  'boxSize' | 'radius' | 'objectFit' | 'width' | 'height'
>
type ApplyShapeParams = {
  boxSize: string
  radius: string
  width: string
  height: string
}
type ApplyShape = (params: ApplyShapeParams) => string

export const Image = forwardRef(function Image(
  {
    alt,
    src,
    fallbackSrc,
    objectFit = 'cover',
    width = '',
    height = '',
    boxSize = '276px',
    radius = '0px',
    ...props
  }: ImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const { onFallbackError, onLoadImage, status } = useImage({
    fallbackSrc,
    src
  })
  const isLoaded = status === 'loaded'

  const isShowFallback = fallbackSrc && !isLoaded && status !== 'failedFallback'
  if (isShowFallback) {
    return (
      <StyledImage
        ref={ref}
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
          ref={ref as ForwardedRef<HTMLDivElement>}
          boxSize={boxSize}
          height={height}
          radius={radius}
          width={width}
          {...props}
        />
      )}
      {isLoaded && (
        <StyledImage
          ref={ref}
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
})

const StyledPlaceholder = styled.div<Omit<StyledImgProps, 'objectFit'>>`
  ${({ boxSize, radius, theme, width, height }): string => `
    ${applyShape({ boxSize, height, radius, width })}
    background-color: ${theme.colors.grayScale10};
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
