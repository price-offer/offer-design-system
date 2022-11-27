import type { ForwardedRef, LegacyRef, MutableRefObject } from 'react'

type MergeRefParams<T = HTMLDivElement> =
  | MutableRefObject<T | null>[]
  | ForwardedRef<T>[]

export const mergeRefs = <T = HTMLDivElement>(
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
