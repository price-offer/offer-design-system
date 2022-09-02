import type { ReactElement, SetStateAction } from 'react'
import {
  StyledArrow,
  StyledArrowBox,
  StyledCarouselContainer,
  StyledCurrentDot,
  StyledDot,
  StyledDotBox,
  StyledImage,
  StyledImageBox,
  StyledSlider
} from './style'
import { useEffect, useState } from 'react'
import { ICON } from '../../constants/icons'

interface CarouselProps {
  images: { url: string; id: number }[]
  isArrow: boolean
}

const Carousel = ({ images, isArrow }: CarouselProps): ReactElement => {
  const arrowRight = ICON.CHEVRON_RIGHT_40
  const arrowLeft = ICON.CHEVRON_LEFT_40
  const [translateValue, setTranslateValue] = useState<number>(0)
  const [mouseDownClientX, setMouseDownClientX] = useState<number>(0)
  const [mouseUpClientX, setMouseUpClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)

  const moveCurrent = (imageIndex: number): void => {
    setTranslateValue((imageIndex - 1) * 60)
  }
  const moveRight = (): void => {
    if (translateValue !== 60 * (images.length - 1)) {
      setTranslateValue(prev => prev + 60)
    } else {
      setTranslateValue(0)
    }
  }

  const moveLeft = (): void => {
    if (translateValue !== 0) {
      setTranslateValue(prev => prev - 60)
    } else {
      setTranslateValue(60 * (images.length - 1))
    }
  }

  const onMouseDown = (e: { clientX: SetStateAction<number> }): void => {
    setMouseDownClientX(e.clientX)
    setCursorOn(true)
  }

  const onMouseUp = (e: { clientX: SetStateAction<number> }): void => {
    setMouseUpClientX(e.clientX)
    setCursorOn(false)
  }
  const handleTouchStart = (e: any): void => {
    setMouseUpClientX(e.touches[0].clientX)
    setCursorOn(true)
  }
  const handleTouchStartEnd = (e: any): void => {
    setMouseDownClientX(e.changedTouches[0].clientX)
    setCursorOn(false)
  }

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX)
    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragSpace > 100) {
        moveRight()
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        moveLeft()
      }
    }
  }, [mouseUpClientX])

  return (
    <StyledCarouselContainer>
      <StyledSlider
        cursorOn={cursorOn}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={handleTouchStartEnd}
        onTouchStart={handleTouchStart}>
        <StyledImageBox
          translateValue={translateValue !== 0 ? translateValue : null}>
          {images.map((image, idx) => {
            return (
              <StyledImage key={image.id} alt={'image' + idx} src={image.url} />
            )
          })}
        </StyledImageBox>
        {isArrow && (
          <StyledArrowBox>
            <StyledArrow src={arrowLeft} onClick={moveLeft}></StyledArrow>
            <StyledArrow src={arrowRight} onClick={moveRight}></StyledArrow>
          </StyledArrowBox>
        )}
      </StyledSlider>
      <StyledDotBox>
        {images.map(image => {
          return (
            <StyledDot
              key={image.id}
              className={`${image.id}`}
              onClick={(): void => {
                moveCurrent(image.id)
              }}></StyledDot>
          )
        })}
        <StyledCurrentDot imageIndex={translateValue / 60}></StyledCurrentDot>
      </StyledDotBox>
    </StyledCarouselContainer>
  )
}

export default Carousel
