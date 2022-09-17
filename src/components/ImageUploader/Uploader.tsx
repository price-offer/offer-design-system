import { Badge, Image } from '@components'
import type { File, OnChangeParams } from './index'
import type { HTMLAttributes, ReactElement } from 'react'
import { useMediaQuery, useUploader } from '@hooks'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants/icons'
import styled from '@emotion/styled'

interface UploaderProps {
  acceptFileType: string
  children: ReactElement
  fileList: File[]
  onChange(params: OnChangeParams): void
}

interface StyledUploaderWrapperProps {
  haveFiles: boolean
}

export const Uploader = ({
  acceptFileType,
  fileList,
  children,
  onChange
}: UploaderProps): ReactElement => {
  const {
    fileListRef,
    uploaderRef,
    uploaderId,
    files,
    clickTrigger,
    addFile,
    removeFile
  } = useUploader({
    fileList,
    onChange
  })
  const haveFiles = files.length > 0
  const isLessThanTablet = useMediaQuery('(max-width:1023px)')
  const listImageSize = isLessThanTablet ? '80px' : '280px'

  return (
    <StyledUploaderWrapper haveFiles={haveFiles}>
      <StyledFileListWrapper ref={fileListRef}>
        {files?.map(({ id, isRepresent, url }, index) => (
          <StyledFileWrapper key={id}>
            {isRepresent && (
              <StyledFileBadge colorScheme="orange">대표 사진</StyledFileBadge>
            )}
            <Image alt={`file-${index}`} boxSize={listImageSize} src={url} />
            <div onClick={removeFile}>
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
        <StyledUploaderTrigger>{children}</StyledUploaderTrigger>
        <StyledUploaderInput
          ref={uploaderRef}
          accept={acceptFileType}
          id={uploaderId}
          type="file"
          onChange={addFile}
        />
      </div>
    </StyledUploaderWrapper>
  )
}

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
