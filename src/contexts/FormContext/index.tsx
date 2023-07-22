import { createContext, useReducer } from 'react'
import { FormState, initialState } from './initialState'
import { FormReducerAction, reducer } from './reducer'

export interface FormContextType {
  formState: FormState
  formDispatch: React.Dispatch<FormReducerAction>
}

interface FormProviderProps {
  children: React.ReactNode
}

export const FormContext = createContext<null | FormContextType>(null)

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formState, formDispatch] = useReducer(reducer, initialState)

  return <FormContext.Provider value={{ formState, formDispatch }}>{children}</FormContext.Provider>
}
