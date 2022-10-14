import { OfferStyleProvider } from '../../react/src/styles'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => (
    <OfferStyleProvider>
      <Story/>
    </OfferStyleProvider>
  )
]