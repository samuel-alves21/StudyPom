import { createContext, useReducer } from 'react'
import { initialState } from './initialState'
import { reducer } from './reducer'
import { FormContextType, ReactChildrenProps } from '../../types/types'

export const FormContext = createContext<null | FormContextType>(null)

export const FormProvider = ({ children }: ReactChildrenProps) => {
  const [formState, formDispatch] = useReducer(reducer, initialState)

  return <FormContext.Provider value={{ formState, formDispatch }}>{children}</FormContext.Provider>
}
