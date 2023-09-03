import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { UserConfig } from '../components/UserConfig'
import { breakpoints } from '../utilities/breakpoints'
import { Logo } from '../components/Logo'
import { Timer } from '../components/Timer'
import { useSetWindow } from '../hooks/useSetWindow'
import { useInit } from '../hooks/useInit'
import { CustomizationContext, CustomizationContextType } from '../contexts/CustomizationContext'
import { useNavigate } from 'react-router-dom'
import { ColorStyle } from '../components/ColorStyle'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { LoginIcon } from '../components/LoginIcon'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { Spinner } from '../components/Spinner'

export interface MainContainerProps {
  background: string
  blur: string
  bright: string
}

const App = () => {
  const {
    customizationState: { background, blur, bright, mainColor, secundaryColor },
  } = useContext(CustomizationContext) as CustomizationContextType

  const [isLoading, setIsLoading] = useState(true)

  const { pendentUser, setPendentUser } = useContext(UserContext) as UserContextType

  const navigate = useNavigate()

  useEffect(() => {
    console.log(pendentUser)
    console.log(auth.currentUser)
    if (pendentUser) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsLoading(false)
      } else {
        window.location.href = '/StudyPom/register'
      }
    })

    return () => {
      clearTimeout(
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      )
      unsubscribe()
    }
  }, [navigate, pendentUser, setPendentUser])

  useSetWindow()
  useInit()

  return (
    <>
      <ColorStyle colors={{ mainColor: mainColor, secundaryColor: secundaryColor }} />
      {isLoading ? (
        <Spinner darkBackground={false} displayOnFirstLoad={true} />
      ) : (
        <MainContainer background={background} blur={blur} bright={bright} className='main-container'>
          <Wrapper>
            <Logo />
            <LoginIcon />
            <Timer />
            <UserConfig />
          </Wrapper>
        </MainContainer>
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
