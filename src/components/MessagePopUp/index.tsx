import styled from 'styled-components'

interface MessagePopUpProps {
  success: boolean
  text: string
}

interface StyledMessagePopUpProps {
  success: boolean
}

export const MessagePopUp = ({ success, text }: MessagePopUpProps) => {
  return (
    <Wrapper success={success} id='message-pop-up'>
      <p>{text}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div<StyledMessagePopUpProps>`
  ${({ success }) => {
    if (success) {
      return `
        background-color: #98ec98a9;
        border: 2px solid green;
        color: green;
      `
    } else {
      return `
        background-color: #ec9898a9;
        border: 2px solid red;
        color: red;
      `
    }
  }}

  position: absolute;
  padding: 10px;
  border-radius: 5px;
  user-select: none;
  display: none;

  animation: popup-in 10s ease-in-out forwards;

  @keyframes popup-in {
    0% {
      top: -50px;
      opacity: 0;
    }

    10% {
      top: 15px;
      opacity: 1;
    }

    100% {
      top: 15px;
      opacity: 0;
    }
  }
`
