import type { ReactElement, SetStateAction, TouchEventHandler } from 'react'
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
import { ICON } from '@constants/icons'

export interface CarouselProps {
  images: { url: string; id: number }[]
  isArrow: boolean
}

const Carousel = ({ images, isArrow }: CarouselProps): ReactElement => {
  const carouselSize = 60
  const arrowRight = ICON.CHEVRON_RIGHT_40
  const arrowLeft = ICON.CHEVRON_LEFT_40
  const [translateValue, setTranslateValue] = useState<number>(0)
  const [mouseDownClientX, setMouseDownClientX] = useState<number>(0)
  const [mouseUpClientX, setMouseUpClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)

  const handleMoveCurrent = (imageIndex: number): void => {
    setTranslateValue((imageIndex - 1) * carouselSize)
  }
  const handleMoveRight = (): void => {
    if (translateValue !== carouselSize * (images.length - 1)) {
      setTranslateValue(prev => prev + carouselSize)
    } else {
      setTranslateValue(0)
    }
  }

  const handleMoveLeft = (): void => {
    if (translateValue !== 0) {
      setTranslateValue(prev => prev - carouselSize)
    } else {
      setTranslateValue(carouselSize * (images.length - 1))
    }
  }

  const handleMouseDown = (e: { clientX: SetStateAction<number> }): void => {
    setMouseDownClientX(e.clientX)
    setCursorOn(true)
  }

  const handleMouseUp = (e: { clientX: SetStateAction<number> }): void => {
    setMouseUpClientX(e.clientX)
    setCursorOn(false)
  }
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = e => {
    setMouseUpClientX(e.touches[0].clientX)
    setCursorOn(true)
  }
  const handleTouchStartEnd: TouchEventHandler<HTMLDivElement> = e => {
    setMouseDownClientX(e.changedTouches[0].clientX)
    setCursorOn(false)
  }

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX)
    const userSlideRight = mouseUpClientX < mouseDownClientX && dragSpace > 100
    const userSlideLeft = mouseUpClientX > mouseDownClientX && dragSpace > 100
    if (mouseDownClientX === 0) {
      return
    }
    if (userSlideRight) {
      handleMoveRight()
    } else if (userSlideLeft) {
      handleMoveLeft()
    }
  }, [mouseUpClientX])

  return (
    <StyledCarouselContainer>
      <StyledSlider
        cursorOn={cursorOn}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchStartEnd}
        onTouchStart={handleTouchStart}>
        <StyledImageBox translateValue={translateValue || null}>
          {images.map((image, idx) => {
            return (
              <StyledImage key={image.id} alt={'image' + idx} src={image.url} />
            )
          })}
        </StyledImageBox>
        {isArrow && (
          <StyledArrowBox>
            <StyledArrow
              alt="arrow-left"
              src={arrowLeft}
              onClick={handleMoveLeft}></StyledArrow>
            <StyledArrow
              alt="arrow-right"
              src={arrowRight}
              onClick={handleMoveRight}></StyledArrow>
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
                handleMoveCurrent(image.id)
              }}></StyledDot>
          )
        })}
        <StyledCurrentDot
          imageIndex={translateValue / carouselSize}></StyledCurrentDot>
      </StyledDotBox>
    </StyledCarouselContainer>
  )
}

export default Carousel
