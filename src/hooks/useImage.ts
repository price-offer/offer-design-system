import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type NativeImageProps = React.ImgHTMLAttributes<HTMLImageElement>
type ImageEvent = React.SyntheticEvent<HTMLImageElement, Event>
interface UseImageProps {
  src: string
  fallbackSrc?: string
  onLoad?: NativeImageProps['onLoad']
  onError?: NativeImageProps['onError']
}

type Status = 'loading' | 'failed' | 'pending' | 'loaded'

export const useImage = ({
  src,
  fallbackSrc,
  onLoad,
  onError
}: UseImageProps): Status => {
  const [status, setStatus] = useState<Status>('pending')
  const imageRef = useRef<HTMLImageElement | null>()

  useLayoutEffect(() => {
    if (typeof window === undefined) {
      return
    }

    if (status === 'loading') {
      load()
    }

    return () => {
      init()
    }
  }, [status])

  useEffect(() => {
    if (src) {
      setStatus('loading')
    } else {
      setStatus('pending')
    }
  }, [src, fallbackSrc])

  const load = (): void => {
    if (!src) {
      return
    }

    init()

    const img = new Image()
    img.src = src
    img.onload = (event): void => {
      init()
      setStatus('loaded')
      onLoad?.(event as unknown as ImageEvent)
    }
    img.onerror = (error): void => {
      init()
      setStatus('failed')
      onError?.(error as unknown as ImageEvent)
    }

    imageRef.current = img
  }

  const init = (): void => {
    if (!imageRef.current) {
      return
    }

    imageRef.current.onload = null
    imageRef.current.onerror = null
    imageRef.current = null
  }

  return status
}
