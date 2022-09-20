import type {
  ChangeEventHandler,
  MouseEventHandler,
  MutableRefObject
} from 'react'
import { useRef, useState } from 'react'
import type { ImageInfo } from '@components'
import { v4 as uuidV4 } from 'uuid'

interface OnChangeParams {
  eventType: 'upload' | 'remove'
  imageList: ImageInfo[]
}
interface Params {
  defaultImageList: ImageInfo[]
  onChange(params: OnChangeParams): void
}
interface Returns {
  imageList: ImageInfo[]
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  imageListRef: MutableRefObject<HTMLDivElement | null>
  addImage: ChangeEventHandler<HTMLInputElement>
  removeImage: MouseEventHandler<HTMLDivElement>
  openUploader: MouseEventHandler<HTMLDivElement>
}

export const useImageUploader = ({
  defaultImageList,
  onChange
}: Params): Returns => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const imageListRef = useRef<HTMLDivElement | null>(null)
  const [imageList, setImageList] = useState<ImageInfo[]>(defaultImageList)

  const openUploader: MouseEventHandler<HTMLDivElement> = () => {
    if (imageList.length === 10) {
      alert('사진은 최대 10장만 추가 가능합니다.')
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

  const addImage: ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files) {
      return
    }

    const imageFile = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = (): void => {
      const newImage = {
        id: uuidV4(),
        isRepresent: imageList.length === 0,
        url: `${reader.result}`
      }

      const newImageList = [...imageList, newImage]
      onChange({ eventType: 'upload', imageList: newImageList })
      setImageList(newImageList)
      e.target.value = ''
    }
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
