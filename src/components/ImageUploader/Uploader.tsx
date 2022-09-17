import type { File, OnChangeParams } from './index'
import type { HTMLAttributes, ReactElement } from 'react'
import { useMediaQuery, useUploader } from '@hooks'
import { ICON } from '@constants/icons'
import { Image } from '@components'
import styled from '@emotion/styled'

interface UploaderProps {
  acceptFileType: string
  children: ReactElement
  fileList: File[]
  onChange(params: OnChangeParams): void
}

interface StyledUploaderWrapperProps {
  haveList: boolean
}

export const Uploader = ({
  acceptFileType,
  fileList,
  children,
  onChange
}: UploaderProps): ReactElement => {
  const {
    uploaderId,
    uploaderRef,
    clickTrigger,
    files,
    fileListRef,
    addFile,
    removeFile
  } = useUploader({
    fileList,
    onChange
  })
  const haveList = files.length > 0
  const isUnderTablet = useMediaQuery('(max-width:1023px)')
  const listImageSize = isUnderTablet ? '80px' : '280px'

  return (
    <StyledUploaderWrapper haveList={haveList}>
      <StyledFileListWrapper ref={fileListRef}>
        {files?.map(({ id, isRepresent, name, url }, index) => (
          <div key={id}>
            {isRepresent && <span>대표 사진</span>}
            <Image alt={name} boxSize={listImageSize} src={url} />
            <div onClick={removeFile}>
              <Image
                alt={`close-icon_${index}`}
                boxSize="16px"
                data-id="close-icon"
                src={ICON.CLOSE_16}
              />
            </div>
          </div>
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
  ${({ theme, haveList }): string => `
    ${theme.mediaQuery.desktop} {
      display: flex;
      padding: 12px;
      background-color: ${theme.colors.grayScale.gray05};
    }
    ${theme.mediaQuery.tablet} {
      display: ${haveList ? 'flex' : 'inline-flex'};
      padding: 0px;
      background-color: ${theme.colors.background.white};
    }
    ${theme.mediaQuery.mobile} {
      display: ${haveList ? 'flex' : 'inline-flex'};
      padding: 0px;
      background-color: ${theme.colors.background.white};
    }
      justify-content: ${haveList ? 'flex-start' : 'center'};
      overflow: scroll;
      user-select: none;
    `}
`
const StyledFileListWrapper = styled.div`
  order: 2;
  display: flex;
  gap: 8px;
`
const StyledUploaderTrigger = styled.div`
  cursor: pointer;
  order: 1;
`
const StyledUploaderInput = styled.input<HTMLAttributes<HTMLInputElement>>`
  display: none;
`
