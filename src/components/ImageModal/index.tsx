import type { HTMLAttributes, ReactElement, TouchEventHandler } from 'react'
import { IconButton, Image as ImageComponent } from '@components'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'

interface ImageInfo {
  src: string
  id: string
}
export interface ImageModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * ImageModal의 open/close 상태를 정합니다.
   * @type boolean | undefined
   */
  isOpen?: boolean | undefined

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
}
type ResizeImageInfo = ImageInfo & {
  width: number
  height: number
}

type StyledDIMProps = StyledProps<ImageModalProps, 'isOpen'>
interface StyledImageModalProps {
  isFixedHeight: boolean
  direction: 'top' | 'bottom'
}
interface StyledImageContainerProps {
  currentImageIndex: number
  sumOfHandoverImageWidth: number
}
type StyledImageProps = Pick<StyledImageModalProps, 'isFixedHeight'>
type StyledGradientProps = Pick<StyledImageModalProps, 'direction'>

const DEFAULT_RESIZE_HEIGHT = 640
const IMAGE_GAP_HALF = 6
const TOUCH_START_END_DIFFERENCE = 30
const TOUCH_NAV_TYPE = {
  LEFT: 'left',
  RIGHT: 'right'
} as const
const VALUE_OF_TOUCH_NAV_TYPE = {
  left: -1,
  right: 1
} as const

export const ImageModal = ({
  onClose,
  images,
  isOpen = false,
  name,
  ...props
}: ImageModalProps): ReactElement => {
  const imagesInfo = useRef<ResizeImageInfo[]>([])
  const initImageId = images[0].id
  const [currentImageId, setCurrentImageId] = useState<string>(initImageId)
  const startClientX = useRef<number | null>(null)
  const topElement = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    document.body.append(topElement)

    return () => {
      document.body.removeChild(topElement)
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
            width: (image.width * DEFAULT_RESIZE_HEIGHT) / image.height
          })
        }

        image.onerror = (): void => {
          resolve({
            height: DEFAULT_RESIZE_HEIGHT,
            id,
            src: null,
            width: 500
          })
        }
      })
    })

    imagesInfo.current = (await Promise.all(
      fulfilledImages
    )) as ResizeImageInfo[]
  }

  const getSumOfHandoverImageWidth = (): number =>
    [...imagesInfo.current].reduce(
      (sumImageWidth, currentImage, index, images) => {
        const { id, width } = currentImage

        if (currentImageId === id) {
          images.splice(1)
          return sumImageWidth + width / 2 + IMAGE_GAP_HALF
        }

        return sumImageWidth + width + IMAGE_GAP_HALF
      },
      0
    )

  const getCurrentImageIndex = (): number => {
    return imagesInfo.current.findIndex(({ id }) => currentImageId === id)
  }

  const handleClickIndicator = (id: string): void => {
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

  const calculateSizeRate = (width: number, height: number): number =>
    width / height

  return ReactDOM.createPortal(
    <StyledDIM
      isOpen={isOpen}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}>
      <StyledGradient direction="top" />
      <StyledGradient direction="bottom" />
      <StyledCloseIcon
        colorType="gray30"
        icon="close"
        size="medium"
        onClick={onClose}
      />
      <StyledImageContainer
        {...props}
        currentImageIndex={getCurrentImageIndex()}
        sumOfHandoverImageWidth={getSumOfHandoverImageWidth()}>
        {imagesInfo.current.map(({ src, id, width, height }) => (
          <StyledImage
            key={id}
            alt={`${name}-${id}`}
            height={`${height}px`}
            isFixedHeight={calculateSizeRate(width, height) < 5 / 3}
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
    topElement
  )
}

const StyledDIM = styled.div<StyledDIMProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: ${({ isOpen }): string => (isOpen ? 'flex' : 'none')};
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }): string => theme.zIndex.modal};
  overflow: hidden;
  background-color: ${({ theme }): string => theme.colors.dim.opacity70};

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
    transform: ${({ currentImageIndex }): string =>
      `translate(-${currentImageIndex * 100}vw, 0);`};
  }

  ${({ theme }): string => theme.mediaQuery.tablet} {
    transform: translate((0, 0));
    gap: 0;
    transform: ${({ currentImageIndex }): string =>
      `translate(-${currentImageIndex * 100}vw, 0);`};
  }

  transform: ${({ sumOfHandoverImageWidth }): string =>
    `translate(calc(50vw - ${sumOfHandoverImageWidth}px), 0)}, 0)`};
`

const StyledImage = styled(ImageComponent)<StyledImageProps>`
  height: ${DEFAULT_RESIZE_HEIGHT}px;

  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: 100vw;
    height: auto;
    object-fit: contain;

    ${({ isFixedHeight }): string =>
      isFixedHeight ? `height: 100vh; width:100vw;` : ''}
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    width: 100vw;
    height: 100vw;

    ${({ isFixedHeight }): string =>
      isFixedHeight ? `height: 100vh; width:100vw;` : ''}
  }
`

const StyledCloseIcon = styled(IconButton)`
  position: absolute;
  top: 64px;
  right: 64px;
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
  bottom: 172px;
  left: 50vw;
  transform: translate(-50%, 0);
  z-index: ${({ theme }): string => theme.zIndex.modalIcon};
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

  ${({ theme }): string => `
      background-color: ${theme.colors.grayScale.gray10};
      border-radius: ${theme.radius.round100};
      box-shadow: 0px 0px 4px ${theme.colors.dim.opacity40};
  `}

  &.selected {
    transition: 0.6s ease-out;
    background-color: ${({ theme }): string => theme.colors.grayScale.white};
    opacity: 1;
  }
`

const StyledGradient = styled.div<StyledGradientProps>`
  display: none;
  position: absolute;
  z-index: 350;
  width: 100vw;
  height: 120px;

  ${({ direction, theme }): string =>
    direction === 'top'
      ? `top: 0;
        background: linear-gradient(180deg, ${theme.colors.dim.opacity70} 0%, rgba(0,0,0,0) 100%);`
      : `bottom: 0;
        background: linear-gradient(180deg,  rgba(0,0,0,0) 0%, ${theme.colors.dim.opacity70} 100%);`}

  ${({ theme }): string => theme.mediaQuery.tablet} {
    display: block;
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    display: block;
  }
`
