import { FormContext } from '../../../contexts/FormContext'
import { formValidation } from '../../../functions/formValidation'
import { FormContextType, PasswordInputProps } from '../../../types/types'
import { Error } from './Error'
import { InputFieldWrapper } from './InputFieldWrapper'
import { useContext, useState } from 'react'

export const PasswordInput = ({
  IconHandleClick,
  handleKeyDown,
  id,
  setPasswordValue,
  clearText,
}: PasswordInputProps) => {
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const handleClick = () => {
    setShouldShowPassword(!shouldShowPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    setPasswordValue(thisElement.value)
    const isEmpty = formValidation.EmptyVerify(thisElement.value, formDispatch, id)
    if (isEmpty) return
    const isShort = formValidation.PasswordVerify(thisElement.value, formDispatch)
    if (isShort) return
  }

  return (
    <InputFieldWrapper type='password'>
      <i className='bi bi-key-fill' onClick={(e) => IconHandleClick(e)}></i>
      <input
        placeholder='password'
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleChange(e)}
        autoComplete='off'
        type={shouldShowPassword ? 'text' : 'password'}
        id={id}
      />
      <i className='bi bi-x' onClick={(e) => clearText(e)}></i>
      {shouldShowPassword ? (
        <i className='bi bi-eye-fill' onClick={handleClick}></i>
      ) : (
        <i className='bi bi-eye-slash-fill' onClick={handleClick}></i>
      )}
      {formState[id].hasError && <Error errorField={id} errorType={formState[id].currentError} />}
    </InputFieldWrapper>
  )
}
