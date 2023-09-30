import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { UserConfig } from '../components/UserConfig'
import { breakpoints } from '../utilities/breakpoints'
import { Logo } from '../components/Logo'
import { Timer } from '../components/Timer'
import { useSetWindowTitle } from '../hooks/useSetWindowTitle'
import { useSetInitialTimer } from '../hooks/useSetInitialTimer'
import { CustomizationContext, CustomizationContextType } from '../contexts/CustomizationContext'
import { ColorStyle } from '../components/ColorStyle'
import { LoginIcon } from '../components/LoginIcon'
import { Spinner } from '../components/Spinner'
import { useUserManager } from '../hooks/useUserManager'

export interface MainContainerProps {
  background: string
  blur: string
  bright: string
}

const App = () => {
  const {
    customizationState: { background, blur, bright, mainColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const [isLoading, setIsLoading] = useState(true)

  useUserManager(setIsLoading)
  useSetWindowTitle()
  useSetInitialTimer()

  // useEffect(() => {
  //   const handleReload = (event: BeforeUnloadEvent) => {
  //     event.returnValue = 'Are you sure you want to leave this page?'
  //     console.log('saving data...')
  //   }

  //   window.addEventListener('beforeunload', handleReload)

  //   return () => window.removeEventListener('beforeunload', handleReload)
  // }, [])

  return (
    <>
      <ColorStyle colors={{ mainColor: mainColor }} />
      {isLoading && <Spinner darkBackground={false} displayOnFirstLoad={true} />}
      <MainContainer background={background} blur={blur} bright={bright} className='main-container'>
        <Wrapper>
          <Logo />
          <LoginIcon />
          <Timer />
          <UserConfig />
        </Wrapper>
      </MainContainer>
    </>
  )
}

const MainContainer = styled.div<MainContainerProps>`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 30px 0;

  overflow-x: hidden;

  &::before {
    content: '';
    background: url(${({ background }) => background}) center center no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(${({ blur }) => blur}px);
    opacity: ${({ bright }) => bright};
    z-index: -1;
  }

  &::after {
    content: '';
    background: black;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
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
