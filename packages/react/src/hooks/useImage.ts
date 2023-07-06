import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type NativeImageProps = React.ImgHTMLAttributes<HTMLImageElement>
type ImageEvent = React.SyntheticEvent<HTMLImageElement, Event>
type UseImageProps = {
  src: string
  fallbackSrc?: string
  onLoad?: NativeImageProps['onLoad']
  onError?: NativeImageProps['onError']
}

type Status = 'loading' | 'failed' | 'pending' | 'loaded' | 'failedFallback'

type UseImageReturn = {
  status: Status
  onFallbackError(): void
  onLoadImage(): void
}

/** image의 현재 상태에 따른 렌더링을 도와주는 hook입니다
 * @param { string } src 이미지의 상태를 추적할 src 속성을 정합니다.
 * @param { (string | undefined) } fallbackSrc src props의 이미지 대신 추적할 src 속성을 정합니다.
 * @param { NativeImageProps['onLoad'] } onLoad image의 src 속성에서 onload 이벤트 호출 시 실행시킬 함수를 정합니다.
 * @param { NativeImageProps['onError'] } onError image의 src 속성에서 onerror 이벤트 호출 시 실행시킬 함수를 정합니다.
 * @return { () => void } onFallbackError fallbackSrc 사용 시, fallback Image의 onerror에 정의합니다.
 * @return { () => void } onLoadImage fallbackSrc 사용 시, Image의 onload에 정의합니다.
 * @return { 'loading' | 'failed' | 'pending' | 'loaded' | 'failedFallback' } status 현재 hook의 이미지 상태입니다.
 */
export const useImage = ({
  src,
  fallbackSrc,
  onLoad,
  onError
}: UseImageProps): UseImageReturn => {
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

  const onFallbackError = (): void => {
    setStatus('failedFallback')
  }

  const onLoadImage = (): void => {
    setStatus('loaded')
  }

  return { onFallbackError, onLoadImage, status }
}
