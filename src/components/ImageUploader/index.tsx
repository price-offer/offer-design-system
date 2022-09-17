import { Badge, Button, Image } from '@components'
import type { HTMLAttributes, ReactElement } from 'react'
import { useImageUploader, useMediaQuery } from '@hooks'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import styled from '@emotion/styled'

export interface ImageInfo {
  isRepresent: boolean
  id: string
  url: string
}
export interface OnChangeParams {
  eventType: 'upload' | 'remove'
  imgList: ImageInfo[]
}
export interface ImageUploaderProps {
  defaultImgList: ImageInfo[]
  onChange(params: OnChangeParams): void
}
interface StyledFileLengthProps {
  isMax: boolean
}
interface StyledUploaderWrapperProps {
  haveFiles: boolean
}

export const ImageUploader = ({
  defaultImgList,
  onChange
}: ImageUploaderProps): ReactElement => {
  const {
    imageListRef,
    uploaderRef,
    images,
    clickTrigger,
    addImage,
    removeImage
  } = useImageUploader({
    defaultImgList,
    onChange
  })
  const isLessThanTablet = useMediaQuery('(max-width:1023px)')
  const listImageSize = isLessThanTablet ? '80px' : '280px'
  const haveFiles = images.length > 0
  const isMax = images.length === 10

  return (
    <StyledUploaderWrapper haveFiles={haveFiles}>
      <StyledFileListWrapper ref={imageListRef}>
        {images?.map(({ id, isRepresent, url }, index) => (
          <StyledFileWrapper key={id}>
            {isRepresent && (
              <StyledFileBadge colorScheme="orange">대표 사진</StyledFileBadge>
            )}
            <Image alt={`file-${index}`} boxSize={listImageSize} src={url} />
            <div onClick={removeImage}>
              <StyledRemoveButtonWrapper>
                <StyledRemoveButton
                  alt={`close-icon_${index}`}
                  boxSize="16px"
                  data-id="close-icon"
                  src={ICON.CLOSE_16}
                />
              </StyledRemoveButtonWrapper>
            </div>
          </StyledFileWrapper>
        ))}
      </StyledFileListWrapper>
      <div onClick={clickTrigger}>
        <StyledUploaderTrigger>
          <>
            {isLessThanTablet && (
              <StyledMobileTrigger>
                <StyledTriggerIcon
                  alt="picture-icon"
                  boxSize="40px"
                  src={ICON.PICTURE_40}
                />
                <StyledFileLength isMax={isMax}>
                  ({images.length}/10)
                </StyledFileLength>
              </StyledMobileTrigger>
            )}
            {!isLessThanTablet && (
              <StyledPcTrigger>
                <StyledTriggerIcon
                  alt="picture-icon"
                  boxSize="40px"
                  src={ICON.PICTURE_40}
                />
                <StyledPcMeta>
                  <p>상품 이미지 추가</p>
                  <StyledFileLength isMax={isMax}>
                    ({images.length}/10)
                  </StyledFileLength>
                </StyledPcMeta>
                <Button size="small">사진 업로드</Button>
              </StyledPcTrigger>
            )}
          </>
        </StyledUploaderTrigger>
        <StyledUploaderInput
          ref={uploaderRef}
          accept="image/*"
          type="file"
          onChange={addImage}
        />
      </div>
    </StyledUploaderWrapper>
  )
}

/* Common (PC, Table, Mobile) */
const StyledFileLength = styled.span<StyledFileLengthProps>`
  ${({ theme, isMax }): string => `
   ${theme.mediaQuery.desktop} {
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
    }
    ${theme.mediaQuery.tablet} {
      margin-top: 0;
      font-size: 12px;
      line-height: 16px;
    }
    color: ${
      isMax ? theme.colors.brand.primary : theme.colors.grayScale.gray70
    };
    margin-top: 3px;
  `}
`
const StyledTriggerIcon = styled(Image)`
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray30).filter};
`

/* PC */
const StyledPcTrigger = styled.div`
  display: flex;
  width: 280px;
  height: 280px;
  padding-top: 70px;
  padding-bottom: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  pointer-events: none;
`
const StyledPcMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    line-height: 24px;
  }
`

/* Tablet, Mobile */
const StyledMobileTrigger = styled.div`
  display: flex;
  background-color: ${({ theme }): string => theme.colors.grayScale.gray05};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: pointer;
`

/** Use Uploader */
const StyledUploaderWrapper = styled.div<StyledUploaderWrapperProps>`
  ${({ theme, haveFiles }): string => `
    ${theme.mediaQuery.desktop} {
      display: flex;
      padding: 12px 12px 5px 12px;
      background-color: ${theme.colors.grayScale.gray05};
    }
    ${theme.mediaQuery.tablet} {
      display: ${haveFiles ? 'flex' : 'inline-flex'};
      padding: 0px;
      background-color: ${theme.colors.background.white};
    }
    justify-content: ${haveFiles ? 'flex-start' : 'center'};
    user-select: none;
    `}
`
/* File List */
const StyledFileListWrapper = styled.div`
  order: 2;
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
    background: ${({ theme }): string => theme.colors.grayScale.black};
  }
`
const StyledFileWrapper = styled.div`
  position: relative;
`
const StyledFileBadge = styled(Badge)`
  ${({ theme }): string => `
    ${theme.mediaQuery.desktop} {
      bottom: 4px;
      left: 4px;
    }
    ${theme.mediaQuery.tablet} {
      bottom: 0;
      left: 0;
    }
    position: absolute;
  `}
`
const StyledRemoveButtonWrapper = styled.div`
  ${({ theme }): string => `
    ${theme.mediaQuery.desktop} {
      top: 4px;
      right: 4px;
      padding: 4px;
    }
    ${theme.mediaQuery.tablet} {
      top: 0;
      right: 0;
      padding: 2px;
    }
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

/* Uploader */
const StyledUploaderTrigger = styled.div`
  cursor: pointer;
  order: 1;
`
const StyledUploaderInput = styled.input<HTMLAttributes<HTMLInputElement>>`
  display: none;
`
