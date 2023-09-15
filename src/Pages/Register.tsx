import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { breakpoints } from '../utilities/breakpoints'
import { Spinner } from '../components/Spinner'
import { GlassBox } from '../components/GlassBox'
import { RegisterContent } from '../components/RegisterContent'
import { LoginContext, LoginContextType } from '../contexts/LoginContext'

export const Register = () => {
  const { setIsLogin } = useContext(LoginContext) as LoginContextType

  useEffect(() => {
    setIsLogin(false)
  }, [setIsLogin])

  window.document.title = 'StudyPom | Register'

  return (
    <Bg>
      <Spinner darkBackground={true} displayOnFirstLoad={false} />
      <Wrapper className='main-container flex-all-center'>
        <GlassBox>
          <RegisterContent />
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
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`
