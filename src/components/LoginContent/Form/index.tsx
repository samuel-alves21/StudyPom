import styled from "styled-components"

export const Form = () => {
  return (
    <FormWrapper action="">
      <h2>Create your account</h2>
        <input type="text" name="" id="" />
        <input type="text" name="" id="" />
        <input type="password" name="" id="" />
      <FormButton>Create account</FormButton>
      <p>Already have an account? <a href="#">Sign in</a></p>
    </FormWrapper>
  )
} 

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & input {
    width: 100%;
    padding: 10px;
    border: 1px solid white;
    background-color: transparent;
    border-radius: 5px;
    color: white;
  }
`

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
`