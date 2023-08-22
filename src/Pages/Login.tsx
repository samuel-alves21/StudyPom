import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { LoginContent } from '../components/LoginContent'
import { breakpoints } from '../utilities/breakpoints'
import { LoginContext, LoginContextType } from '../contexts/LoginContext'
import { RegisterContent } from '../components/RegisterContext'
import { Spinner } from '../components/Spinner'

interface GlassBoxProps {
  isLogin: boolean
}

export const Register = () => {
  const { isLogin } = useContext(LoginContext) as LoginContextType

  useEffect(() => {
    window.document.title = 'StudyPom | Login'
  }, [])

  return (
    <Bg>
      <Spinner darkBackground={true}/>
      <Wrapper className='main-container'>
        <GlassBox isLogin={isLogin}>{isLogin ? <LoginContent /> : <RegisterContent />}</GlassBox>
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

const GlassBox = styled.div<GlassBoxProps>`
  display: flex;
  align-items: center;
  max-height: 900px;
  min-height: fit-content;
  min-width: ${({ isLogin }) => (isLogin ? 'fit-content' : '80%')};

  background: rgba(17, 17, 17, 0.65);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);

  border-radius: 50px;
  padding: 60px 30px;

  ${({ isLogin }) => {
    if (isLogin) {
      return `
        min-height: 80vh;
        max-height: 1000px;
        width: 500px;
      `
    }
  }}

  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    justify-content: space-evenly;
    max-height: 800px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 100%;
    border-radius: 15px;
    padding: 20px 10px;
  }

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    padding: 30px;
  }
`
