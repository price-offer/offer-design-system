import type { AppProps } from 'next/app'
import { OfferStyleProvider } from '@offer-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OfferStyleProvider>
      <Component {...pageProps} />
    </OfferStyleProvider>
  )
}
