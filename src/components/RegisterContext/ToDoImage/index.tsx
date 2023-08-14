import styled from 'styled-components'
import image from '../../../img/to-do.png'
import { breakpoints } from '../../../utilities/breakpoints'

export const ToDoImage = () => {
  return (
    <Wrapper>
      <img src={image} alt='' className='img-full-cover' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(415px + 3vw);
  height: calc(415px + 3vw);
  max-width: 480px;
  max-height: 480px;

  background-color: rgba(175, 50, 233, 0.425);
  border-radius: 50%;

  @media (max-width: ${breakpoints.midScreen}) {
    width: calc(360px + 3vw);
    height: calc(360px + 3vw);
  }

  @media (max-width: ${breakpoints.laptop}) {
    display: none;
  }

  @media (max-height: 650px) and (min-width: ${breakpoints.laptop}) {
    display: none;
  }

  & img {
    margin-left: -25px;
    margin-top: 25px;
    width: 105%;
  }
`
