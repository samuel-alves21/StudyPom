import styled from 'styled-components'
import { breakpoints } from '../../utilities/breakpoints'

export const Logo = () => {
  return <Wrapper>StudyPom</Wrapper>
}

const Wrapper = styled.h1`
  font-family: 'Indie Flower', cursive;
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 5rem;

  @media (max-width: ${breakpoints.tablet}) {
    top: 0;
    left: 0;
    font-size: 4rem;
    position: relative;
    margin-top: -40px;
    text-align: center;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 0%;
  }
`
