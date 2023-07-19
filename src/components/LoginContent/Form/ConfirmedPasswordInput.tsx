import { FormContext } from '../../../contexts/FormContext'
import { formValidation } from '../../../functions/formValidation'
import { ConfirmedPasswordInputProps, FormContextType } from '../../../types/types'
import { Error } from './Error'
import { InputFieldWrapper } from './InputFieldWrapper'
import { useState, useContext } from 'react'

export const ConfirmedPasswordInput = ({
  IconHandleClick,
  handleKeyDown,
  id,
  passwordValue,
  setConfirmedPasswordValue,
  clearText,
}: ConfirmedPasswordInputProps) => {
  const [shouldShowConfirmedPassword, setShouldShowConfirmedPassword] = useState<boolean>(false)
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const handleClick = () => {
    setShouldShowConfirmedPassword(!shouldShowConfirmedPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    setConfirmedPasswordValue(thisElement.value)
    const isEmpty = formValidation.EmptyVerify(thisElement.value, formDispatch, id)
    if (isEmpty) return
    const isInvalid = formValidation.confirmedPasswordVerify(thisElement.value, passwordValue, formDispatch)
    if (isInvalid) return
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
      <i className='bi bi-x' onClick={(e) => clearText(e)}></i>
      {shouldShowConfirmedPassword ? (
        <i className='bi bi-eye-fill' onClick={handleClick}></i>
      ) : (
        <i className='bi bi-eye-slash-fill' onClick={handleClick}></i>
      )}
      {formState[id].hasError && <Error errorField={id} errorType={formState[id].currentError} />}
    </InputFieldWrapper>
  )
}
