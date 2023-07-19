import { useRef, useState, useEffect, useMemo, useContext } from 'react'
import styled from 'styled-components'
import { FormButton } from './FormButton'
import { Text } from './Text'
import { EmailInput } from './EmailInput'
import { Username } from './UsernameInput'
import { PasswordInput } from './PasswordInput'
import { ConfirmedPasswordInput } from './ConfirmedPasswordInput'
import { FormContext } from '../../../contexts/FormContext'
import { FormContextType, FormInputType } from '../../../types/types'
import { formValidation } from '../../../functions/formValidation'

export const Form = () => {
  const { formState, formDispatch } = useContext(FormContext) as FormContextType

  const [shouldSendform, setShouldSend] = useState<boolean>(false)
  const [passwordValue, setPasswordValue] = useState<string>('')

  const inputsArray: HTMLInputElement[] = useMemo(() => [], [])

  const formWrapper = useRef<null | HTMLFormElement>(null)

  const IconHandleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement
    const nextElement = thisElement.nextElementSibling as HTMLElement
    nextElement.focus()
  }

  const clearText = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement
    const previousElement = thisElement.previousElementSibling as HTMLInputElement
    previousElement.value = ''
    formValidation.EmptyVerify(previousElement.value, formDispatch, previousElement.id as FormInputType)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const type = thisElement.id as FormInputType
    const keys = ['Shift', 'Control', 'Alt', 'AltGraph', 'Escape']

    if (e.key === 'Escape') {
      e.preventDefault()
      thisElement.blur()
    }
    if (keys.includes(e.key)) {
      e.preventDefault()
      return
    }
    const isEmpty = formValidation.EmptyVerify(thisElement.value, formDispatch, type)
    if (isEmpty) return

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

  return (
    <FormWrapper ref={formWrapper} action='' onSubmit={(e) => handleSubmit(e)}>
      <Text />
      <Username IconHandleClick={IconHandleClick} handleKeyDown={handleKeyDown} id='username' clearText={clearText} />
      <EmailInput IconHandleClick={IconHandleClick} handleKeyDown={handleKeyDown} id='email' clearText={clearText} />
      <PasswordInput
        IconHandleClick={IconHandleClick}
        handleKeyDown={handleKeyDown}
        id='password'
        setPasswordValue={setPasswordValue}
        clearText={clearText}
      />
      <ConfirmedPasswordInput
        IconHandleClick={IconHandleClick}
        handleKeyDown={handleKeyDown}
        id='confirmedPassword'
        passwordValue={passwordValue}
        clearText={clearText}
      />
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
