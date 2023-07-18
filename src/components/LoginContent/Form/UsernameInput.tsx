import { FormContext } from '../../../contexts/FormContext'
import { formValidation } from '../../../functions/formValidation'
import { FormContextType, FormInputProps } from '../../../types/types'
import { Error } from './Error'
import { InputFieldWrapper } from './InputFieldWrapper'
import { useContext } from 'react'

export const Username = ({ IconHandleClick, handleKeyDown, id }: FormInputProps) => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const isEmpty = formValidation.EmptyVerify(thisElement.value, formDispatch, id)
    if (isEmpty) return
  }

  return (
    <InputFieldWrapper type='username'>
      <i className='bi bi-person-circle' onClick={(e) => IconHandleClick(e)}></i>
      <input
        type='text'
        placeholder='username'
        onKeyDown={(e) => handleKeyDown(e)}
        autoComplete='off'
        onChange={(e) => handleChange(e)}
        id={id}
      />
      {formState[id].hasError && <Error errorField={id} errorType={formState[id].currentError} />}
    </InputFieldWrapper>
  )
}
