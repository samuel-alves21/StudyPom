import { useEffect } from 'react'
import styled from 'styled-components'
import { Logo } from '../components/Logo'
import { LoginContent } from '../components/LoginContent'

export const Login = () => {
  useEffect(() => {
    window.document.title = 'StudyPom | Login'
  }, [])

  return (
    <>
      <Wrapper>
        <GlassBox>
          <Logo />
          <LoginContent />
        </GlassBox>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(214, 78, 219);
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
`

const GlassBox = styled.div`
  display: flex;
  align-items: center;

  height: 90vh;
  width: 80%;

  background: rgba(17, 17, 17, 0.65);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);

  border-radius: 50px;
  padding: 50px;
`
