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

  return (
    <Wrapper className='styled-page-box' isLogin={isLogin}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<StyledGlassBoxProps>`
  display: flex;
  align-items: center;
  max-height: 900px;
  min-height: fit-content;
  min-width: ${({ isLogin }) => (isLogin ? 'fit-content' : '80%')};

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
