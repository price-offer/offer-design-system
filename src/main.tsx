import App from './App'
import { GlobalStyle } from '@styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { theme } from '@themes'
import { ThemeProvider } from '@emotion/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
