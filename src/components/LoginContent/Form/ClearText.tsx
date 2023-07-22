import { useContext } from 'react'
import { formValidation } from '../../../functions/formValidation'
import { FormContext, FormContextType } from '../../../contexts/FormContext'
import { FormInputType } from '.'

export const ClearText = () => {
  const { formDispatch } = useContext(FormContext) as FormContextType

  const clearText = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement
    const input = thisElement.parentElement?.childNodes[1] as HTMLInputElement
    input.value = ''
    formValidation.EmptyVerify(input.value, formDispatch, input.id as FormInputType)
  }

  return <i className='bi bi-x' onClick={(e) => clearText(e)}></i>
}
