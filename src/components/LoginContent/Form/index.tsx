import styled from 'styled-components'
import { useRef, useState, useEffect, useMemo, useContext } from 'react'
import { FormContext, FormContextType } from '../../../contexts/FormContext'
import { FormButton } from './FormButton'
import { FormInput } from './FormInput'
import { Text } from './Text'

export type FormInputType = 'email' | 'password' | 'confirmedPassword' | 'username'

export const Form = () => {
  const { formState } = useContext(FormContext) as FormContextType
  const [shouldSendform, setShouldSend] = useState<boolean>(false)

  const inputsArray: HTMLInputElement[] = useMemo(() => [], [])

  const formWrapper = useRef<null | HTMLFormElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const type = thisElement.id as FormInputType

    if (e.key === 'Escape') {
      thisElement.blur()
    }
    if (e.key === 'Tab') {
      e.preventDefault()
    }

    if (formState[type].hasError) return

    if (e.key === 'Enter') {
      inputsArray.forEach((input, index) => {
        if (input === e.target) {
          if (inputsArray[index + 1]) {
            inputsArray[index + 1].focus()
            setShouldSend(false)
          } else {
            setShouldSend(true)
          }
        }
      })
    }
  }

  useEffect(() => {
    const form = formWrapper.current as HTMLFormElement
    form.childNodes.forEach((child) => {
      child.childNodes.forEach((child2) => {
        const element = child2 as HTMLInputElement
        if (element.placeholder) {
          inputsArray.push(element as HTMLInputElement)
        }
      })
    })
  }, [inputsArray])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const props = {
    handleKeyDown: handleKeyDown,
  }

  return (
    <FormWrapper ref={formWrapper} action='' onSubmit={(e) => handleSubmit(e)}>
      <Text />
      <FormInput {...props} id='username' placeholder='username' type='text' />
      <FormInput {...props} id='email' placeholder='email' type='email' />
      <FormInput {...props} id='password' placeholder='password' type='password' />
      <FormInput {...props} id='confirmedPassword' placeholder='confirm password' type='password' />
      <FormButton shouldSendform={shouldSendform} />
      <p>
        Already have an account? <a href='#'>Sign in</a>
      </p>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 550px;
`
