import styled from 'styled-components'
import backgrundDefault from './img/default-backgrund.jpg'
import { useContext } from 'react'
import { GlobalStyles } from './globalStyles'
import { Pomodoro } from './components/Pomodoro'
import { Heading } from './components/Heading'
import { ButtonsContext, MyButtonContext } from './contexts/ButtonsContext'
import { Details } from './components/Details'

const App = () => {
  const { buttonState } = useContext(ButtonsContext) as MyButtonContext

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <PomodoroWrapper>
          <Heading
            text={
              !buttonState.wasClicked
                ? 'Are you Ready?'
                : buttonState.pomodoro
                ? 'Working'
                : buttonState.short
                ? 'Short Break'
                : 'Long Break'
            }
          />
          <Pomodoro />
          <Details />
        </PomodoroWrapper>
      </MainContainer>
    </>
  )
}

const MainContainer = styled.div`
  min-height: 100vh;

  display: flex;

  justify-content: center;

  padding-bottom: 400px;
  position: relative;

  &::before {
    content: '';
    background: url(${backgrundDefault}) center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(0.8px);
    z-index: -1;
  }
`

const PomodoroWrapper = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default App
