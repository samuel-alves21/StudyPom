import { useEffect } from 'react'
import styled from 'styled-components'
import { LoginContent } from '../components/LoginContent'
import { breakpoints } from '../utilities/breakpoints'

export const Login = () => {
  useEffect(() => {
    window.document.title = 'StudyPom | Login'
  }, [])

  return (
    <>
      <Bg>
        <Wrapper className='main-container'>
          <GlassBox>
            <LoginContent />
          </GlassBox>
        </Wrapper>
      </Bg>
    </>
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

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`

const GlassBox = styled.div`
  display: flex;
  align-items: center;
  max-height: 900px;
  height: 90vh;
  min-width: 80%;

  background: rgba(17, 17, 17, 0.65);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);

  border-radius: 50px;
  padding: 20px;

  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    justify-content: space-evenly;
    max-height: 800px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 15px;
    padding: 20px 10px;
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    height: 100%;
  }
`
