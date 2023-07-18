import { FormContextType, FormInputProps } from '../../../types/types'
import { InputFieldWrapper } from './InputFieldWrapper'
import { formValidation } from '../../../functions/formValidation'
import { useContext } from 'react'
import { FormContext } from '../../../contexts/FormContext'
import { Error } from './Error'

export const EmailInput = ({ handleKeyDown, IconHandleClick, id }: FormInputProps) => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const isEmpty = formValidation.EmptyVerify(thisElement.value, formDispatch, id)
    if (isEmpty) return

    const isInvalid = formValidation.emailVerify(e.target.value, formDispatch)
    if (isInvalid) return
  }

  return (
    <>
      <InputFieldWrapper type='email'>
        <i className='bi bi-envelope-fill' onClick={(e) => IconHandleClick(e)}></i>
        <input
          onChange={(e) => handleChange(e)}
          type='email'
          placeholder='email'
          onKeyDown={(e) => handleKeyDown(e)}
          autoComplete='off'
          id={id}
        />
        {formState[id].hasError && <Error errorField={id} errorType={formState[id].currentError} />}
      </InputFieldWrapper>
    </>
  )
}
