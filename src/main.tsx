import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ButtonsProvider } from './contexts/ButtonsContext/index.tsx'
import { TimerProvider } from './contexts/TimerContext/index.tsx'
import { StylesProvider } from './contexts/StylesContext/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ButtonsProvider>
      <TimerProvider>
        <StylesProvider>
          <App />
        </StylesProvider>
      </TimerProvider>
    </ButtonsProvider>
  </React.StrictMode>
)
