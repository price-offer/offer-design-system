import { CacheProvider, ThemeProvider } from '@emotion/react'
import type { EmotionCache, Theme, ThemeProviderProps } from '@emotion/react'
import { GlobalStyle } from './global'
import { theme as offerTheme } from './themes'
import type { ReactElement } from 'react'

interface DefaultProps extends Omit<ThemeProviderProps, 'theme'> {
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme)
}
interface UseSSRProps extends DefaultProps {
  isSSR: true
  cache: EmotionCache
}
interface UseCSRProps extends DefaultProps {
  isSSR?: false
  cache?: never
}

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
