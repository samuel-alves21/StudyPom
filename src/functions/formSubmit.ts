import { FormReducerAction } from '../contexts/FormContext/reducer'
import { isEmptyOnSubmit } from './formValidation'

export const formSubmit = (
  hasError: boolean,
  inputsArray: HTMLInputElement[],
  formDispatch: (value: FormReducerAction) => void,
  isLogin: boolean
) => {
  if (!isLogin) {
    const isEmpty = isEmptyOnSubmit(inputsArray, formDispatch)
    if (!hasError && !isEmpty) {
      console.log('form sent')
      return
    }
    console.log('form not sent')
  }
}
