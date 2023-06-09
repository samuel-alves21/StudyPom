import styled from 'styled-components'
import backgrundDefault from './img/default-backgrund.jpg'
import { GlobalStyles } from './globalStyles'
import { TimerConfig } from './components/TimerConfig'
import { breakpoints } from './utilities/breakpoints'
import { Logo } from './components/Logo'
import { Timer } from './components/Timer'
import { useSetWindow } from './hooks/useSetWindow'
import { useInit } from './hooks/useInit'

const App = () => {
  useSetWindow()
  useInit()

  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <Wrapper>
          <Logo />
          <Timer />
          <TimerConfig />
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

  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px 0;
  }
`

const Wrapper = styled.div`
  max-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;
`

export default App
