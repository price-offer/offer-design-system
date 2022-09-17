import { Button, Image } from '@components'
import { hexToCSSFilter } from 'hex-to-css-filter'
import { ICON } from '@constants'
import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import { Uploader } from './Uploader'

export interface File {
  isRepresent: boolean
  id: string
  name: string
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

export const ImageUploader = ({
  fileList,
  onChange
}: ImageUploaderProps): ReactElement => {
  return (
    <Uploader acceptFileType="image/*" fileList={fileList} onChange={onChange}>
      <>
        <StyledPcTrigger>
          <StyledTriggerIcon
            alt="picture-icon"
            boxSize="40px"
            src={ICON.PICTURE_40}
          />
          <StyledPcMeta>
            <p>상품 이미지 추가</p>
            <p>
              <StyledTriggerSpan>({fileList.length}/10)</StyledTriggerSpan>
            </p>
          </StyledPcMeta>
          <Button size="small">사진 업로드</Button>
        </StyledPcTrigger>
        <StyledTrigger>
          <StyledTriggerIcon
            alt="picture-icon"
            boxSize="40px"
            src={ICON.PICTURE_40}
          />
          <StyledTriggerSpan>({fileList.length}/10)</StyledTriggerSpan>
        </StyledTrigger>
      </>
    </Uploader>
  )
}

const StyledPcTrigger = styled.div`
  ${({ theme }): string => `
    ${theme.mediaQuery.desktop} {
      display: flex;
    }
    ${theme.mediaQuery.tablet} {
      display: none;
    }
    ${theme.mediaQuery.mobile} {
      display: none;
    }
  `}
  width: 280px;
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

  p:nth-of-type(1) {
    line-height: 24px;
  }
  p:nth-of-type(2) {
    margin-top: 4px;
    line-height: 20px;
  }
`

const StyledTrigger = styled.div`
  ${({ theme }): string => `
    ${theme.mediaQuery.desktop} {
      display: none;
    }
    ${theme.mediaQuery.tablet} {
      display: flex;
      background-color: ${theme.colors.grayScale.gray05};
    }
    ${theme.mediaQuery.mobile} {
      display: flex;
      background-color: ${theme.colors.grayScale.gray05};
    }
  `}
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: pointer;
`

const StyledTriggerIcon = styled(Image)`
  filter: ${({ theme }): string =>
    hexToCSSFilter(theme.colors.grayScale.gray30).filter};
`

const StyledTriggerSpan = styled.span`
  color: ${({ theme }): string => theme.colors.grayScale.gray70};
  margin-top: 3px;
`
