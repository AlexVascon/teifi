import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from '@shopify/polaris'
// en.json is English. Replace with fr.json for French, etc
import translations from '@shopify/polaris/locales/en.json'
import '@shopify/polaris/build/esm/styles.css'
import { ContextProvider } from './Context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppProvider i18n={translations}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </AppProvider>
)
