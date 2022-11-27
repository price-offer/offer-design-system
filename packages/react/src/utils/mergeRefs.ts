import type { ForwardedRef, LegacyRef, MutableRefObject } from 'react'

type MergeRefParams<T extends HTMLDivElement> =
  | MutableRefObject<T | null>[]
  | ForwardedRef<T>[]

export const mergeRefs = <T extends HTMLDivElement>(
  refs: MergeRefParams<T>
): LegacyRef<T> | undefined => {
  return elem => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(elem)
      } else if (ref !== null) {
        ref.current = elem
      }
    })
  }
}
