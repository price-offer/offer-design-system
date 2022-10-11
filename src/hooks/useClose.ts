import type { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'

interface Params {
  onClose: Dispatch<SetStateAction<boolean>>
}

/** ref 외부 클릭 시, onClose 이벤트를 호출하는 hook입니다.
 * @param { { onClose: Dispatch<SetStateAction<boolean>> }} params onClose 이벤트를 정합니다.
 * @return { MutableRefObject<T | null> } ref 외부 클릭 시, onClose를 발생시킬 ref를 반환합니다.
 */
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
