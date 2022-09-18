import { DesktopUploader, MobileUploader } from './template'
import { useImageUploader, useMediaQuery } from '@hooks'
import type { ReactElement } from 'react'

export interface ImageInfo {
  isRepresent: boolean
  id: string
  url: string
}
interface OnChangeParams {
  eventType: 'upload' | 'remove'
  imageList: ImageInfo[]
}
export type ImageUploaderOnChangeHandler = (params: OnChangeParams) => void
export interface ImageUploaderProps {
  imageList: ImageInfo[]
  onChange: ImageUploaderOnChangeHandler
}

export const ImageUploader = ({
  imageList: defaultImageList,
  onChange
}: ImageUploaderProps): ReactElement => {
  const {
    imageListRef,
    uploaderRef,
    imageList,
    openUploader,
    addImage,
    removeImage
  } = useImageUploader({
    defaultImageList,
    onChange
  })
  const isLessThanTablet = useMediaQuery('(max-width:1023px)')
  const Uploader = isLessThanTablet ? MobileUploader : DesktopUploader

  return (
    <Uploader
      addImage={addImage}
      imageList={imageList}
      imageListRef={imageListRef}
      openUploader={openUploader}
      removeImage={removeImage}
      uploaderRef={uploaderRef}
    />
  )
}
