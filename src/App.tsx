import styled from 'styled-components'
import backgrundDefault from './img/default-backgrund.jpg'
import { useContext, useEffect } from 'react'
import { GlobalStyles } from './globalStyles'
import { Pomodoro } from './components/Pomodoro'
import { Heading } from './components/Heading'
import { ButtonsContext, MyButtonContext } from './contexts/ButtonsContext'
import { Details } from './components/Details'
import { ConfigDescription } from './components/ConfigsDescription.'
import { MyTimerContext, TimerContext } from './contexts/TimerContext'

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
          </div>
          <ConfigDescription />
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
`

const Wrapper = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

export default App
