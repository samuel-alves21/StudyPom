import styled from 'styled-components'
import { useContext, useEffect, useRef } from 'react'
import { UserConfig } from '../components/UserConfig'
import { breakpoints } from '../utilities/breakpoints'
import { Logo } from '../components/Logo'
import { Timer } from '../components/Timer'
import { useSetWindow } from '../hooks/useSetWindow'
import { useInit } from '../hooks/useInit'
import { CustomizationContext, CustomizationContextType } from '../contexts/CustomizationContext'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../components/Spinner'
import { ColorStyle } from '../components/ColorStyle'

export interface MainContainerProps {
  background: string
  blur: string
  bright: string
}

const user = true

const App = () => {
  const {
    customizationState: { background, blur, bright, mainColor, secundaryColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const navigate = useNavigate()

  const myTimer = useRef<number>()

  useEffect(() => {
    if (!user) {
      myTimer.current = setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
    return () => clearTimeout(myTimer.current)
  }, [navigate])

  useSetWindow()
  useInit()

  return (
    <>
      {!user ? (
        <Spinner mainColor={mainColor} />
      ) : (
        <>
          <ColorStyle colors={{ mainColor: mainColor, secundaryColor: secundaryColor }} />
          <MainContainer background={background} blur={blur} bright={bright}>
            <Wrapper>
              <Logo />
              <Timer />
              <UserConfig />
            </Wrapper>
          </MainContainer>
        </>
      )}
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
