import styled from 'styled-components'
import { FormProvider } from '../../contexts/FormContext'
import { Form } from '../Form'

interface LoginContentProps {
  setIsLoading: (isLoading: boolean) => void
}

export const LoginContent = ({ setIsLoading }: LoginContentProps) => {
  return (
    <Wrapper>
      <FormProvider>
        <Form setIsLoading={setIsLoading}/>
      </FormProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  height: 90%;
`
