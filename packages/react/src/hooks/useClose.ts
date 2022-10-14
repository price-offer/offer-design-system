import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'

interface Params {
  onClose: Dispatch<SetStateAction<boolean>>
}

export const useClose = <T extends HTMLElement>({
  onClose
}: Params): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null)

  const handleClose = (e: MouseEvent): void => {
    !ref.current?.contains(e.target as Element) && onClose(false)
  }

  useEffect(() => {
    document.addEventListener('click', e => {
      handleClose(e)
    })

    return () => {
      document.removeEventListener('click', e => {
        handleClose(e)
      })
    }
  }, [onClose])

  return ref
}
