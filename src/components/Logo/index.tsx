import styled from 'styled-components'
import logo from '../../img/logo.png'
import { breakpoints } from '../../utilities/breakpoints'

export const Logo = () => {
  return (
    <ImgContainer>
      <img src={logo} alt='' className='img-full-cover' />
    </ImgContainer>
  )
}

const ImgContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  width: 200px;
  
  @media screen and (max-width: ${breakpoints.laptop}) {
    position: initial;
  }

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 150px;
  }
`
