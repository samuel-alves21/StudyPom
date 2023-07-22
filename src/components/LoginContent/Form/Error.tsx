import styled from 'styled-components'
import { useContext } from 'react'
import { FormContext, FormContextType } from '../../../contexts/FormContext'
import { FormsError } from '../../../contexts/FormContext/reducer'
import { FormInputType } from '.'

interface FormErrorProps {
  errorField: FormInputType
  errorType: FormsError
}

export const Error = ({ errorField, errorType }: FormErrorProps) => {
  const { formState } = useContext(FormContext) as FormContextType
  const obj = formState[errorField]

  return <ErrorMsg>* {formState[errorField].errorTypes[errorType as keyof typeof obj.errorTypes]}</ErrorMsg>
}

const ErrorMsg = styled.p`
  font-size: 15px;
  width: fit-content;
  padding: 0;
  position: absolute;
  bottom: -23px;
  left: 0px;
  text-align: left;
  color: var(--color-error);
`
