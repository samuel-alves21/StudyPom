import styled from 'styled-components'
import { ToDoImage } from './ToDoImage'
import { Form } from './Form'
import { FormProvider } from '../../contexts/FormContext'

export const LoginContent = () => {
  return (
    <Wrapper>
      <ToDoImage />
      <FormProvider>
        <Form />
      </FormProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
  height: 100%;
  gap: 50px;
`
