import { theme } from '../src/themes'
import { ThemeProvider } from "@emotion/react"

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
    <ThemeProvider theme={theme}>
      <Story/>
    </ThemeProvider>
  )
]