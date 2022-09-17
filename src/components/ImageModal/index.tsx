import type { MouseEventHandler, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import type { StyledProps } from '@types'
import { useClickAway } from '@hooks'
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

type StyledDIMProps = StyledProps<ImageModalProps, 'isOpen'>
interface StyledImageContainerProps {
  translateValue: number
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
  const resizeImageWidths = images.map(({ src }) => {
    const image = new Image()
    image.src = src
    const resizeWidth = image.width * (RESIZE_HEIGHT / image.height)

    return resizeWidth
  })
  const firstImageWidth = resizeImageWidths[0] / 2 + IMAGE_GAP_HALF
  const firstImageId = images[0].id
  const [translateValue, setTranslateValue] = useState<number>(firstImageWidth)
  const [selectedImageId, setSelectedImageId] = useState<string>(firstImageId)
  const imageModalRef = useClickAway<HTMLDivElement>(() => {
    handleCloseModal()
  })

  const handleCloseModal = (): void => {
    onClose?.()

    setSelectedImageId(firstImageId)
    setTranslateValue(firstImageWidth)
  }

  const handleClickIndicator: MouseEventHandler<HTMLDivElement> = (e): void => {
    const selectedId = e.currentTarget.dataset.id || ''
    const nextTranslateValue = [...images].reduce(
      (sumValue, currentImage, idx, images) => {
        const { id } = currentImage
        const resizeImageWidth = resizeImageWidths[idx]

        if (id === selectedId) {
          // for early return
          images.splice(1)
          return sumValue + resizeImageWidth / 2 + IMAGE_GAP_HALF
        }

        return sumValue + resizeImageWidth + IMAGE_GAP_HALF
      },
      0
    )

    setSelectedImageId(selectedId)
    setTranslateValue(nextTranslateValue)
  }

  return ReactDOM.createPortal(
    <StyledDIM isOpen={isOpen}>
      <StyledCloseIcon onClick={handleCloseModal}>
        <img alt="close-button" src={ICON.CLOSE_24} />
      </StyledCloseIcon>
      <StyledImageModal ref={imageModalRef}>
        <StyledImageContainer translateValue={translateValue}>
          {images.map(({ src, id }) => (
            <StyledImage key={id} alt={`${name}-${id}`} src={src} />
          ))}
        </StyledImageContainer>
        {images.length > 1 && (
          <StyledIndicatorBox ref={imageModalRef}>
            {images.map(({ id }) => (
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
  z-index: ${({ theme }): string => theme.zIndex.ImageModal};
  background-color: ${({ theme }): string => theme.colors.dim.opacity70};
`

const StyledImageModal = styled.div`
  width: 0;
`

const StyledImageContainer = styled.div<StyledImageContainerProps>`
  display: flex;
  gap: 12px;
  transition: 0.6s ease-in-out;
  transform: ${({ translateValue }): string =>
    `translate(calc(50vw - ${translateValue}px), 0)}, 0)`};
`
const StyledImage = styled.img`
  height: ${RESIZE_HEIGHT}px;
`

const StyledCloseIcon = styled.button`
  position: absolute;
  top: 64px;
  right: 64px;
  padding: 0;
  z-index: 400;
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    filter: ${({ theme }): string =>
      hexToCSSFilter(theme.colors.grayScale.gray30).filter};
  }
`

const StyledIndicatorBox = styled.div`
  position: absolute;
  bottom: 172px;
  left: 50vw;
  transform: translate(-50%, 0);
  display: flex;
  gap: 8px;
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
