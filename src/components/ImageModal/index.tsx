import type { MouseEventHandler, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useState } from 'react'

export interface ImageModalProps {
  parentElement: HTMLElement
  isOpen?: boolean
  images: ImageInfo[]
  name: string
  onClose?(): void
}

interface ImageInfo {
  src: string
  id: string
}
interface TranslateValue {
  imageWidth: number
  imageCount: number
}

type StyledDIMProps = StyledProps<ImageModalProps, 'isOpen'>
interface StyledImageContainerProps {
  translateValue: TranslateValue
}
interface StyledImageProps {
  isFixedHeight: boolean
}

interface StyledGradientProps {
  direction: 'top' | 'bottom'
}

const RESIZE_HEIGHT = 640
const IMAGE_GAP_HALF = 6

export const ImageModal = ({
  onClose,
  parentElement,
  images,
  isOpen = false,
  name
}: ImageModalProps): ReactElement => {
  const imagesInfo = images.map(({ src, id }) => {
    const image = new Image()
    image.src = src
    const height = image.height
    const resizeWidth = image.width * (RESIZE_HEIGHT / height)

    return {
      height,
      id,
      resizeWidth,
      src
    }
  })
  const firstImageWidth = imagesInfo[0].resizeWidth / 2 + IMAGE_GAP_HALF
  const firstImageId = imagesInfo[0].id
  const initialTranslateValue = {
    imageCount: 0,
    imageWidth: firstImageWidth
  }
  const [translateValue, setTranslateValue] = useState<TranslateValue>(
    initialTranslateValue
  )
  const [selectedImageId, setSelectedImageId] = useState<string>(firstImageId)

  const handleCloseModal = (): void => {
    onClose?.()

    setSelectedImageId(firstImageId)
    setTranslateValue(initialTranslateValue)
  }

  const handleClickIndicator: MouseEventHandler<HTMLDivElement> = (e): void => {
    const selectedId = e.currentTarget.dataset.id || ''
    const nextTranslateValue = [...imagesInfo].reduce(
      (sumValue, currentImage, idx, images) => {
        const { imageWidth: prevImageWidth } = sumValue
        const { id } = currentImage
        const resizeImageWidth = imagesInfo[idx].resizeWidth

        if (id === selectedId) {
          // for early return
          images.splice(1)
          return {
            imageCount: idx,
            imageWidth: prevImageWidth + resizeImageWidth / 2 + IMAGE_GAP_HALF
          }
        }

        return {
          imageCount: idx,
          imageWidth: prevImageWidth + resizeImageWidth + IMAGE_GAP_HALF
        }
      },
      {
        imageCount: 0,
        imageWidth: 0
      }
    )

    setSelectedImageId(selectedId)
    setTranslateValue(nextTranslateValue)
  }

  const calculateSizeRate = (width: number, height: number): number =>
    width / height

  return ReactDOM.createPortal(
    <StyledDIM isOpen={isOpen}>
      <StyledGradient direction="top" />
      <StyledGradient direction="bottom" />
      <StyledCloseIcon onClick={handleCloseModal}>
        <img alt="close-button" src={ICON.CLOSE_24} />
      </StyledCloseIcon>
      <StyledImageModal>
        <StyledImageContainer translateValue={translateValue}>
          {imagesInfo.map(({ src, id, resizeWidth, height }) => (
            <StyledImage
              key={id}
              alt={`${name}-${id}`}
              isFixedHeight={calculateSizeRate(resizeWidth, height) < 5 / 3}
              src={src}
            />
          ))}
        </StyledImageContainer>
        {imagesInfo.length > 1 && (
          <StyledIndicatorBox>
            {imagesInfo.map(({ id }) => (
              <StyledIndicator
                key={id}
                className={selectedImageId === id ? 'selected' : ''}
                data-id={id}
                onClick={handleClickIndicator}
              />
            ))}
          </StyledIndicatorBox>
        )}
      </StyledImageModal>
    </StyledDIM>,
    parentElement
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
  background-color: ${({ theme }): string => theme.colors.dim.opacity70};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    background: linear-gradient();
  }
`

const StyledImageModal = styled.div`
  width: 0;
  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: auto;
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    width: auto;
  }
`

const StyledImageContainer = styled.div<StyledImageContainerProps>`
  display: flex;
  gap: 12px;
  transition: 0.6s ease-in-out;

  ${({ theme }): string => theme.mediaQuery.mobile} {
    transform: translate((0, 0));
    gap: 0;
    transform: ${({ translateValue }): string =>
      `translate(-${translateValue.imageCount * 100}vw, 0);`};
  }

  ${({ theme }): string => theme.mediaQuery.tablet} {
    transform: translate((0, 0));
    gap: 0;
    transform: ${({ translateValue }): string =>
      `translate(-${translateValue.imageCount * 100}vw, 0);`};
  }

  transform: ${({ translateValue }): string =>
    `translate(calc(50vw - ${translateValue.imageWidth}px), 0)}, 0)`};
`

const StyledImage = styled.img<StyledImageProps>`
  height: ${RESIZE_HEIGHT}px;

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

const StyledCloseIcon = styled.button`
  position: absolute;
  top: 64px;
  right: 64px;
  padding: 0;
  z-index: ${({ theme }): string => theme.zIndex.modalIcon};
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    filter: ${({ theme }): string =>
      hexToCSSFilter(theme.colors.grayScale.gray30).filter};
  }

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
  background-color: ${({ theme }): string => theme.colors.grayScale.gray10};
  opacity: 0.3;
  font-size: 20px;
  border-radius: ${({ theme }): string => theme.radius.round100};
  box-shadow: ${({ theme }): string =>
    `0px 0px 4px ${theme.colors.dim.opacity40}`};
  cursor: pointer;

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
