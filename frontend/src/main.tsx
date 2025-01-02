import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ColorSchemeScript } from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="light" />
    <App />
  </React.StrictMode>
)