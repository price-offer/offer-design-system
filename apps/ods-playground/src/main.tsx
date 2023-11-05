import ReactDOM from 'react-dom/client'
import { App } from './App'
import { OfferStyleProvider } from '@offer-ui/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <OfferStyleProvider>
    <App />
  </OfferStyleProvider>,
)
