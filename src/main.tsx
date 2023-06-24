import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ButtonsProvider } from './contexts/ButtonsContext/index.tsx'
import { TimerProvider } from './contexts/TimerContext/index.tsx'
import { CustomizationProvider } from './contexts/CustomizationContext/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ButtonsProvider>
    <TimerProvider>
      <CustomizationProvider>
        <App />
      </CustomizationProvider>
    </TimerProvider>
  </ButtonsProvider>
)
