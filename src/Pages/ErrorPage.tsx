import styled from 'styled-components'
import img404 from '../img/404.png'
import { breakpoints } from '../utilities/breakpoints'

export const ErrorPage = () => {
  return (
    <Wrapper className='flex-all-center'>
      <TitleWrapper className='flex-all-center'>
        <Title>Error</Title>
        <img src={img404} alt='404-image' />
      </TitleWrapper>
      <p>It seen's like this page doesn't exist...</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
  height: 100vh;
  flex-direction: column;

  & img {
    width: 250px;

    @media (max-width: ${breakpoints.mobile}) {
      width: 150px;
    }
  }
`
const TitleWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 20px;
  }
`

const Title = styled.h1`
  font-size: 125px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 75px;
  }
`
