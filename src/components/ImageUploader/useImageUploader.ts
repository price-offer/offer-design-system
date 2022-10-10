import type { ImageUploaderProps, UploaderProps } from './index'
import { useRef, useState } from 'react'
import type { ChangeEventHandler } from 'react'
import type { ImageInfo } from '@types'
import { NOTICE_MESSAGE } from '@constants'
import { v4 as uuidV4 } from 'uuid'

const isValidImageUrl = (file: unknown): file is string =>
  typeof file === 'string'

const MAX_LIST_LENGTH = 10

export const useImageUploader = ({
  imageList: defaultImageList,
  onChange
}: ImageUploaderProps): UploaderProps => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const imageListRef = useRef<HTMLDivElement | null>(null)
  const [imageList, setImageList] = useState<ImageInfo[]>(defaultImageList)

  const openUploader = (): void => {
    if (imageList.length === MAX_LIST_LENGTH) {
      alert(NOTICE_MESSAGE.IMAGE_UPLOAD)
      return
    }

    uploaderRef.current?.click()
  }

  const removeImage = (index: number): void => {
    if (!imageListRef.current) {
      return
    }

    const newFiles = [...imageList]
    newFiles.splice(index, 1)

    const isRepresent = imageList[index].isRepresent && imageList.length > 1
    if (isRepresent) {
      newFiles[0].isRepresent = true
    }

    onChange({ eventType: 'remove', imageList: newFiles })
    setImageList(newFiles)
  }

  const addImage: ChangeEventHandler<HTMLInputElement> = async e => {
    const files = e.target.files

    if (!files) {
      return
    }

    const isOverListLength =
      MAX_LIST_LENGTH - (imageList.length + files.length) < 0
    if (isOverListLength) {
      alert(NOTICE_MESSAGE.IMAGE_UPLOAD)
      return
    }

    const fulfilledImageFiles = Array.from(files).map(file => {
      const reader = new FileReader()

      return new Promise(resolve => {
        reader.onload = (): void => {
          resolve(reader.result)
        }

        reader.readAsDataURL(file)
      })
    })

    const imageFiles = await Promise.all(fulfilledImageFiles)
    const newImageList = imageFiles.map((file, index) => {
      const isRepresent = imageList.length === 0 && index === 0
      const imageUrl = isValidImageUrl(file) ? file : ''

      return {
        id: uuidV4(),
        isRepresent,
        url: imageUrl
      }
    })

    setImageList(prevImageList => [...prevImageList, ...newImageList])
    onChange({ eventType: 'upload', imageList })
    e.target.value = ''
  }

  return {
    addImage,
    imageList,
    imageListRef,
    openUploader,
    removeImage,
    uploaderRef
  }
}
