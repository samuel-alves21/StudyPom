import { useContext } from "react"
import styled from "styled-components"
import { SaveConfigContext, SaveConfigContextType } from "../../contexts/SaveConfigContext"

export const SaveAlert = () => {
  const { SaveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType

  const handleConfirmAlert = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    SaveConfigDispatch({ type: "SET_SHOULD_SHOW_SAVE_ALERT", payload: false })
    console.log(e.target)
  }

  return (
    <Wrapper> 
      <AlertBox>
        {/* <h3>Timer is running, saving now will reset the timer</h3> */}
        <h3>Please save or reset your config before exiting</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <button>save</button>
          <button>cancel</button> */}
          <button className="save-alert" onClick={(e) => handleConfirmAlert(e)}>ok</button>
        </div>
      </AlertBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
`

const AlertBox = styled.div`
  max-width: 500px;
  background-color: var(--color-primary);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-1);
  border-radius: 10px;

  animation: scale-pop-up 0.15s ease-in-out;
  
  @keyframes scale-pop-up {
    0% {
      transform: scale(0, 0);
    }

    80% {
      transform: scale(1.1, 1.1);
    }

    100% {
      transform: scale(1, 1);
    }
  }
`