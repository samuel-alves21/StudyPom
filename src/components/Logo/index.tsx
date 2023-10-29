import styled from 'styled-components'
import logo from '../../img/logo.png'
import { breakpoints } from '../../utilities/breakpoints'

export const Logo = () => {
  return (
    <ImgContainer id='logo'>
      <img src={logo} alt='' className='img-full-cover' />
    </ImgContainer>
  )
}

const ImgContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  width: 200px;

  @media (max-width: ${breakpoints.laptop}) {
    width: 150px;
    position: initial;
  }
`
