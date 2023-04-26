import styled from 'styled-components'
import backgrundDefault from './img/default-backgrund.jpg'
import { GlobalStyles } from './globalStyles'
import { Pomodoro } from './components/Pomodoro'

const App = () => {
  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <h1>Wellcome User</h1>
        <Pomodoro />
      </MainContainer>
    </>
  )
}

const MainContainer = styled.div`
  min-height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 400px;
  position: relative;

  &::before {
    content: "";
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

export default App
