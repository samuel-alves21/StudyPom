import ReactDOM from 'react-dom/client'
import { ButtonsProvider } from './contexts/ButtonsContext/index.tsx'
import { TimerProvider } from './contexts/TimerContext/index.tsx'
import { CustomizationProvider } from './contexts/CustomizationContext/index.tsx'
import { GlobalStyles } from './globalStyles.tsx'
import { Pages } from './Pages/index.tsx'
import { LoginProvider } from './contexts/LoginContext/index.tsx'
import { UserProvider } from './contexts/UserContext/index.tsx'
import { AccessProvider } from './contexts/AccessContext/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AccessProvider>
    <UserProvider>
      <ButtonsProvider>
        <TimerProvider>
          <CustomizationProvider>
            <LoginProvider>
              <GlobalStyles />
              <Pages />
            </LoginProvider>
          </CustomizationProvider>
        </TimerProvider>
      </ButtonsProvider>
    </UserProvider>
  </AccessProvider>
)
