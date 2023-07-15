import styled from 'styled-components'
import image from '../../../img/to-do.png'

export const ToDoImage = () => {
  return (
    <Wrapper>
      <img src={image} alt='' className='img-full-cover' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 480px;
  height: 480px;
  background-color: rgba(175, 50, 233, 0.425);
  border-radius: 350px;

  & img {
    margin-left: -25px;
    margin-top: 25px;
    width: 105%;
  }
`
