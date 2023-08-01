import { CacheProvider, ThemeProvider } from '@emotion/react'
import type { EmotionCache, Theme, ThemeProviderProps } from '@emotion/react'
import type { ReactElement } from 'react'
import { GlobalStyle } from './global'
import { theme as offerTheme } from './themes'

type DefaultProps = {
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme)
} & Omit<ThemeProviderProps, 'theme'>
type UseSSRProps = {
  isSSR: true
  cache: EmotionCache
} & DefaultProps
type UseCSRProps = {
  isSSR?: false
  cache?: never
} & DefaultProps

type OfferStyleProviderProps = UseSSRProps | UseCSRProps

export const OfferStyleProvider = ({
  isSSR = false,
  cache,
  children,
  theme
}: OfferStyleProviderProps): ReactElement => {
  if (isSSR && cache) {
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme || offerTheme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </CacheProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme || offerTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    )
  }
}
