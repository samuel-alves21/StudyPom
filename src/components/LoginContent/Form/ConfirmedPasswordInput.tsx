import { FormContext } from '../../../contexts/FormContext'
import { formValidation } from '../../../functions/formValidation'
import { FormContextType, FormInputProps } from '../../../types/types'
import { Error } from './Error'
import { InputFieldWrapper } from './InputFieldWrapper'
import { useState, useContext } from 'react'

export const ConfirmedPasswordInput = ({ IconHandleClick, handleKeyDown, id }: FormInputProps) => {
  const [shouldShowConfirmedPassword, setShouldShowConfirmedPassword] = useState<boolean>(false)
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const handleClick = () => {
    setShouldShowConfirmedPassword(!shouldShowConfirmedPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const isEmpty = formValidation.EmptyVerify(thisElement.value, formDispatch, id)
    if (isEmpty) return
  }

  return (
    <InputFieldWrapper type='confirmedPassword'>
      <i className='bi bi-key-fill' onClick={(e) => IconHandleClick(e)}></i>
      <input
        placeholder='confirm password'
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleChange(e)}
        autoComplete='off'
        type={shouldShowConfirmedPassword ? 'text' : 'password'}
        id={id}
      />
      {shouldShowConfirmedPassword ? (
        <i className='bi bi-eye-fill' onClick={handleClick}></i>
      ) : (
        <i className='bi bi-eye-slash-fill' onClick={handleClick}></i>
      )}
      {formState[id].hasError && <Error errorField={id} errorType={formState[id].currentError} />}
    </InputFieldWrapper>
  )
}
