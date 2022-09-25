import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'

interface Params {
  onClose: Dispatch<SetStateAction<boolean>>
}

type UseClose = (params: Params) => MutableRefObject<HTMLDivElement | null>

export const useClose: UseClose = ({ onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null)

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
