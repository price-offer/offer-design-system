import type {
  ChangeEventHandler,
  ForwardedRef,
  HTMLAttributes,
  MutableRefObject
} from 'react'
import { DesktopUploader, MobileUploader } from './uploader'
import type { ImageInfo, UploaderOnChangeHandler } from '@offer-ui/types'
import { forwardRef } from 'react'
import { useImageUploader } from './useImageUploader'
import { useMediaQuery } from '@offer-ui/hooks'

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
  /** ImageUploader로 업로드된 이미지의 목록을 정합니다.
   * @type ImageInfo[]
   */
  images: ImageInfo[]
  /** ImageUploader의 onChange 이벤트 시, 호출될 함수를 정합니다.
   * @type UploaderOnChangeHandler
   */
  onChange: UploaderOnChangeHandler
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

const MAX_LIST_LENGTH = 10

export const ImageUploader = forwardRef(function ImageUploader(
  { images: defaultImages, onChange, ...props }: ImageUploaderProps,
  ref: ForwardedRef<HTMLDivElement>
) {
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
      ref={ref}
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
})
