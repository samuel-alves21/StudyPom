import styled from 'styled-components'
import { FormProvider } from '../../contexts/FormContext'
import { Form } from '../Form'

export const LoginContent = () => {
  return (
    <Wrapper>
      <FormProvider>
        <Form />
      </FormProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
`
