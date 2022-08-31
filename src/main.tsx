import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { theme } from '@themes'
import { ThemeProvider } from '@emotion/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
