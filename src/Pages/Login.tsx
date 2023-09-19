import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { LoginContent } from '../components/LoginContent'
import { breakpoints } from '../utilities/breakpoints'
import { Spinner } from '../components/Spinner'
import { GlassBox } from '../components/GlassBox'
import { LoginContext, LoginContextType } from '../contexts/LoginContext'
import { useRedirectToAppOnLogged } from '../hooks/useRedirectToAppOnLogged'

export const Login = () => {
  const { setIsLogin } = useContext(LoginContext) as LoginContextType

  const [isLoading, setIsLoading] = useState(true)

  window.document.title = 'StudyPom | Login'

  useEffect(() => {
    setIsLogin(true)
  }, [setIsLogin])

  useRedirectToAppOnLogged()

  return (
    <Bg>
      <Spinner displayOnFirstLoad={false} darkBackground={true} />
      {isLoading && <Spinner displayOnFirstLoad={true} darkBackground={false} />}
      <Wrapper className='main-container flex-all-center'>
        <GlassBox>
          <LoginContent setIsLoading={setIsLoading} />
        </GlassBox>
      </Wrapper>
    </Bg>
  )
}

const Bg = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
`

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`
