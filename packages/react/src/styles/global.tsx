import { css, Global } from '@emotion/react'
import { FontCSS, ResetCSS } from '@offer-ui/styles'
import type { ReactElement } from 'react'
import { theme } from '@offer-ui/themes'

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard;
    font-weight: normal;
    color: ${theme.colors.grayScale90};
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
