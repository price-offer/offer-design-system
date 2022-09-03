import '@emotion/react'
import type { Border, Colors, Fonts, MediaQuery, Radius, ZIndex } from '@themes'

declare module '@emotion/react' {
  export interface Theme {
    border: Border
    colors: Colors
    fonts: Fonts
    mediaQuery: MediaQuery
    radius: Radius
    zIndex: ZIndex
  }
}
