import type {
  ChangeEventHandler,
  HTMLAttributes,
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
  removeImage(index: number): void
  openUploader(): void
}

/* ImageUploader Props */
interface OnChangeParams {
  eventType: 'upload' | 'remove'
  imageList: ImageInfo[]
}
export type ImageUploaderOnChangeHandler = (params: OnChangeParams) => void
export type ImageUploaderProps = {
  imageList: ImageInfo[]
  onChange: ImageUploaderOnChangeHandler
} & HTMLAttributes<HTMLDivElement>

const MAX_LIST_LENGTH = 10

export const ImageUploader = ({
  imageList: defaultImageList,
  onChange,
  ...props
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
  const isShowListType = imageList.length > 0
  const isMaximum = imageList.length === MAX_LIST_LENGTH
  const imgTotal = `(${imageList.length}/${MAX_LIST_LENGTH})`

  return (
    <Uploader
      addImage={addImage}
      imageList={imageList}
      imageListRef={imageListRef}
      imgTotal={imgTotal}
      isMaximum={isMaximum}
      isShowListType={isShowListType}
      openUploader={openUploader}
      removeImage={removeImage}
      uploaderRef={uploaderRef}
      {...props}
    />
  )
}
