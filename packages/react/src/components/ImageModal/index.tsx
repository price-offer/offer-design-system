import type { SerializedStyles } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { IconButton } from '@offer-ui/components/IconButton'
import { Image as ImageComponent } from '@offer-ui/components/Image'
import type { StyledProps } from '@offer-ui/types'
import type { ForwardedRef, HTMLAttributes, TouchEventHandler } from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ImageInfo = {
  id: number
  src: string
}
export type ImageModalProps = {
  /**
   * ImageModal의 open/close 상태를 정합니다.
   * @type boolean | undefined
   */
  isOpen?: boolean
  /**
   * ImageModal에 띄울 이미지들을 정합니다.
   * @type IconType
   */
  images: ImageInfo[]
  /**
   * ImageModal의 이름을 정합니다.
   * @type string
   */
  name: string
  /**
   * ImageModal이 close될 때 실행할 함수를 정합니다.
   * @type (): void | undefined
   */
  onClose?(): void
} & HTMLAttributes<HTMLDivElement>
type ResizeImageInfo = ImageInfo & {
  width: number
  height: number
}

type StyledDIMProps = StyledProps<ImageModalProps, 'isOpen'>
type StyledImageModalProps = {
  isFixedHeight: boolean
  direction: 'top' | 'bottom'
}
type StyledImageContainerProps = {
  currentImageIndex: number
  sumOfHandoverImageWidth: number
}
type StyledImageProps = Pick<StyledImageModalProps, 'isFixedHeight'>
type StyledGradientProps = Pick<StyledImageModalProps, 'direction'>

const DEFAULT_RESIZE_IMAGE = {
  HEIGHT: 640,
  WIDTH: 500
}
const IMAGE_MAX_RATE = 5 / 3
const IMAGE_GAP_HALF = 6
const TOUCH_START_END_DIFFERENCE = 30
const TOUCH_NAV_TYPE = {
  LEFT: 'left',
  RIGHT: 'right'
} as const
const VALUE_OF_TOUCH_NAV_TYPE = {
  left: -1,
  right: 1
}

const calculateSizeRate = (width: number, height: number): number =>
  width / height

export const ImageModal = forwardRef(function ImageModal(
  { onClose, images, isOpen = false, name, ...props }: ImageModalProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const imagesInfo = useRef<ResizeImageInfo[]>([])
  const initImageId = images[0].id
  const [currentImageId, setCurrentImageId] = useState<number>(initImageId)
  const startClientX = useRef<number | null>(null)
  const topElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const divElement = document.createElement('div')

    topElement.current = divElement
    document.body.append(divElement)

    return (): void => {
      topElement.current && document.body.removeChild(topElement.current)
    }
  }, [])

  useEffect(() => {
    getImagesInfo()
  }, [images])

  useEffect(() => {
    isOpen && setCurrentImageId(initImageId)
  }, [isOpen])

  const getImagesInfo = async (): Promise<void> => {
    const fulfilledImages = images.map(({ src, id }) => {
      const image = new Image()
      image.src = src

      return new Promise(resolve => {
        image.onload = (): void => {
          resolve({
            height: image.height,
            id,
            src,
            width: (image.width * DEFAULT_RESIZE_IMAGE.HEIGHT) / image.height
          })
        }

        image.onerror = (): void => {
          resolve({
            height: DEFAULT_RESIZE_IMAGE.HEIGHT,
            id,
            src: null,
            width: DEFAULT_RESIZE_IMAGE.WIDTH
          })
        }
      })
    })

    imagesInfo.current = (await Promise.all(
      fulfilledImages
    )) as ResizeImageInfo[]
  }

  const getSumOfHandoverImageWidth = (): number => {
    let sumImageWidth = 0
    const imageCount = imagesInfo.current.length

    for (let i = 0; i < imageCount; i++) {
      const { id, width } = imagesInfo.current[i]

      if (currentImageId === id) {
        sumImageWidth += width / 2 + IMAGE_GAP_HALF

        return sumImageWidth
      }

      sumImageWidth += width + IMAGE_GAP_HALF
    }

    return sumImageWidth
  }

  const getCurrentImageIndex = (): number =>
    imagesInfo.current.findIndex(({ id }) => currentImageId === id)

  const handleClickIndicator = (id: number): void => {
    setCurrentImageId(id)
  }

  const handleTouchStart: TouchEventHandler = (e): void => {
    if (startClientX.current === null) {
      startClientX.current = e.changedTouches[0].pageX
    }
  }

  const handleTouchEnd: TouchEventHandler = (e): void => {
    const images = imagesInfo.current
    const prevTouchX = startClientX.current
    const currentTouchX = e.changedTouches[0].pageX
    const currentImageIndex = getCurrentImageIndex()
    const isNotMoved = !prevTouchX

    if (isNotMoved) {
      return
    }

    const isRight = prevTouchX - currentTouchX > TOUCH_START_END_DIFFERENCE
    const touchNavType = isRight ? TOUCH_NAV_TYPE.RIGHT : TOUCH_NAV_TYPE.LEFT
    const newCurrentImage =
      images[currentImageIndex + VALUE_OF_TOUCH_NAV_TYPE[touchNavType]]
    const defaultImageId = isRight ? images[0].id : images[images.length - 1].id
    const newCurrentImageId = newCurrentImage?.id || defaultImageId

    setCurrentImageId(newCurrentImageId)
  }

  return topElement.current
    ? createPortal(
        <StyledDIM
          isOpen={isOpen}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}>
          <StyledGradient direction="top" />
          <StyledGradient direction="bottom" />
          <StyledCloseIcon
            color="grayScale30"
            icon="close"
            size={24}
            onClick={onClose}
          />
          <StyledImageContainer
            {...props}
            ref={ref}
            currentImageIndex={getCurrentImageIndex()}
            sumOfHandoverImageWidth={getSumOfHandoverImageWidth()}>
            {imagesInfo.current.map(({ src, id, width, height }) => (
              <StyledImage
                key={id}
                alt={`${name}-${id}`}
                height={`${height}px`}
                isFixedHeight={
                  calculateSizeRate(width, height) < IMAGE_MAX_RATE
                }
                src={src}
                width={`${width}px`}
              />
            ))}
          </StyledImageContainer>
          {imagesInfo.current.length > 1 && (
            <StyledIndicatorBox>
              {imagesInfo.current.map(({ id }) => (
                <StyledIndicator
                  key={id}
                  className={currentImageId === id ? 'selected' : ''}
                  onClick={(): void => {
                    handleClickIndicator(id)
                  }}
                />
              ))}
            </StyledIndicatorBox>
          )}
        </StyledDIM>,
        topElement.current
      )
    : null
})

