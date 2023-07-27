import styled from 'styled-components'
import { useContext } from 'react'
import { FormContext, FormContextType } from '../../../contexts/FormContext'
import { FormInputType } from '.'
import { breakpoints } from '../../../utilities/breakpoints'

interface FormInputWrapperProps {
  children: React.ReactNode
  type: FormInputType
}

export const InputFieldWrapper = ({ children, type }: FormInputWrapperProps) => {
  const { formState } = useContext(FormContext) as FormContextType

  return <Wrapper id='input-field-wrapper' error={formState[type].hasError}>{children}</Wrapper>
}

const Wrapper = styled.div<{ error: boolean }>`
  width: 70%;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: 0.5px solid ${({ error }) => (error ? 'var(--color-error)' : '#fff')};
  margin-bottom: ${({ error }) => (error ? '15px' : '0')};
  position: relative;

  & > .bi {
    font-size: 25px;
    cursor: pointer;
    color: ${({ error }) => (error ? 'var(--color-error)' : '#fff')};
  }

  & > .bi-eye-fill,
  & > .bi-eye-slash-fill {
    margin-right: 5px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 80%;
    padding: 5px;
  }
`
