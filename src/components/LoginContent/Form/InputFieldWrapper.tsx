import styled from 'styled-components'
import { FormContextType, FormInputWrapper, ReactChildrenProps } from '../../../types/types'
import { useContext } from 'react'
import { FormContext } from '../../../contexts/FormContext'

export const InputFieldWrapper = ({ children, type }: ReactChildrenProps & FormInputWrapper) => {
  const { formState } = useContext(FormContext) as FormContextType

  return <Wrapper error={formState[type].hasError}>{children}</Wrapper>
}

const Wrapper = styled.div<{ error: boolean }>`
  width: 70%;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border: 0.5px solid ${({ error }) => (error ? 'var(--color-error)' : '#fff')};
  position: relative;

  & > .bi {
    font-size: 25px;
    cursor: pointer;
    color: ${({ error }) => (error ? 'var(--color-error)' : '#fff')};
  }

  & input {
    width: 100%;
    background-color: transparent;
    margin: 0 10px;
    color: #fff;
    font-size: 16px;
  }
`
