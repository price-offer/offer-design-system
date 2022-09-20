import { Badge, Image } from '@components'
import type {
  ChangeEventHandler,
  HTMLAttributes,
  MouseEventHandler,
  MutableRefObject,
  ReactElement
} from 'react'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import type { ImageInfo } from '@components/ImageUploader'
import styled from '@emotion/styled'

interface UploaderProps {
  imageList: ImageInfo[]
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  imageListRef: MutableRefObject<HTMLDivElement | null>
  addImage: ChangeEventHandler<HTMLInputElement>
  removeImage: MouseEventHandler<HTMLDivElement>
  openUploader: MouseEventHandler<HTMLDivElement>
}
interface StyledProps {
  isMaximum: boolean
  isShowListType: boolean
}

export const MobileUploader = ({
  imageListRef,
  uploaderRef,
  imageList,
  openUploader,
  addImage,
  removeImage
}: UploaderProps): ReactElement => {
  const isShowListType = imageList.length > 0
  const isMaximum = imageList.length === 10
  const imgTotal = `(${imageList.length}/10)`

  return (
    <StyledUploaderWrapper isShowListType={isShowListType}>
      <StyledTrigger onClick={openUploader}>
        <StyledTriggerIcon
          alt="picture-icon"
          boxSize="40px"
          src={ICON.PICTURE_40}
        />
        <StyledImageTotal isMaximum={isMaximum}>{imgTotal}</StyledImageTotal>
        <StyledUploaderInput
          ref={uploaderRef}
          accept="image/*"
          multiple
          type="file"
          onChange={addImage}
        />
      </StyledTrigger>
      <StyledImageList ref={imageListRef}>
        {imageList?.map(({ id, isRepresent, url }, index) => (
          <StyledImageItem key={id}>
            {isRepresent && (
              <StyledBadge colorScheme="orange">대표 사진</StyledBadge>
            )}
            <Image alt={`file-${index}`} boxSize="80px" src={url} />
            <StyledRemoveButtonWrapper onClick={removeImage}>
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
    display: ${isShowListType ? 'flex' : 'inline-flex'};
    padding: 0px;
    background-color: ${theme.colors.background.white};
    justify-content: ${isShowListType ? 'flex-start' : 'center'};
    user-select: none;
  `}
`
const StyledImageTotal = styled.span<Pick<StyledProps, 'isMaximum'>>`
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
const StyledTriggerIcon = styled(Image)`
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray30).filter};
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
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }): string => theme.colors.grayScale.black};
  }
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
const StyledRemoveButton = styled(Image)`
  ${({ theme }): string => `
    filter: ${hexToCSSFilter(theme.colors.background.white).filter}};
  `}
`
