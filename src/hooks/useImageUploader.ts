import type {
  ChangeEventHandler,
  MouseEventHandler,
  MutableRefObject
} from 'react'
import type { ImageInfo, OnChangeParams } from '@components'
import { useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

interface Params {
  defaultImgList: ImageInfo[]
  onChange(params: OnChangeParams): void
}

interface Returns {
  images: ImageInfo[]
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  imageListRef: MutableRefObject<HTMLDivElement | null>
  addImage: ChangeEventHandler<HTMLInputElement>
  removeImage: MouseEventHandler<HTMLDivElement>
  clickTrigger: MouseEventHandler<HTMLDivElement>
}

type UseImageUploader = (params: Params) => Returns

export const useImageUploader: UseImageUploader = ({
  defaultImgList: fileList,
  onChange
}) => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const imageListRef = useRef<HTMLDivElement | null>(null)
  const [images, setImages] = useState<ImageInfo[]>(fileList)

  const clickTrigger: MouseEventHandler<HTMLDivElement> = () => {
    if (images.length === 10) {
      alert('사진은 최대 10장만 추가가 가능합니다.')
      return
    }

    uploaderRef.current?.click()
  }

  const removeImage: MouseEventHandler<HTMLDivElement> = (e): void => {
    if (!imageListRef.current) {
      return
    }

    const closeIcons = imageListRef.current.querySelectorAll(
      '[data-id="close-icon"]'
    )
    const fileIndex = Array.from(closeIcons).findIndex(
      icon => icon === e.target
    )

    const firstToIndexFileList = images.slice(0, fileIndex)
    const indexToLastFileList = images.slice(fileIndex + 1)
    const newFiles = [...firstToIndexFileList, ...indexToLastFileList]

    const isRepresent = images[fileIndex].isRepresent && images.length > 1
    if (isRepresent) {
      newFiles[0].isRepresent = true
    }

    onChange({ eventType: 'remove', imgList: newFiles })
    setImages(newFiles)
  }

  const addImage: ChangeEventHandler<HTMLInputElement> = e => {
    const formData = new FormData()

    if (!e.target.files) {
      return
    }

    const imageFile = e.target.files[0]
    formData.append('image', imageFile)

    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = (): void => {
      const newImage = {
        id: uuidV4(),
        isRepresent: images.length === 0,
        url: `${reader.result}`
      }

      const newImgList = [...images, newImage]
      onChange({ eventType: 'upload', imgList: newImgList })
      setImages(newImgList)
      e.target.value = ''
    }
  }

  return {
    addImage,
    clickTrigger,
    imageListRef,
    images,
    removeImage,
    uploaderRef
  }
}
