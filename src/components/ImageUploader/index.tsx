import type {
  ChangeEventHandler,
  MouseEventHandler,
  MutableRefObject,
  ReactElement
} from 'react'
import { DesktopUploader, MobileUploader } from './uploader'
import { useImageUploader, useMediaQuery } from '@hooks'

export interface ImageInfo {
  isRepresent: boolean
  id: string
  url: string
}
export interface UploaderProps {
  imageList: ImageInfo[]
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  imageListRef: MutableRefObject<HTMLDivElement | null>
  addImage: ChangeEventHandler<HTMLInputElement>
  removeImage: MouseEventHandler<HTMLDivElement>
  openUploader(): void
}

/* ImageUploader Props */
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
    imageList: defaultImageList,
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
