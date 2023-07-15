import styled from 'styled-components'
import { ToDoImage } from './ToDoImage'
import { Form } from './Form'

export const LoginContent = () => {
  return (
    <Wrapper>
      <ToDoImage />
      <Form />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
`
