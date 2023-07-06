import '@emotion/react'
import type {
  Border,
  Colors,
  Fonts,
  MediaQuery,
  Radius,
  ZIndex
} from '@offer-ui/themes'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme {
    border: Border
    colors: Colors
    fonts: Fonts
    mediaQuery: MediaQuery
    radius: Radius
    zIndex: ZIndex
  }
}
