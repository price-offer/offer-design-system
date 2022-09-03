import type { ReactElement, SetStateAction, TouchEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { ICON } from '@constants/icons'

export interface CarouselProps {
  images: { url: string; id: number }[]
  isArrow: boolean
}

interface CurrentDotProps {
  imageIndex: number
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

import styled from '@emotion/styled'

interface SliderProps {
  cursorOn: boolean
}
export const StyledSlider = styled.div<SliderProps>`
  position: relative;
  max-width: 60vw;
  height: 500px;
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  cursor: ${({ cursorOn }): string | boolean => cursorOn && 'pointer'};
`

interface ImageBoxProps {
  translateValue: number | null
}
export const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  transition: 1s;
  transform: ${({ translateValue }): string =>
    `translateX(-${translateValue}vw)`};
`

export const StyledImage = styled.img`
  width: 60vw;
  object-fit: cover;
  object-position: center center;
`

export const StyledArrowBox = styled.div`
  position: absolute;
  left: -20px;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

export const StyledArrow = styled.img`
  width: 40px;
  height: 60px;
  background-color: #ffffff;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: dodgerblue;
  }
`
export const StyledCarouselContainer = styled.div`
  touch-action: none;
  user-select: none;
  position: relative;
`

export const StyledDotBox = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  left: 50%;
  bottom: -30px;
  cursor: pointer;
  transform: translateX(-50%);
`

export const StyledDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e8e8ea;
  border-radius: 100px;
  height: 10px;
  margin: 0 1px;
  font-size: 20px;
`

export const StyledCurrentDot = styled.div<CurrentDotProps>`
  width: 10px;
  height: 10px;
  background-color: #2f2e36;
  position: absolute;
  left: 0;
  top: 50%;
  font-size: 20px;
  margin: 0 1px;
  border-radius: 100px;
  cursor: pointer;
  transform: ${({ imageIndex }): string =>
    `translate(${imageIndex * 18}px,-50%)`};
  transition: transform 0.5s;
`
