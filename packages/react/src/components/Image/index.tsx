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
  minWidth?: string
  /** image의 최소 넓이를 정합니다.
   * @type string | undefined
   */
  maxWidth?: string
  /** image의 최대 넓이를 정합니다.
   * @type string | undefined
   */
  height?: string
  /** image의 너비와 높이를 동시에 정합니다.
   * @type string | undefined
   */
  minHeight?: string
  /** image의 최소 높이를 정합니다.
   * @type string | undefined
   */
  maxHeight?: string
  /** image의 최대 높이를 정합니다.
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
  | 'boxSize'
  | 'radius'
  | 'objectFit'
  | 'width'
  | 'height'
  | 'maxHeight'
  | 'maxWidth'
  | 'minWidth'
  | 'minHeight'
>
type ApplyShapeParams = {
  boxSize: string
  radius: string
  width: string
  minWidth: string
  maxWidth: string
  height: string
  minHeight: string
  maxHeight: string
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
    maxWidth = '',
    maxHeight = '',
    minWidth = '',
    minHeight = '',
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
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minHeight={minHeight}
        minWidth={minWidth}
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
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
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
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
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
  ${({ theme, ...props }): string => `
    ${applyShape(props)}
    background-color: ${theme.colors.grayScale10};
  `}
`
const StyledImage = styled.img<StyledImgProps>`
  ${({ objectFit, ...props }): string => `
    ${applyShape(props)}
    object-fit: ${objectFit};
  `}
`

const applyShape: ApplyShape = ({
  radius,
  boxSize,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight
}) => {
  return `
    width: ${width || boxSize};
    min-width: ${minWidth};
    max-width: ${maxWidth};
    height: ${height || boxSize};
    min-height: ${minHeight};
    max-height: ${maxHeight};
    border-radius: ${radius};
  `
}
