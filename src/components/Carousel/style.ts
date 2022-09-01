/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
  cursor: ${({ cursorOn }) => cursorOn && 'pointer'};
`

interface ImageBoxProps {
  translateValue: number | null
}
export const StyledImageBox = styled.div<ImageBoxProps>`
  display: flex;
  transition: 1s;
  transform: ${({ translateValue }) => `translateX(-${translateValue}vw)`};
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

interface CurrentDotProps {
  imageIndex: number
}
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
  transform: ${({ imageIndex }) => `translate(${imageIndex * 20}px,-50%)`};
  transition: transform 0.5s;
`
