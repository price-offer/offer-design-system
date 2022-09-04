import type { ReactElement, SetStateAction, TouchEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { ICON } from '@constants/icons'

export interface CarouselProps {
  images: { url: string; id: number }[]
  isArrow: boolean
  size?: number
  name: string
}

interface SliderProps {
  cursorOn: boolean
  size: number
}

interface CurrentIndicatorProps {
  imageIndex: number
}

interface ImageBoxProps {
  translateValue: number | null
}

interface ImageProps {
  size: number
}

type HandleOffset = (navType: keyof typeof NAV_TYPE) => void
const NAV_TYPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
} as const

const Carousel = ({
  images,
  isArrow,
  size = 60,
  name
}: CarouselProps): ReactElement => {
  const carouselWidthSize = size
  const translateValueOfLastImage = carouselWidthSize * (images.length - 1)
  const arrowRight = ICON.CHEVRON_RIGHT_40
  const arrowLeft = ICON.CHEVRON_LEFT_40
  const [translateValue, setTranslateValue] = useState<number>(0)
  const [startClientX, setStartClientX] = useState<number>(0)
  const [endClientX, setEndClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)

  const handleIndicator = (imageIndex: number): void => {
    setTranslateValue((imageIndex - 1) * carouselWidthSize)
  }

  const TRANSLATE_VALUE_OF_NAV_TYPE = {
    LEFT: -carouselWidthSize,
    RIGHT: carouselWidthSize
  }

  const handleOffset: HandleOffset = navType => {
    const { LEFT } = NAV_TYPE
    const endPoint = navType === LEFT ? 0 : translateValueOfLastImage
    const prevTranslateValue = navType === LEFT ? translateValueOfLastImage : 0
    if (translateValue === endPoint) {
      setTranslateValue(prevTranslateValue)
    } else {
      setTranslateValue(prev => prev + TRANSLATE_VALUE_OF_NAV_TYPE[navType])
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
      handleOffset('RIGHT')
    } else if (userSlideLeft) {
      handleOffset('LEFT')
    }
  }, [endClientX])

  return (
    <StyledCarouselWrapper>
      <StyledSlider
        cursorOn={cursorOn}
        size={carouselWidthSize}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchStartEnd}
        onTouchStart={handleTouchStart}>
        <StyledImageBox translateValue={translateValue || null}>
          {images.map(image => {
            return (
              <StyledImage
                key={image.id}
                alt={`${name}- ${image.id}`}
                size={carouselWidthSize}
                src={image.url}
              />
            )
          })}
        </StyledImageBox>
        {isArrow && (
          <StyledArrowBox>
            <StyledArrow
              alt="arrow-left"
              src={arrowLeft}
              onClick={(): void => {
                handleOffset('LEFT')
              }}
            />
            <StyledArrow
              alt="arrow-right"
              src={arrowRight}
              onClick={(): void => {
                handleOffset('RIGHT')
              }}
            />
          </StyledArrowBox>
        )}
      </StyledSlider>
      <StyledIndicatorBox>
        {images.map(image => {
          return (
            <StyledIndicator
              key={image.id}
              className={`${name}- ${image.id}`}
              onClick={(): void => {
                handleIndicator(image.id)
              }}></StyledIndicator>
          )
        })}
        <StyledCurrentIndicator
          imageIndex={
            translateValue / carouselWidthSize
          }></StyledCurrentIndicator>
      </StyledIndicatorBox>
    </StyledCarouselWrapper>
  )
}

export default Carousel

import styled from '@emotion/styled'

export const StyledCarouselWrapper = styled.div`
  touch-action: none;
  user-select: none;
  position: relative;
`
export const StyledSlider = styled.div<SliderProps>`
  position: relative;
  max-width: ${({ size }): string => `${size}vw`};
  height: 500px;
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  cursor: ${({ cursorOn }): string | boolean => cursorOn && 'pointer'};
`

export const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  transition: 1s;
  transform: ${({ translateValue }): string =>
    `translateX(-${translateValue}vw)`};
`

export const StyledImage = styled.img<ImageProps>`
  width: ${({ size }): string => `${size}vw`};
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

export const StyledIndicatorBox = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  left: 50%;
  bottom: -30px;
  cursor: pointer;
  transform: translateX(-50%);
`

export const StyledIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e8e8ea;
  border-radius: 100px;
  height: 10px;
  margin: 0 1px;
  font-size: 20px;
`

export const StyledCurrentIndicator = styled.div<CurrentIndicatorProps>`
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
