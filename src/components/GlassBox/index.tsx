import { useContext } from 'react'
import { breakpoints } from '../../utilities/breakpoints'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'
import styled from 'styled-components'

interface StyledGlassBoxProps {
  isLogin: boolean
}

interface GlassBoxProps {
  children: React.ReactNode
}

export const GlassBox = ({ children }: GlassBoxProps) => {
  const { isLogin } = useContext(LoginContext) as LoginContextType

  return <Wrapper isLogin={isLogin}>{children}</Wrapper>
}

const Wrapper = styled.div<StyledGlassBoxProps>`
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
