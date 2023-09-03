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
    window.document.title = 'StudyPom | Register'
    setIsLogin(false)
  }, [setIsLogin])

  return (
    <Bg>
      <Spinner darkBackground={true} displayOnFirstLoad={false} />
      <Wrapper className='main-container'>
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
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`
