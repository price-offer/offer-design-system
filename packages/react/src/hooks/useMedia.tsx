import { useLayoutEffect, useState } from 'react'

interface UseMediaType {
  mobile: boolean
  tablet: boolean
  desktop: boolean
}

const useMedia = (): UseMediaType => {
  const [isTablet, setIsTablet] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('screen and (max-width: 1023px)').matches
  )
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('screen and (max-width: 699px').matches
  )

  useLayoutEffect(() => {
    const onResize = (): void => {
      setIsTablet(
        typeof window !== 'undefined' &&
          window.matchMedia('screen and (max-width: 1023px)').matches
      )
      setIsMobile(
        typeof window !== 'undefined' &&
          window.matchMedia('screen and (max-width: 699px').matches
      )
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return {
    mobile: isMobile,
    tablet: isTablet,
    desktop: !isTablet
  }
}

export { useMedia }
