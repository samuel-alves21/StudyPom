import { FormInputProps } from '../../../types/types'
import { InputFieldWrapper } from './InputFieldWrapper'

export const Username = ({ IconHandleClick, handleKeyDown }: FormInputProps) => {
  return (
    <InputFieldWrapper type='username'>
      <i className='bi bi-person-circle' onClick={(e) => IconHandleClick(e)}></i>
      <input type='text' placeholder='username' onKeyDown={(e) => handleKeyDown(e)} autoComplete='off' />
    </InputFieldWrapper>
  )
}
