import type { ChangeEventHandler, MouseEventHandler } from 'react'
import type {
  ImageInfo,
  ImageUploaderProps,
  UploaderProps
} from '@components/ImageUploader'
import { useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

const isValidImageUrl = (file: unknown): file is string =>
  typeof file === 'string'

const MAX_LIST_LENGTH = 10
const NOTICE_MESSAGE = '사진은 최대 10장만 추가 가능합니다.'

export const useImageUploader = ({
  imageList: defaultImageList,
  onChange
}: ImageUploaderProps): UploaderProps => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const imageListRef = useRef<HTMLDivElement | null>(null)
  const [imageList, setImageList] = useState<ImageInfo[]>(defaultImageList)

  const openUploader = (): void => {
    if (imageList.length === 10) {
      alert(NOTICE_MESSAGE)
      return
    }

    uploaderRef.current?.click()
  }

  const removeImage: MouseEventHandler<HTMLDivElement> = e => {
    if (!imageListRef.current) {
      return
    }

    const closeIcons = imageListRef.current.querySelectorAll(
      '[data-id="close-icon"]'
    )
    const fileIndex = Array.from(closeIcons).findIndex(
      icon => icon === e.target
    )

    const firstToIndexFileList = imageList.slice(0, fileIndex)
    const indexToLastFileList = imageList.slice(fileIndex + 1)
    const newFiles = [...firstToIndexFileList, ...indexToLastFileList]

    const isRepresent = imageList[fileIndex].isRepresent && imageList.length > 1
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
      alert(NOTICE_MESSAGE)
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
    imageFiles.forEach((file, index) => {
      const isRepresent = imageList.length === 0 && index === 0
      const imageUrl = isValidImageUrl(file) ? file : ''
      const newImage = {
        id: uuidV4(),
        isRepresent,
        url: imageUrl
      }

      setImageList(prevImageList => {
        return [...prevImageList, newImage]
      })
    })

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
