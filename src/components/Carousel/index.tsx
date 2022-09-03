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
  const carouselWidthSize = 60
  const arrowRight = ICON.CHEVRON_RIGHT_40
  const arrowLeft = ICON.CHEVRON_LEFT_40
  const [translateValue, setTranslateValue] = useState<number>(0)
  const [startClientX, setStartClientX] = useState<number>(0)
  const [endClientX, setEndClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)

  const handleMoveCurrent = (imageIndex: number): void => {
    setTranslateValue((imageIndex - 1) * carouselWidthSize)
  }
  const handleMoveRight = (): void => {
    if (translateValue !== carouselWidthSize * (images.length - 1)) {
      setTranslateValue(prev => prev + carouselWidthSize)
    } else {
      setTranslateValue(0)
    }
  }

  const handleMoveLeft = (): void => {
    if (translateValue !== 0) {
      setTranslateValue(prev => prev - carouselWidthSize)
    } else {
      setTranslateValue(carouselWidthSize * (images.length - 1))
    }
  }

  const handleMouseDown = (e: { clientX: SetStateAction<number> }): void => {
    setStartClientX(e.clientX)
    setCursorOn(true)
  }

  const handleMouseUp = (e: { clientX: SetStateAction<number> }): void => {
    setEndClientX(e.clientX)
    setCursorOn(false)
  }
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = e => {
    setEndClientX(e.touches[0].clientX)
    setCursorOn(true)
  }
  const handleTouchStartEnd: TouchEventHandler<HTMLDivElement> = e => {
    setStartClientX(e.changedTouches[0].clientX)
    setCursorOn(false)
  }

  useEffect(() => {
    const dragSpace = Math.abs(startClientX - endClientX)
    const userSlideRight = endClientX < startClientX && dragSpace > 100
    const userSlideLeft = endClientX > startClientX && dragSpace > 100
    if (startClientX === 0) {
      return
    }
    if (userSlideRight) {
      handleMoveRight()
    } else if (userSlideLeft) {
      handleMoveLeft()
    }
  }, [endClientX])

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
          imageIndex={translateValue / carouselWidthSize}></StyledCurrentDot>
      </StyledDotBox>
    </StyledCarouselContainer>
  )
}

export default Carousel
