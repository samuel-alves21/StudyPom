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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
