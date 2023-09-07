import { useEffect, useState } from "react"
import styled from "styled-components"
import { auth } from "../firebase/config"
import { Spinner } from "../components/Spinner"
import { User, onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { MessagePopUp } from "../components/MessagePopUp"
import { useParams } from "react-router-dom"

export const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true)

  const { origin } = useParams()

  useEffect(() => {
    window.document.title = "StudyPom | Email Verification"

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsLoading(false)
      } else {
        window.location.replace('/StudyPom/register')
      }
    })

    return () => {
      auth.signOut()
      unsubscribe()
    }

  }, [])

  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await sendEmailVerification(auth.currentUser as User)
    const button = e.target as HTMLButtonElement

  }

  return (
    <Wrapper  className="flex-all-center">
      <MessagePopUp 
      text={ origin === 'register' ?
        "Your account has been created successfully. Please check your email for further instructions." :
        "Verify your email to continue."
      }
      success={origin === 'register' ? true : false}
      />
      { isLoading ? <Spinner darkBackground={false} displayOnFirstLoad={true}/> :
        <ContentWrapper className="styled-page-box flex-all-center">
          <h1>Email Verification</h1>
          <p>
            Please check your email and click on the link to verify your email to continue.
          </p>
          <p>
            If you don't receive an email, please check your spam folder.
          </p>
          <button className="form-button" onClick={(e) => sendEmail(e)}>re-send email</button>
        </ContentWrapper>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
  min-height: 100vh;
  padding: 15px;
  text-align: center;
`

const ContentWrapper = styled.div`
  gap: var(--gap-1);
  flex-direction: column;
  position: relative;

  & > h1 {
    color: var(--color-primary);
  }

  & button {
    max-width: 200px;
  }
`