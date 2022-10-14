import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const events = ['mousedown', 'touchstart']

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
