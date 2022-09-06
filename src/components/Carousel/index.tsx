import type { ReactElement, TouchEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { ICON } from '@constants/icons'
import styled from '@emotion/styled'
import useMediaQuery from 'hook/useMediaQuery'

type GetMediaQuery = (breakPoint: keyof typeof BREAKE_POINTS) => string
const BREAKE_POINTS = {
  DESKTOP: 1920,
  MOBILE: 699,
  TABLET: 1023
} as const

const getMediaQuery: GetMediaQuery = breakpoint => {
  switch (breakpoint) {
    case 'DESKTOP':
      return `@media (max-width: ${BREAKE_POINTS.DESKTOP}px)`
    case 'MOBILE':
      return `@media (max-width: ${BREAKE_POINTS.MOBILE}px)`
    case 'TABLET':
      return `@media (max-width: ${BREAKE_POINTS.TABLET}px)`
    default:
      return ``
  }
}

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

const Carousel = ({
  images,
  isArrow,
  size = 687,
  name
}: CarouselProps): ReactElement => {
  const desktop = useMediaQuery(`(min-width:1023px)`)
  const carouselWidthSize = desktop ? size : 100
  const lastImageValue = carouselWidthSize * (images.length - 1)
  const [currentImageValue, setCurrentImageValue] = useState<number>(0)
  const [startClientX, setStartClientX] = useState<number>(0)
  const [endClientX, setEndClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)

  const handleIndicator = (imageIndex: number): void => {
    setCurrentImageValue((imageIndex - 1) * carouselWidthSize)
  }

  const TRANSLATE_VALUE_OF_NAV_TYPE = {
    LEFT: -carouselWidthSize,
    RIGHT: carouselWidthSize
  }

  const handleOffset: HandleOffset = navType => {
    const { LEFT } = NAV_TYPE
    const endPoint = navType === LEFT ? 0 : lastImageValue
    const prevTranslateValue = navType === LEFT ? lastImageValue : 0
    if (currentImageValue === endPoint) {
      setCurrentImageValue(prevTranslateValue)
    } else {
      setCurrentImageValue(prev => prev + TRANSLATE_VALUE_OF_NAV_TYPE[navType])
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
    const userDragLength = 100
    const dragSpace = Math.abs(startClientX - endClientX)
    const userSlideRight =
      endClientX > startClientX && dragSpace > userDragLength
    const userSlideLeft =
      endClientX < startClientX && dragSpace > userDragLength
    if (startClientX === 0) {
      return
    }
    if (userSlideRight) {
      handleOffset(NAV_TYPE.RIGHT)
    } else if (userSlideLeft) {
      handleOffset(NAV_TYPE.LEFT)
    }
  }, [endClientX])

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
            {currentImageValue === 0 ? (
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
            {currentImageValue === lastImageValue ? (
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
  ${getMediaQuery('TABLET')} {
    max-width: ${({ size }): string => `${size}vw`};
    height: 400px;
    right: 20px;
  }
  ${getMediaQuery('MOBILE')} {
    max-width: ${({ size }): string => `${size}vw`};
    height: 360px;
    right: 20px;
  }
`

export const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  height: 440px;
  transition: 0.5s;
  transform: ${({ currentImageValue }): string =>
    `translateX(-${currentImageValue}px)`};

  ${getMediaQuery('TABLET')} {
    height: 400px;
    transform: ${({ currentImageValue }): string =>
      `translateX(-${currentImageValue}vw)`};
  }
  ${getMediaQuery('MOBILE')} {
    height: 360px;
    transform: ${({ currentImageValue }): string =>
      `translateX(-${currentImageValue}vw)`};
  }
`

export const StyledImage = styled.img<ImageProps>`
  width: ${({ size }): string => `${size}px`};
  height: 440px;
  object-fit: cover;
  object-position: center;
  ${getMediaQuery('TABLET')} {
    width: ${({ size }): string => `${size}vw`};
    height: 400px;
  }
  ${getMediaQuery('MOBILE')} {
    width: ${({ size }): string => `${size}vw`};
    height: 360px;
  }
`

export const StyledArrowBox = styled.div`
  position: absolute;
  top: 0;
  left: -20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  ${getMediaQuery('TABLET')} {
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
  ${getMediaQuery('TABLET')} {
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
  ${getMediaQuery('TABLET')} {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }): string => theme.colors.background.white};
    opacity: 0.5;
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
  font-size: 20px;
  margin: 0 1px;
  border-radius: 100px;
  cursor: pointer;
  transform: ${({ imageIndex }): string =>
    `translate(${imageIndex * 17}px,-50%)`};
  transition: transform 0.2s;
  ${getMediaQuery('TABLET')} {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }): string => theme.colors.background.white};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    transform: ${({ imageIndex }): string =>
      `translate(${imageIndex * 15}px,-50%)`};
    transition: transform 0.2s;
  }
`
