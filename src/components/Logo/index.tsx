import styled from "styled-components"
import { breakpoints } from "../../breakpoints"

export const Logo = () => {
  return (
    <Wrapper>StudyPom</Wrapper>
  )
}

const Wrapper = styled.h1`
  font-family: 'Indie Flower', cursive;
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 5rem;

  @media (max-width: ${breakpoints.mobile}) {
    top: 0%;
    left: calc(50% - 90px);
    font-size: 4rem;
  }
`