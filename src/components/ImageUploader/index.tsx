import { Button, Image } from '@components'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import { Uploader } from './Uploader'
import { useMediaQuery } from '@hooks/useMediaQuery'
import { useState } from 'react'

export interface File {
  isRepresent: boolean
  id: string
  url: string
}

export interface OnChangeParams {
  eventType: 'upload' | 'remove'
  fileList: File[]
}

export interface ImageUploaderProps {
  fileList: File[]
  onChange(params: OnChangeParams): void
}
interface StyledFileLengthProps {
  isMax: boolean
}

type HandleChange = (params: OnChangeParams) => void

export const ImageUploader = ({
  fileList,
  onChange
}: ImageUploaderProps): ReactElement => {
  const isLessThanTablet = useMediaQuery('(max-width:1023px)')
  const [files, setFiles] = useState<File[]>(fileList)
  const isMax = files.length === 10

  const handleChange: HandleChange = params => {
    setFiles(params.fileList)
    onChange?.(params)
  }

  return (
    <Uploader
      acceptFileType="image/*"
      fileList={fileList}
      onChange={handleChange}>
      <>
        {isLessThanTablet && (
          <StyledMobileTrigger>
            <StyledTriggerIcon
              alt="picture-icon"
              boxSize="40px"
              src={ICON.PICTURE_40}
            />
            <StyledFileLength isMax={isMax}>
              ({files.length}/10)
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
                ({files.length}/10)
              </StyledFileLength>
            </StyledPcMeta>
            <Button size="small">사진 업로드</Button>
          </StyledPcTrigger>
        )}
      </>
    </Uploader>
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
