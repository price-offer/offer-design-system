import type { ForwardedRef, HTMLAttributes } from 'react'
import { Badge } from '@components/Badge'
import { colors } from '@themes'
import { forwardRef } from 'react'
import { Icon } from '@components/Icon'
import { Image } from '@components/Image'
import styled from '@emotion/styled'
import { Text } from '@components/Text'
import type { UploaderProps } from '../index'

interface StyledProps {
  isMaximum: boolean
  isShowListType: boolean
}

type MobileUploaderProps = {
  isMaximum: boolean
  imgTotal: string
  isShowListType: boolean
} & UploaderProps &
  HTMLAttributes<HTMLDivElement>

export const MobileUploader = forwardRef(function MobileUploader(
  {
    imageListRef,
    uploaderRef,
    images,
    openUploader,
    addImage,
    removeImage,
    isShowListType,
    isMaximum,
    imgTotal,
    ...props
  }: MobileUploaderProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledUploaderWrapper ref={ref} isShowListType={isShowListType} {...props}>
      <StyledTrigger onClick={openUploader}>
        <Icon color={colors.grayScale.gray30} size={40} type="picture" />
        <StyledImageTotal isMaximum={isMaximum} styleType="caption01M">
          {imgTotal}
        </StyledImageTotal>
        <StyledUploaderInput
          ref={uploaderRef}
          accept="image/*"
          multiple
          type="file"
          onChange={addImage}
        />
      </StyledTrigger>
      <StyledImageList ref={imageListRef}>
        {images?.map(({ id, isRepresent, url }, index) => (
          <StyledImageItem key={id}>
            {isRepresent && (
              <StyledBadge colorType="orange">대표 사진</StyledBadge>
            )}
            <Image alt={`file-${index}`} boxSize="80px" src={url} />
            <StyledRemoveButtonWrapper
              onClick={(): void => {
                removeImage(index)
              }}>
              <Icon color={colors.grayScale.white} size={16} type="close" />
            </StyledRemoveButtonWrapper>
          </StyledImageItem>
        ))}
      </StyledImageList>
    </StyledUploaderWrapper>
  )
})

const StyledUploaderWrapper = styled.div<Pick<StyledProps, 'isShowListType'>>`
  ${({ theme, isShowListType }): string => `
    display: ${isShowListType ? 'flex' : 'inline-flex'};
    padding: 0px;
    background-color: ${theme.colors.background.white};
    justify-content: ${isShowListType ? 'flex-start' : 'center'};
    user-select: none;
  `}
`
const StyledImageTotal = styled(Text)<Pick<StyledProps, 'isMaximum'>>`
  ${({ theme, isMaximum }): string => `
    margin-top: 0;
    font-size: 12px;
    line-height: 16px;
    color: ${
      isMaximum ? theme.colors.brand.primary : theme.colors.grayScale.gray70
    };
  `}
`
const StyledTrigger = styled.div`
  display: flex;
  background-color: ${({ theme }): string => theme.colors.grayScale.gray05};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 80px;
  cursor: pointer;
`
const StyledUploaderInput = styled.input<HTMLAttributes<HTMLInputElement>>`
  display: none;
`
const StyledImageList = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme }): string => theme.colors.dim.opacity50};
  }
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }): string => theme.colors.dim.opacity50};
`
const StyledImageItem = styled.div`
  position: relative;
`
const StyledBadge = styled(Badge)`
  bottom: 2px;
  left: 0;
  position: absolute;
`
const StyledRemoveButtonWrapper = styled.div`
  ${({ theme }): string => `
    top: 0;
    right: 0;
    padding: 2px;
    cursor: pointer;
    display: inline-flex;
    position: absolute;
    background-color: ${theme.colors.grayScale.black};
  `}
`
