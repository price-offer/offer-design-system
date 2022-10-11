import type {
  ChangeEventHandler,
  HTMLAttributes,
  MutableRefObject,
  ReactElement
} from 'react'
import { DesktopUploader, MobileUploader } from './uploader'
import type { ImageInfo, UploaderOnChangeHandler } from '@types'
import { useImageUploader } from './useImageUploader'
import { useMediaQuery } from '@hooks'

export interface UploaderProps {
  images: ImageInfo[]
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  imageListRef: MutableRefObject<HTMLDivElement | null>
  addImage: ChangeEventHandler<HTMLInputElement>
  removeImage(index: number): void
  openUploader(): void
}

/* ImageUploader Props */
export type ImageUploaderProps = {
  images: ImageInfo[]
  onChange: UploaderOnChangeHandler
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

const MAX_LIST_LENGTH = 10

export const ImageUploader = ({
  images: defaultImages,
  onChange,
  ...props
}: ImageUploaderProps): ReactElement => {
  const {
    imageListRef,
    uploaderRef,
    images,
    openUploader,
    addImage,
    removeImage
  } = useImageUploader({
    images: defaultImages,
    onChange
  })
  const isLessThanTablet = useMediaQuery('(max-width:1023px)')
  const Uploader = isLessThanTablet ? MobileUploader : DesktopUploader
  const isShowListType = images.length > 0
  const isMaximum = images.length === MAX_LIST_LENGTH
  const imgTotal = `(${images.length}/${MAX_LIST_LENGTH})`

  return (
    <Uploader
      addImage={addImage}
      imageListRef={imageListRef}
      images={images}
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
