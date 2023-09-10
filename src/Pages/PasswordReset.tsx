import styled from "styled-components"
import { breakpoints } from "../utilities/breakpoints"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/config"

export const PasswordReset = () => {

  const handleClick = () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    input.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      input.blur()
    }
  }

  const clearText = () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    input.value = ''
    input.focus()
  }

  const handleSubmit = () => {
    const input = document.getElementById('password-recover-input') as HTMLInputElement
    console.log(input.value)
    if (!input.value) return
    console.log('email sent')
    sendPasswordResetEmail(auth, input.value) 
  }

  return (
    <Wrapper className="flex-all-center">
      <ContentWrapper className='styled-page-box flex-all-center'>
        <h1>Password Reset</h1>
          <span onClick={handleClick}>Enter with your email:</span>
          <InputWrapper>
            <input type="text" id='password-recover-input' onKeyDown={(e) => handleKeyDown(e)}/>
            <i className='bi bi-x' onClick={clearText}></i>
          </InputWrapper>
        <button className="form-button" onClick={handleSubmit}>submit</button>
        <p>
          If you didn't receive an email, please check your spam folder.
        </p>
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
  min-height: 100vh;
  padding: 15px;
  text-align: center;
  padding: 10px;
`

const ContentWrapper = styled.div`
  gap: var(--gap-1);
  flex-direction: column;
  position: relative;

  & button {
    width: 250px;
  }

  & input {
    background-color: transparent;
    flex-grow: 1;
    width: 90%;
  }

  & h1 {
    color: var(--color-primary);
  }

  & span {
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 60px 10px
  }
`

const InputWrapper = styled.div`
  display: flex;
  background-color: #fff;
  width: 250px;
  margin-top: -10px;
  padding: 2px;

  & .bi-x {
    font-size: 25px;
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`