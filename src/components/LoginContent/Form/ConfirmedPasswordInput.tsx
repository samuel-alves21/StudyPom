import { PasswordConfirmedFormProps } from '../../../types/types'
import { InputFieldWrapper } from './InputFieldWrapper'

export const ConfirmedPasswordInput = ({
  IconHandleClick,
  handleKeyDown,
  setShouldShowConfirmedPassword,
  shouldShowConfirmedPassword,
}: PasswordConfirmedFormProps) => {
  const handleClick = () => {
    setShouldShowConfirmedPassword(!shouldShowConfirmedPassword)
  }

  return (
    <InputFieldWrapper type='confirmedPassword'>
      <i className='bi bi-key-fill' onClick={(e) => IconHandleClick(e)}></i>
      <input
        placeholder='confirm password'
        onKeyDown={(e) => handleKeyDown(e)}
        autoComplete='off'
        type={shouldShowConfirmedPassword ? 'text' : 'password'}
      />
      {shouldShowConfirmedPassword ? (
        <i className='bi bi-eye-fill' onClick={handleClick}></i>
      ) : (
        <i className='bi bi-eye-slash-fill' onClick={handleClick}></i>
      )}
    </InputFieldWrapper>
  )
}
