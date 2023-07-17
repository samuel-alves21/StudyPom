import { useContext } from 'react'
import { FormContext } from '../../../contexts/FormContext'
import { FormContextType, FormErrorProps } from '../../../types/types'
import styled from 'styled-components'

export const Error = ({ errorField, errorType }: FormErrorProps) => {
  const { formState } = useContext(FormContext) as FormContextType

  return <ErrorMsg>* {formState[errorField].errorTypes[errorType]}</ErrorMsg>
}

const ErrorMsg = styled.p`
  font-size: 15px;
  width: fit-content;
  padding: 0;
  position: absolute;
  left: -110px;
  text-align: left;
  color: var(--color-error);
`
