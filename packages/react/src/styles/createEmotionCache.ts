import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/react'

export const createEmotionCache = (): EmotionCache => {
  return createCache({ key: 'css', prepend: true })
}
