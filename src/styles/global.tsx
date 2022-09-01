import { css, Global } from '@emotion/react'
import { FontCSS, ResetCSS } from '@styles'
import type { ReactElement } from 'react'

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard;
  }
`

export const GlobalStyle = (): ReactElement => {
  return (
    <>
      <Global styles={ResetCSS} />
      <Global styles={FontCSS} />
      <Global styles={globalStyle} />
    </>
  )
}
