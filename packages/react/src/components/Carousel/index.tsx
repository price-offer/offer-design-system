import styled from '@emotion/styled'
import { Icon } from '@offer-ui/components/Icon'
import { Image } from '@offer-ui/components/Image'
import { useMedia } from '@offer-ui/hooks/useMedia'
import type { ForwardedRef, HTMLAttributes, TouchEventHandler } from 'react'
import { forwardRef, useEffect, useState } from 'react'

export type CarouselProps = {
  /** Carousel 컴포넌트에 들어갈 이미지들을 정합니다.
   * @type { src: string, id: number } []
   */
  images: { src: string; id: number }[]
  /** Carousel 컴포넌트에 화살표의 유무를 정합니다.
   * @type boolean
   */
  isArrow: boolean
  /** Carousel 컴포넌트에 들어갈 이미지들의 크기를 정합니다.
   * @type number | undefined
   */
  size?: number
  /** Carousel 컴포넌트의 이름을 정합니다.(이미지들의 alt에도 사용 됩니다.)
   * @type string
   */
  name: string
  /** Carousel 내에 Image 클릭시 실행할 함수를 지정합니다.
   * @type (index: number): void | undefined
   */
  onClick?(index: number): void
} & HTMLAttributes<HTMLDivElement>

type SliderProps = {
  cursorOn: boolean
  size: number
}

type ImageBoxProps = {
  currentTranslateX: number
}

type ImageProps = {
  size: number
}

type IndicatorBoxProps = {
  isArrow: boolean
}

type HandleOffset = (navType: keyof typeof NAV_TYPE) => void
const NAV_TYPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
} as const
const FULL_SCREEN_WIDTH = 100
const USER_DRAG_LENGTH = 100

export const Carousel = forwardRef(function Carousel(
  { images = [], isArrow, size = 687, name, onClick, ...props }: CarouselProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { desktop } = useMedia()
  const carouselWidthSize = desktop ? size : FULL_SCREEN_WIDTH
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [startClientX, setStartClientX] = useState<number>(0)
  const [endClientX, setEndClientX] = useState<number>(0)
  const [cursorOn, setCursorOn] = useState<boolean>(false)
  const isFirstImage = currentIndex === 0
  const isLastImage = currentIndex === images.length - 1
  const hasImages = images.length > 0
  const currentTranslateX = currentIndex * carouselWidthSize

  const handleIndicator = (idx: number): void => {
    setCurrentIndex(idx)
  }

  const handleOffset: HandleOffset = navType => {
    const { LEFT } = NAV_TYPE
    const goPrev = navType === LEFT

    setCurrentIndex(goPrev ? currentIndex - 1 : currentIndex + 1)
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
    <StyledCarouselWrapper ref={ref} hasImages={hasImages} {...props}>
      <StyledSlider
        cursorOn={cursorOn}
        size={carouselWidthSize}
        onTouchEnd={handleTouchStartEnd}
        onTouchStart={handleTouchStart}>
        <StyledImageBox
          currentTranslateX={currentTranslateX}
          onClick={(): void => onClick?.(currentIndex)}>
          {images.map(image => {
            return (
              <StyledImage
                key={image.id}
                alt={`${name}- ${image.id}`}
                size={carouselWidthSize}
                src={image.src}
              />
            )
          })}
        </StyledImageBox>
        {isArrow && hasImages && (
          <>
            {isFirstImage ? (
              <div />
            ) : (
              <StyledLeftArrow
                type="button"
                onClick={(): void => {
                  handleOffset(NAV_TYPE.LEFT)
                }}>
                <Icon size={40} type="chevronLeft" />
              </StyledLeftArrow>
            )}
            {isLastImage ? (
              <div />
            ) : (
              <StyledRightArrow
                type="button"
                onClick={(): void => {
                  handleOffset(NAV_TYPE.RIGHT)
                }}>
                <Icon size={40} type="chevronRight" />
              </StyledRightArrow>
            )}
          </>
        )}
      </StyledSlider>
      <StyledIndicatorBox isArrow={isArrow}>
        {images.map(({ id }, idx) => {
          return (
            <StyledIndicator
              key={id}
              className={`${name}- ${id}`}
              isSelected={currentIndex === idx}
              onClick={(): void => {
                handleIndicator(idx)
              }}
            />
          )
        })}
      </StyledIndicatorBox>
    </StyledCarouselWrapper>
  )
})

const StyledCarouselWrapper = styled.div<{ hasImages: boolean }>`
  touch-action: none;
  user-select: none;
  position: relative;
  height: 430px;
  background-color: ${({ hasImages, theme }): string =>
    hasImages ? 'transparent' : theme.colors.grayScale10};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    max-width: 100vw;
    height: 400px;
  }
  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: 100vw;
    height: 360px;
  }
`

const StyledSlider = styled.div<SliderProps>`
  position: relative;
  max-width: ${({ size }): string => `${size}px`};
  height: 400px;
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  cursor: ${({ cursorOn }): string | boolean => cursorOn && 'pointer'};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    max-width: 100vw;
    height: 400px;
  }
  ${({ theme }): string => theme.mediaQuery.mobile} {
    max-width: 100vw;
    height: 360px;
  }
`

const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  height: 440px;
  transition: 0.5s;
  transform: ${({ currentTranslateX }): string =>
    `translateX(-${currentTranslateX}px)`};

  ${({ theme }): string => theme.mediaQuery.tablet} {
    height: 400px;
    transform: ${({ currentTranslateX }): string =>
      `translateX(-${currentTranslateX}vw)`};
  }

  ${({ theme }): string => theme.mediaQuery.mobile} {
    height: 400px;
    transform: ${({ currentTranslateX }): string =>
      `translateX(-${currentTranslateX}vw)`};
  }
`

const StyledImage = styled(Image)<ImageProps>`
  width: ${({ size }): string => `${size}px`};
  height: 440px;
  object-fit: cover;
  object-position: center;

  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: 100vw;
    height: 400px;
  }
  ${({ theme }): string => theme.mediaQuery.mobile} {
    width: 100vw;
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

const StyledRightArrow = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  width: 40px;
  height: 60px;
  border: none;
  transform: translate(0, -50%);
  background-color: ${({ theme }): string => theme.colors.white};
  cursor: pointer;
`

const StyledLeftArrow = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  width: 40px;
  height: 60px;
  border: none;
  transform: translate(0, -50%);
  background-color: ${({ theme }): string => theme.colors.white};
  cursor: pointer;
`

const StyledIndicatorBox = styled.div<IndicatorBoxProps>`
  display: flex;
  gap: 5px;
  position: absolute;
  margin-top: 20px;
  left: 50%;
  cursor: pointer;
  transform: translateX(-50%);

  ${({ theme }): string => theme.mediaQuery.tablet} {
    bottom: 27px;
    margin-top: 0px;
  }
  ${({ theme }): string => theme.mediaQuery.mobile} {
    bottom: 27px;
    margin-top: 0px;
  }
`

const StyledIndicator = styled.div<{ isSelected: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ theme, isSelected }): string =>
    isSelected ? theme.colors.black : theme.colors.grayScale10};
  border-radius: 100px;
  height: 10px;
  margin: 0 1px;
  font-size: 20px;

  ${({ theme }): string => theme.mediaQuery.tablet} {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }): string => theme.colors.white};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  }
`
