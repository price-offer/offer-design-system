import { useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'

interface UseImageParams {
  src: string
  fallbackSrc?: string
  onError?(): void
  onLoad?(): void
}
interface UseImageReturn {
  imgRef: MutableRefObject<HTMLImageElement | null>
  isError: boolean
}
type UseImage = (params: UseImageParams) => UseImageReturn

export const useImage: UseImage = ({
  src,
  fallbackSrc = '',
  onError,
  onLoad
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (!imgRef.current) {
      imgRef.current = new Image()
    }

    imgRef.current.onload = handleLoad
    imgRef.current.onerror = handleError
    imgRef.current.src = src || fallbackSrc
  }, [src, fallbackSrc, isError])

  const handleError = (): void => {
    onError?.()

    if (fallbackSrc) {
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  const handleLoad = (): void => {
    onLoad?.()
    setIsError(false)
  }

  return { imgRef, isError }
}
