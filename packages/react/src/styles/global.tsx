import { css, Global } from '@emotion/react'
import type { ReactElement } from 'react'
import { FontCSS, ResetCSS } from '../styles'
import { colors } from '../styles/themes'

const globalStyle = css`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Pretendard;
    font-weight: normal;
    color: ${colors.grayScale90};
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
