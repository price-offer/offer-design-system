import type { ImageInfo } from '@offer-ui/types'
import { isValidImageUrl } from '@offer-ui/utils/validation'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEventHandler, MutableRefObject, ChangeEvent } from 'react'
import { v4 as uuidV4 } from 'uuid'

export type UploaderImage = Omit<ImageInfo, 'isRepresent'>
export type UseImageUploaderProps = Partial<{
  defaultImage: UploaderImage
  onChange(image: UploaderImage): void
}>
export type UseImageUploaderReturns = {
  changeImage: ChangeEventHandler<HTMLInputElement>
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  image: UploaderImage
  openUploader(): void
}

export const useImageUploader = ({
  defaultImage,
  onChange
}: UseImageUploaderProps): UseImageUploaderReturns => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<UploaderImage>(
    defaultImage || { id: 'defaultImage', url: '' }
  )

  const openUploader = (): void => {
    uploaderRef.current?.click()
  }

  const changeImage = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = (): void => {
      const imageUrl = reader.result

      if (isValidImageUrl(imageUrl)) {
        const newImage = {
          id: uuidV4(),
          url: imageUrl,
          file
        }

        setImage(newImage)
        onChange?.(newImage)
      }
    }

    reader.readAsDataURL(file)
    e.target.value = ''
  }

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage)
    }
  }, [defaultImage])

  return {
    changeImage,
    image,
    openUploader,
    uploaderRef
  }
}
