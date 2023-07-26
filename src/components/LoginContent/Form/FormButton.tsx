import styled from 'styled-components'

export const FormButton = () => {
  return (
    <Button type='submit'>
      Create account
    </Button>
  )
}

const Button = styled.button`
  width: 70%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #3b3b3b;
  cursor: pointer;

  &:hover {
    background-color: #af32e9;
    color: #fff;
  }
`
