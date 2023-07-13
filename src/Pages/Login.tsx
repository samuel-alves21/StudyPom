import { useEffect } from 'react'
import styled from 'styled-components'
import image from '../img/to-do.png'
import { Logo } from '../components/Logo'

export const Login = () => {
  useEffect(() => {
    window.document.title = 'StudyPom | Login'
  }, [])

  return (
    <Wrapper>
      <GlassBox>
        <Logo />
        <img src={image} alt='' />
      </GlassBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgb(222,111,226);
  background: radial-gradient(circle, rgba(222,111,226,1) 0%, rgba(176,50,233,1) 65%);

  display: flex;
  justify-content: center;
  align-items: center;
`

const GlassBox = styled.div`
  height: 85vh;
  width: 95%;

  background: rgba( 255, 255, 255, 0.3 );
  box-shadow: 0 0 32px 0 rgba( 31, 38, 135, 0.17 );
  backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 10px );
  border-radius: 10px;
  `
