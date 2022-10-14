import type { ReactElement, ReactNode } from 'react'
import { GlobalStyle } from './global'
import { theme } from './themes'
import { ThemeProvider } from '@emotion/react'

export const OfferStyleProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
