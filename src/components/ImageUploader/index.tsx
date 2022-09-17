import { DesktopUploader, MobileUploader } from './template'
import { useImageUploader, useMediaQuery } from '@hooks'
import type { ReactElement } from 'react'

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
  const Uploader = isLessThanTablet ? MobileUploader : DesktopUploader

  return (
    <Uploader
      addImage={addImage}
      clickTrigger={clickTrigger}
      imageListRef={imageListRef}
      images={images}
      removeImage={removeImage}
      uploaderRef={uploaderRef}
    />
  )
}
