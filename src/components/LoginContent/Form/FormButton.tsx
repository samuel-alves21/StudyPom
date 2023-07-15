import styled from "styled-components"

interface Props {
  shouldSendForm: boolean
}

export const FormButton = ({ shouldSendForm }: Props) => {
  const ButtonHandleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!shouldSendForm) {
      e.preventDefault()
    }
  }

  return(
    <Button onClick={(e) => ButtonHandleClick(e)}>Create account</Button>
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

  &:hover {
    background-color: rgb(175, 50, 233);
    color: #fff;
  }
`