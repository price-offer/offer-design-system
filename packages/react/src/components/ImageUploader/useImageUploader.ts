import { NOTICE_MESSAGE } from '@offer-ui/constants'
import type { ImageInfo } from '@offer-ui/types'
import { useRef, useState } from 'react'
import type { ChangeEventHandler } from 'react'
import { v4 as uuidV4 } from 'uuid'
import type { ImageUploaderProps, UploaderProps } from './index'

const isValidImageUrl = (file: unknown): file is string =>
  typeof file === 'string'

const MAX_LIST_LENGTH = 10

export const useImageUploader = ({
  images: defaultImages,
  onChange
}: ImageUploaderProps): UploaderProps => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const imageListRef = useRef<HTMLDivElement | null>(null)
  const [images, setImages] = useState<ImageInfo[]>(defaultImages)

  const openUploader = (): void => {
    if (images.length === MAX_LIST_LENGTH) {
      alert(NOTICE_MESSAGE.IMAGE_UPLOAD)
      return
    }

    uploaderRef.current?.click()
  }

  const removeImage = (index: number): void => {
    if (!imageListRef.current) {
      return
    }

    const newImages = [...images]
    newImages.splice(index, 1)
    const isRepresent = images[index].isRepresent && images.length > 1

    if (isRepresent) {
      newImages[0].isRepresent = true
    }

    onChange({ eventType: 'remove', images: newImages })
    setImages(newImages)
  }

  const addImage: ChangeEventHandler<HTMLInputElement> = async e => {
    const files = e.target.files

    if (!files) {
      return
    }

    const isOverListLength =
      MAX_LIST_LENGTH - (images.length + files.length) < 0
    if (isOverListLength) {
      alert(NOTICE_MESSAGE.IMAGE_UPLOAD)
      return
    }

    const fulfilledImageFiles = (
      file: File
    ): Promise<string | ArrayBuffer | null> => {
      const reader = new FileReader()

      return new Promise(resolve => {
        reader.onload = (): void => {
          resolve(reader.result)
        }

        reader.readAsDataURL(file)
      })
    }

    const newImages = await Promise.all(
      Array.from(files).map(async (file, index) => {
        const isRepresent = images.length === 0 && index === 0
        const dataURL = await fulfilledImageFiles(file)
        const url = isValidImageUrl(dataURL) ? dataURL : ''

        return { id: uuidV4(), isRepresent, file, url }
      })
    )

    const nextImages = [...images, ...newImages]

    setImages(nextImages)
    onChange({ eventType: 'upload', images: nextImages })
    e.target.value = ''
  }

  return {
    addImage,
    imageListRef,
    images,
    openUploader,
    removeImage,
    uploaderRef
  }
}
