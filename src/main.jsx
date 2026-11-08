import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/global.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import I18nProvider from './i18n/I18nProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </I18nProvider>
  </StrictMode>,
)
