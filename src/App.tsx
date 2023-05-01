import styled from 'styled-components'
import backgrundDefault from './img/default-backgrund.jpg'
import { useContext, useEffect } from 'react'
import { GlobalStyles } from './globalStyles'
import { Pomodoro } from './components/Pomodoro'
import { PomodoroHeading } from './components/PomodoroHeading'
import { ButtonsContext, MyButtonContext } from './contexts/ButtonsContext'
import { Details } from './components/Details'
import { MyTimerContext, TimerContext } from './contexts/TimerContext'
import { Configs } from './components/Configs'

const App = () => {
  const { buttonState, buttonDispatch } = useContext(
    ButtonsContext
  ) as MyButtonContext

  const {
    timeState: { pomodoroTime },
    timeDispatch,
  } = useContext(TimerContext) as MyTimerContext

  useEffect(() => {
    buttonDispatch({ type: 'POMODORO' })
    timeDispatch({ type: 'SET_POMODORO_TIME', payload: pomodoroTime })
  }, [pomodoroTime, timeDispatch, buttonDispatch])

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <Wrapper>
          <div>
            <PomodoroHeading
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
          </div>
          <Configs />
        </Wrapper>
      </MainContainer>
    </>
  )
}

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 50px 0;

  &::before {
    content: '';
    background: url(${backgrundDefault}) center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(1.5px);
    z-index: -1;
  }

  @media (max-width: 430px) {
    padding: 15px 0;
  }
`

const Wrapper = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 430px) {
    gap: 100px;
  }
`

export default App
