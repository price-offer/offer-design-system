import type { ReactElement, TouchEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import { useMediaQuery } from '@hooks'

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
  currentImageValue: number
}

interface ImageProps {
  size: number
}

interface ArrowProps {
  currentImageValue: number
}

interface IndicatorBoxProps {
  isArrow: boolean
}

type HandleOffset = (navType: keyof typeof NAV_TYPE) => void
const NAV_TYPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
} as const

const ARROW_RIGHT = ICON.CHEVRON_RIGHT_40
const ARROW_LEFT = ICON.CHEVRON_LEFT_40
const FULL_SCREEN_WIDTH = 100
const USER_DRAG_LENGTH = 100

const Carousel = ({
  images,
  isArrow,
  size = 687,
  name
}: CarouselProps): ReactElement => {
  const isDesktop = useMediaQuery(`(min-width:1023px)`)
  const carouselWidthSize = isDesktop ? size : FULL_SCREEN_WIDTH
  const lastImageValue = carouselWidthSize * (images.length - 1)
  const [currentImageValue, setCurrentImageValue] = useState<number>(0)
  const [startClientX, setStartClientX] = useState<number>(0)
  const [endClientX, setEndClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)

  const isFirstImage = currentImageValue === 0
  const isLastImage = currentImageValue === lastImageValue

  const VALUE_OF_NAV_TYPE = {
    LEFT: -carouselWidthSize,
    RIGHT: carouselWidthSize
  }

  const handleIndicator = (imageIndex: number): void => {
    setCurrentImageValue((imageIndex - 1) * carouselWidthSize)
  }

  const handleOffset: HandleOffset = navType => {
    const { LEFT } = NAV_TYPE
    const endPoint = navType === LEFT ? 0 : lastImageValue
    const prevTranslateValue = navType === LEFT ? lastImageValue : 0
    if (currentImageValue === endPoint) {
      setCurrentImageValue(prevTranslateValue)
    } else {
      setCurrentImageValue(prev => prev + VALUE_OF_NAV_TYPE[navType])
    }
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
    const userSlideRight =
      endClientX > startClientX && dragSpace > USER_DRAG_LENGTH
    const userSlideLeft =
      endClientX < startClientX && dragSpace > USER_DRAG_LENGTH

    if (startClientX === 0) {
      return
    }
    if (userSlideRight) {
      handleOffset(NAV_TYPE.RIGHT)
      setStartClientX(0)
      setEndClientX(0)
    } else if (userSlideLeft) {
      handleOffset(NAV_TYPE.LEFT)
      setStartClientX(0)
      setEndClientX(0)
    }
  }, [startClientX, endClientX])

  return (
    <StyledCarouselWrapper>
      <StyledSlider
        cursorOn={cursorOn}
        size={carouselWidthSize}
        onTouchEnd={handleTouchStartEnd}
        onTouchStart={handleTouchStart}>
        <StyledImageBox currentImageValue={currentImageValue}>
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
            {isFirstImage ? (
              <div />
            ) : (
              <StyledRightArrow
                alt="arrow-left"
                currentImageValue={currentImageValue}
                src={ARROW_LEFT}
                onClick={(): void => {
                  handleOffset(NAV_TYPE.LEFT)
                }}
              />
            )}
            {isLastImage ? (
              <div />
            ) : (
              <StyledLeftArrow
                alt="arrow-right"
                currentImageValue={currentImageValue}
                src={ARROW_RIGHT}
                onClick={(): void => {
                  handleOffset(NAV_TYPE.RIGHT)
                }}
              />
            )}
          </StyledArrowBox>
        )}
      </StyledSlider>
      <StyledIndicatorBox isArrow={isArrow}>
        {images.map(image => {
          return (
            <StyledIndicator
              key={image.id}
              className={`${name}- ${image.id}`}
              onClick={(): void => {
                handleIndicator(image.id)
              }}
            />
          )
        })}
        <StyledCurrentIndicator
          imageIndex={currentImageValue / carouselWidthSize}
        />
      </StyledIndicatorBox>
    </StyledCarouselWrapper>
  )
}

export default Carousel

export const StyledCarouselWrapper = styled.div`
  touch-action: none;
  user-select: none;
  position: relative;
`
export const StyledSlider = styled.div<SliderProps>`
  position: relative;
  max-width: ${({ size }): string => `${size}px`};
  height: 400px;
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  cursor: ${({ cursorOn }): string | boolean => cursorOn && 'pointer'};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    max-width: ${({ size }): string => `${size}vw`};
    height: 400px;
  }
  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: ${({ size }): string => `${size}vw`};
    height: 360px;
  }
`

export const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  height: 440px;
  transition: 0.5s;
  transform: ${({ currentImageValue }): string =>
    `translateX(-${currentImageValue}px)`};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    height: 400px;
    transform: ${({ currentImageValue }): string =>
      `translateX(-${currentImageValue}vw)`};
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    height: 400px;
    transform: ${({ currentImageValue }): string =>
      `translateX(-${currentImageValue}vw)`};
  }
`

export const StyledImage = styled.img<ImageProps>`
  width: ${({ size }): string => `${size}px`};
  height: 440px;
  object-fit: cover;
  object-position: center;

  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: ${({ size }): string => `${size}vw`};
    height: 400px;
  }
  ${({ theme }): string => theme.mediaQuery.mobile} {
    width: ${({ size }): string => `${size}vw`};
    height: 360px;
  }
`

export const StyledArrowBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }): string => theme.mediaQuery.tablet} {
    display: none;
  }
`

export const StyledRightArrow = styled.img<ArrowProps>`
  width: 40px;
  height: 60px;
  background-color: ${({ theme }): string => theme.colors.background.white};
  color: ${({ theme }): string => theme.colors.background.white};
  font-size: 2rem;
  cursor: pointer;
`

export const StyledLeftArrow = styled.img<ArrowProps>`
  width: 40px;
  height: 60px;
  background-color: ${({ theme }): string => theme.colors.background.white};
  color: ${({ theme }): string => theme.colors.background.white};
  font-size: 2rem;
  cursor: pointer;
`

export const StyledIndicatorBox = styled.div<IndicatorBoxProps>`
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: -20px;
  left: 50%;
  cursor: pointer;
  transform: translateX(-50%);
  ${({ theme }): string => theme.mediaQuery.tablet} {
    bottom: 27px;
  }
`

export const StyledIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }): string => theme.colors.grayScale.gray10};
  border-radius: 100px;
  height: 10px;
  margin: 0 1px;
  font-size: 20px;
  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }): string => theme.colors.background.white};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  }
`

export const StyledCurrentIndicator = styled.div<CurrentIndicatorProps>`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }): string => theme.colors.grayScale.gray90};
  position: absolute;
  left: 0;
  top: 50%;
  margin: 0 1px;
  border-radius: 100px;
  cursor: pointer;
  transform: ${({ imageIndex }): string =>
    `translate(${imageIndex * 17}px,-50%)`};
  transition: transform 0.2s;
  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }): string => theme.colors.background.white};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    transform: ${({ imageIndex }): string =>
      `translate(${imageIndex * 15}px,-50%)`};
    transition: transform 0.2s;
  }
`
