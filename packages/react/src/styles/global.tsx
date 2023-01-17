import { css, Global } from '@emotion/react'
import { FontCSS, ResetCSS } from '@offer-ui/styles'
import { colors } from '@offer-ui/themes'
import type { ReactElement } from 'react'

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard;
    font-weight: normal;
    color: ${colors.gray90};
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
