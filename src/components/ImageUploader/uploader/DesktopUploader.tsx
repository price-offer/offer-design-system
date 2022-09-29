import { Badge, Button, Image } from '@components'
import type { HTMLAttributes, ReactElement } from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'
import type { UploaderProps } from '../index'

interface StyledProps {
  isMaximum: boolean
  isShowListType: boolean
}

type DesktopUploaderProps = {
  isMaximum: boolean
  imgTotal: string
  isShowListType: boolean
} & UploaderProps &
  HTMLAttributes<HTMLDivElement>

export const DesktopUploader = ({
  imageListRef,
  uploaderRef,
  imageList,
  openUploader,
  addImage,
  removeImage,
  isShowListType,
  isMaximum,
  imgTotal,
  ...props
}: DesktopUploaderProps): ReactElement => {
  return (
    <StyledUploaderWrapper isShowListType={isShowListType} {...props}>
      <StyledTriggerWrapper onClick={openUploader}>
        <StyledTrigger isShowListType={isShowListType}>
          <StyledTriggerIcon
            alt="picture-icon"
            boxSize="40px"
            src={ICON.PICTURE_40}
          />
          <StyledDescription>
            <p>상품 이미지 추가</p>
            <StyledImageTotal isMaximum={isMaximum}>
              {imgTotal}
            </StyledImageTotal>
          </StyledDescription>
          <Button size="small">사진 업로드</Button>
          <StyledUploaderInput
            ref={uploaderRef}
            accept="image/*"
            multiple
            type="file"
            onChange={addImage}
          />
        </StyledTrigger>
      </StyledTriggerWrapper>
      <StyledImageList ref={imageListRef}>
        {imageList?.map(({ id, isRepresent, url }, index) => (
          <StyledImageItem key={id}>
            {isRepresent && (
              <StyledBadge colorScheme="orange">대표 사진</StyledBadge>
            )}
            <Image alt={`file-${index}`} boxSize="280px" src={url} />
            <StyledRemoveButtonWrapper
              onClick={(): void => {
                removeImage(index)
              }}>
              <StyledRemoveButton
                alt={`close-icon_${index}`}
                boxSize="16px"
                data-id="close-icon"
                src={ICON.CLOSE_16}
              />
            </StyledRemoveButtonWrapper>
          </StyledImageItem>
        ))}
      </StyledImageList>
    </StyledUploaderWrapper>
  )
}

const StyledUploaderWrapper = styled.div<Pick<StyledProps, 'isShowListType'>>`
  ${({ theme, isShowListType }): string => `
    display: flex;
    padding: 12px 12px 5px 12px;
    background-color: ${theme.colors.grayScale.gray05};
    justify-content: ${isShowListType ? 'flex-start' : 'center'};
    user-select: none;
  `}
`
const StyledTriggerWrapper = styled.div`
  cursor: pointer;
`
const StyledTrigger = styled.div<Pick<StyledProps, 'isShowListType'>>`
  ${({ isShowListType }): string => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    min-width: 280px;
    min-height: 280px;
    padding-top: ${isShowListType ? '' : '70px'};
    padding-bottom: ${isShowListType ? '' : '90px'};
    pointer-events: none;
  `}
`
const StyledTriggerIcon = styled(Image)`
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray30).filter};
`
const StyledUploaderInput = styled.input`
  display: none;
`
const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    line-height: 24px;
  }
`
const StyledImageTotal = styled.span<Pick<StyledProps, 'isMaximum'>>`
  ${({ theme, isMaximum }): string => `
    margin-top: 4px;
    font-size: 14px;
    line-height: 20px;
    color: ${
      isMaximum ? theme.colors.brand.primary : theme.colors.grayScale.gray70
    };
  `}
`
const StyledImageList = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 8px;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 7px;
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
  bottom: 6px;
  left: 4px;
  position: absolute;
`
const StyledRemoveButtonWrapper = styled.div`
  ${({ theme }): string => `
    top: 4px;
    right: 4px;
    padding: 4px;
    cursor: pointer;
    display: inline-flex;
    position: absolute;
    background-color: ${theme.colors.grayScale.black};
  `}
`
const StyledRemoveButton = styled(Image)`
  ${({ theme }): string => `
    filter: ${hexToCSSFilter(theme.colors.background.white).filter}};
  `}
`
