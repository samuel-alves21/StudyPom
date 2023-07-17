import { PasswordFormProps } from '../../../types/types'
import { InputFieldWrapper } from './InputFieldWrapper'

export const PasswordInput = ({
  IconHandleClick,
  handleKeyDown,
  setShouldShowPassword,
  shouldShowPassword,
}: PasswordFormProps) => {
  const handleClick = () => {
    setShouldShowPassword(!shouldShowPassword)
  }

  return (
    <InputFieldWrapper type='password'>
      <i className='bi bi-key-fill' onClick={(e) => IconHandleClick(e)}></i>
      <input
        placeholder='confirm password'
        onKeyDown={(e) => handleKeyDown(e)}
        autoComplete='off'
        type={shouldShowPassword ? 'text' : 'password'}
      />
      {shouldShowPassword ? (
        <i className='bi bi-eye-fill' onClick={handleClick}></i>
      ) : (
        <i className='bi bi-eye-slash-fill' onClick={handleClick}></i>
      )}
    </InputFieldWrapper>
  )
}
