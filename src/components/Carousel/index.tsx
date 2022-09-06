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
  translateValue: number | null
}

interface ImageProps {
  size: number
}

interface ArrowProps {
  translateValue: number | null
}

interface IndicatorBoxProps {
  isArrow: boolean
}

type HandleOffset = (navType: keyof typeof NAV_TYPE) => void
const NAV_TYPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
} as const

const Carousel = ({
  images,
  isArrow,
  size = 687,
  name
}: CarouselProps): ReactElement => {
  const desktop = useMediaQuery(`(min-width:1023px)`)

  const carouselWidthSize = desktop ? size : 100
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
    const userSlideRight = endClientX > startClientX && dragSpace > 200
    const userSlideLeft = endClientX < startClientX && dragSpace > 200
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
            {translateValue === 0 ? (
              <div />
            ) : (
              <StyledRightArrow
                alt="arrow-left"
                src={arrowLeft}
                translateValue={translateValue}
                onClick={(): void => {
                  handleOffset(NAV_TYPE.LEFT)
                }}
              />
            )}
            {translateValue === translateValueOfLastImage ? (
              <div />
            ) : (
              <StyledLeftArrow
                alt="arrow-right"
                src={arrowRight}
                translateValue={translateValue}
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
          imageIndex={translateValue / carouselWidthSize}
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
  @media screen and (max-width: 1023px) {
    max-width: ${({ size }): string => `${size}vw`};
    height: 400px;
    right: 15px;
  }
  @media screen and (max-width: 699px) {
    max-width: ${({ size }): string => `${size}vw`};
    height: 360px;
    right: 15px;
  }
`

export const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  height: 440px;
  transition: 0.5s;
  transform: ${({ translateValue }): string =>
    `translateX(-${translateValue}px)`};

  ${getMediaQuery('TABLET')} {
    height: 400px;
    transform: ${({ translateValue }): string =>
      `translateX(-${translateValue}vw)`};
  }
  /* @media screen and (max-width: 768px) {
    height: 400px;
    transform: ${({ translateValue }): string =>
    `translateX(-${translateValue}vw)`};
  } */
  @media screen and (max-width: 699px) {
    height: 360px;
    transform: ${({ translateValue }): string =>
      `translateX(-${translateValue}vw)`};
  }
`

export const StyledImage = styled.img<ImageProps>`
  width: ${({ size }): string => `${size}px`};
  height: 440px;
  object-fit: cover;
  object-position: center;
  @media screen and (max-width: 1023px) {
    width: ${({ size }): string => `${size}vw`};
    height: 400px;
  }
  @media screen and (max-width: 699px) {
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
  @media screen and (max-width: 1023px) {
    display: none;
  }
`

export const StyledRightArrow = styled.img<ArrowProps>`
  display: ${({ translateValue }): string =>
    translateValue === 0 ? 'none;' : ''};
  width: 40px;
  height: 60px;
  background-color: ${({ theme }): string => theme.colors.background.white};
  color: ${({ theme }): string => theme.colors.background.white};
  font-size: 2rem;
  cursor: pointer;
`

export const StyledLeftArrow = styled.img<ArrowProps>`
  display: ${({ translateValue }): string =>
    translateValue === undefined ? 'none;' : ''};
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
  @media screen and (max-width: 1023px) {
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
  @media screen and (max-width: 1023px) {
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
  @media screen and (max-width: 1023px) {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }): string => theme.colors.background.white};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
    transform: ${({ imageIndex }): string =>
      `translate(${imageIndex * 15}px,-50%)`};
    transition: transform 0.2s;
  }
`
