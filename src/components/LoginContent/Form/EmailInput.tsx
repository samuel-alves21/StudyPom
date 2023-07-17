import { FormContextType, FormInputProps } from '../../../types/types'
import { InputFieldWrapper } from './InputFieldWrapper'
import { formValidation } from '../../../functions/formValidation'
import { useContext } from 'react'
import { FormContext } from '../../../contexts/FormContext'
import { Error } from './Error'

export const EmailInput = ({ handleKeyDown, IconHandleClick }: FormInputProps) => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error = formValidation.email(e.target.value)
    if (error) {
      formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: true, setCurrentError: 'invalid' } })
    } else {
      formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: false, setCurrentError: 'none' } })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement, Element>) => {
    if (formState.email.hasError) {
      return
    }
    const thisElement = e.target as HTMLInputElement
    if (thisElement.value === '') {
      formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: true, setCurrentError: 'empty' } })
    } else {
      formDispatch({ type: 'SET_EMAIL_ERROR', payload: { setHasError: false, setCurrentError: 'none' } })
    }
  }

  return (
    <>
      <InputFieldWrapper type='email'>
        <i className='bi bi-envelope-fill' onClick={(e) => IconHandleClick(e)}></i>
        <input
          onBlur={(e) => handleBlur(e)}
          onChange={(e) => handleChange(e)}
          type='email'
          placeholder='email'
          onKeyDown={(e) => handleKeyDown(e)}
          autoComplete='off'
        />
        {formState.email.hasError && <Error errorField='email' errorType={formState.email.currentError} />}
      </InputFieldWrapper>
    </>
  )
}
