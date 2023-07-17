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

export const Form = () => {
  const { formState } = useContext(FormContext) as FormContextType

  const [shouldSendform, setShouldSend] = useState<boolean>(false)
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)
  const [shouldShowConfirmedPassword, setShouldShowConfirmedPassword] = useState<boolean>(false)

  const inputsArray: HTMLInputElement[] = useMemo(() => [], [])

  const formWrapper = useRef<null | HTMLFormElement>(null)

  const IconHandleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement
    const nextElement = thisElement.nextElementSibling as HTMLElement
    nextElement.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLInputElement
    const type = thisElement.type as FormInputType

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
      <Username IconHandleClick={IconHandleClick} handleKeyDown={handleKeyDown} />
      <EmailInput IconHandleClick={IconHandleClick} handleKeyDown={handleKeyDown} />
      <PasswordInput
        IconHandleClick={IconHandleClick}
        handleKeyDown={handleKeyDown}
        shouldShowPassword={shouldShowPassword}
        setShouldShowPassword={setShouldShowPassword}
      />
      <ConfirmedPasswordInput
        IconHandleClick={IconHandleClick}
        handleKeyDown={handleKeyDown}
        shouldShowConfirmedPassword={shouldShowConfirmedPassword}
        setShouldShowConfirmedPassword={setShouldShowConfirmedPassword}
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