const StyledDIM = styled.div<StyledDIMProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: ${({ isOpen }): string => (isOpen ? 'flex' : 'none')};
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }): number => theme.zIndex.modal};
  overflow: hidden;
  background-color: ${({ theme }): string => theme.colors.dimOpacity70};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    background: linear-gradient();
  }
`

const StyledImageContainer = styled.div<StyledImageContainerProps>`
  display: flex;
  gap: 12px;
  transition: 0.6s ease-in-out;

  ${({ theme }): string => theme.mediaQuery.mobile} {
    transform: translate((0, 0));
    gap: 0;
    transform: ${({ currentImageIndex }): SerializedStyles =>
      css`translate(-${currentImageIndex * 100}vw, 0);`};
  }

  ${({ theme }): string => theme.mediaQuery.tablet} {
    transform: translate((0, 0));
    gap: 0;
    transform: ${({ currentImageIndex }): SerializedStyles =>
      css`translate(-${currentImageIndex * 100}vw, 0);`};
  }

  transform: ${({ sumOfHandoverImageWidth }): SerializedStyles =>
    css`translate(calc(50vw - ${sumOfHandoverImageWidth}px), 0)}, 0)`};
`

const StyledImage = styled(ImageComponent)<StyledImageProps>`
  height: ${DEFAULT_RESIZE_IMAGE.HEIGHT}px;

  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: 100vw;
    height: auto;
    object-fit: contain;

    ${({ isFixedHeight }): SerializedStyles =>
      isFixedHeight
        ? css`
            height: 100vh;
            width: 100vw;
          `
        : css``}
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    width: 100vw;
    height: 100vw;

    ${({ isFixedHeight }): SerializedStyles =>
      isFixedHeight
        ? css`
            height: 100vh;
            width: 100vw;
          `
        : css``}
  }
`

const StyledCloseIcon = styled(IconButton)`
  position: absolute;
  top: 5%;
  right: 6%;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${({ theme }): string => `
    z-index: ${theme.zIndex.modalIcon};
  `}

  ${({ theme }): string => theme.mediaQuery.mobile} {
    top: 54px;
    right: 22px;
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    top: 35px;
    right: 16px;
  }
`

const StyledIndicatorBox = styled.div`
  position: absolute;
  bottom: 7%;
  left: 50vw;
  transform: translate(-50%, 0);
  z-index: ${({ theme }): number => theme.zIndex.modalIcon};
  display: flex;
  gap: 8px;

  ${({ theme }): string => theme.mediaQuery.tablet} {
    bottom: 53px;
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    bottom: 52px;
  }
`

const StyledIndicator = styled.div`
  width: 8px;
  height: 8px;
  opacity: 0.3;
  font-size: 20px;
  cursor: pointer;

  ${({ theme }): SerializedStyles => css`
    background-color: ${theme.colors.grayScale10};
    border-radius: ${theme.radius.round100};
    box-shadow: 0px 0px 4px ${theme.colors.dimOpacity40};
  `}

  &.selected {
    transition: 0.6s ease-out;
    background-color: ${({ theme }): string => theme.colors.white};
    opacity: 1;
  }
`

const StyledGradient = styled.div<StyledGradientProps>`
  display: none;
  position: absolute;
  z-index: 350;
  width: 100vw;
  height: 120px;

  ${({ direction, theme }): SerializedStyles =>
    direction === 'top'
      ? css`
          top: 0;
          background: linear-gradient(
            180deg,
            ${theme.colors.dimOpacity70} 0%,
            rgba(0, 0, 0, 0) 100%
          );
        `
      : css`
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            ${theme.colors.dimOpacity70} 100%
          );
        `}

  ${({ theme }): string => theme.mediaQuery.tablet} {
    display: block;
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    display: block;
  }
`
