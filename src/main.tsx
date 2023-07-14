import ReactDOM from 'react-dom/client'
import { ButtonsProvider } from './contexts/ButtonsContext/index.tsx'
import { TimerProvider } from './contexts/TimerContext/index.tsx'
import { CustomizationProvider } from './contexts/CustomizationContext/index.tsx'
import { GlobalStyles } from './globalStyles.tsx'
import { Pages } from './Pages/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ButtonsProvider>
    <TimerProvider>
      <CustomizationProvider>
        <GlobalStyles />
        <Pages />
      </CustomizationProvider>
    </TimerProvider>
  </ButtonsProvider>
)
