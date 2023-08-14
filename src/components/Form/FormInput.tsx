import { useContext, useState } from 'react'
import { FormContext, FormContextType } from '../../contexts/FormContext'
import { formValidator, getPasswordField } from '../../functions/formValidation'
import { InputFieldWrapper } from './InputFieldWrapper'
import { Error } from './Error'
import { EyeIcon } from './EyeIcon'
import { ClearText } from './ClearText'
import { InputIcon } from './InputIcon'
import { FormInputType } from '.'
import { LoginContext, LoginContextType } from '../../contexts/LoginContext'

interface FormInputProps {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder: string
  id: FormInputType
  type: 'text' | 'password' | 'email'
}

export const FormInput = ({ handleKeyDown, id, placeholder, type }: FormInputProps) => {
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)

  const EyeIconProps = {
    shouldShowPassword: shouldShowPassword,
    setShouldShowPassword: setShouldShowPassword,
  }

  const { formState, formDispatch } = useContext(FormContext) as FormContextType
  const { isLogin } = useContext(LoginContext) as LoginContextType

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    const password = getPasswordField(id)
    formValidator(value, id, password as string, formDispatch, isLogin)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formState[id].shouldValidate) return
    const value = e.target.value
    const password = getPasswordField(id)
    formValidator(value, id, password as string, formDispatch, isLogin)
  }

  return (
    <InputFieldWrapper type={id}>
      <InputIcon id={id} />
      <input
        className='form-input'
        onChange={(e) => handleChange(e)}
        type={type === 'password' ? (shouldShowPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={(e) => handleBlur(e)}
        autoComplete='off'
        id={id}
      />
      {(id === 'password' || id === 'confirmedPassword') && <EyeIcon {...EyeIconProps} />}
      <ClearText />
      {formState[id].hasError && <Error errorField={id} errorType={formState[id].currentError} />}
    </InputFieldWrapper>
  )
}
