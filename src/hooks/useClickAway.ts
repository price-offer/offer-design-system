import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const events = ['mousedown', 'touchstart']

/** ref 외부 클릭 시, 특정 함수를 실행하는 hook입니다.
 * @param { handler:(e?:Event) => void } ref 외부 클릭시 실행할 handler 함수를 받습니다.
 * @return { ref: RefObject<T> } 클릭에서 제외할 ref를 반환합니다.
 */

export const useClickAway = <T extends HTMLElement>(
  handler: (e?: Event) => void
): RefObject<T> => {
  const ref = useRef<T>(null)
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const handleEvent: EventListener = e => {
      !element.contains(e.target as HTMLElement) && savedHandler.current(e)
    }

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent)
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent)
      }
    }
  }, [])

  return ref
}
