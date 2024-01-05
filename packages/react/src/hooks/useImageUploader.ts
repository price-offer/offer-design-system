import type { ImageInfo } from '@offer-ui/types'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEventHandler, MutableRefObject, ChangeEvent } from 'react'
import { v4 as uuidV4 } from 'uuid'

const isValidImageUrl = (file: unknown): file is string =>
  typeof file === 'string'

type Image = Omit<ImageInfo, 'isRepresent'>
type UseImageUploaderProps = Partial<{
  defaultImage: Image
  onChange(image: Image): void
}>
type UseImageUploaderReturns = {
  changeImage: ChangeEventHandler<HTMLInputElement>
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  image: Image
  openUploader(): void
}

export const useImageUploader = ({
  defaultImage,
  onChange
}: UseImageUploaderProps): UseImageUploaderReturns => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<Image>(
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
