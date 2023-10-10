import styled from 'styled-components'
import { LoginIcon } from '../LoginIcon'
import { Logo } from '../Logo'

export const MobileLogoAndLoginBtn = () => {
  return (
    <Wrapper>
      <Logo />
      <span>|</span>
      <LoginIcon />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-size: 20px;
    margin-right: 5px;
  }
`
