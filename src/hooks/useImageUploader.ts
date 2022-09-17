import type {
  ChangeEventHandler,
  MouseEventHandler,
  MutableRefObject
} from 'react'
import type { Img, OnChangeParams } from '@components'
import { useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

interface Params {
  defaultImgList: Img[]
  onChange(params: OnChangeParams): void
}

interface Returns {
  files: Img[]
  uploaderRef: MutableRefObject<HTMLInputElement | null>
  imgListRef: MutableRefObject<HTMLDivElement | null>
  addFile: ChangeEventHandler<HTMLInputElement>
  removeFile: MouseEventHandler<HTMLDivElement>
  clickTrigger: MouseEventHandler<HTMLDivElement>
}

type UseImageUploader = (params: Params) => Returns

export const useImageUploader: UseImageUploader = ({
  defaultImgList: fileList,
  onChange
}) => {
  const uploaderRef = useRef<HTMLInputElement | null>(null)
  const imgListRef = useRef<HTMLDivElement | null>(null)
  const [files, setFiles] = useState<Img[]>(fileList)

  const clickTrigger: MouseEventHandler<HTMLDivElement> = () => {
    if (files.length === 10) {
      alert('사진은 최대 10장만 추가가 가능합니다.')
      return
    }

    uploaderRef.current?.click()
  }

  const removeFile: MouseEventHandler<HTMLDivElement> = (e): void => {
    if (!imgListRef.current) {
      return
    }

    const closeIcons = imgListRef.current.querySelectorAll(
      '[data-id="close-icon"]'
    )
    const fileIndex = Array.from(closeIcons).findIndex(
      icon => icon === e.target
    )

    const firstToIndexFileList = files.slice(0, fileIndex)
    const indexToLastFileList = files.slice(fileIndex + 1)
    const newFiles = [...firstToIndexFileList, ...indexToLastFileList]

    const isRepresent = files[fileIndex].isRepresent && files.length > 1
    if (isRepresent) {
      newFiles[0].isRepresent = true
    }

    onChange({ eventType: 'remove', imgList: newFiles })
    setFiles(newFiles)
  }

  const addFile: ChangeEventHandler<HTMLInputElement> = e => {
    const formData = new FormData()

    if (!e.target.files) {
      return
    }

    const imageFile = e.target.files[0]
    formData.append('image', imageFile)

    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = (): void => {
      const newFile = {
        id: uuidV4(),
        isRepresent: files.length === 0,
        url: `${reader.result}`
      }

      const newFiles = [...files, newFile]
      onChange({ eventType: 'upload', imgList: newFiles })
      setFiles(newFiles)
      e.target.value = ''
    }
  }

  return {
    addFile,
    clickTrigger,
    files,
    imgListRef,
    removeFile,
    uploaderRef
  }
}
