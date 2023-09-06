import { useEffect, useState } from "react"
import styled from "styled-components"
import { auth } from "../firebase/config"
import { Spinner } from "../components/Spinner"

export const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.document.title = "StudyPom | Email Verification"

    if (!auth.currentUser) {
      window.location.replace('/StudyPom/register')
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <Wrapper  className="flex-all-center">
      { isLoading ? <Spinner darkBackground={false} displayOnFirstLoad={true}/> : 
        <ContentWrapper className="styled-page-box flex-all-center">
          <h1>Email Verification</h1>
          <p>
            Please check your email and click on the link to verify your email.
          </p>
          <p>
            If you don't receive an email, please check your spam folder.
          </p>
        </ContentWrapper>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: radial-gradient(circle, rgba(214, 78, 219, 1) 21%, rgba(176, 50, 233, 1) 97%);
  min-height: 100vh;;
`

const ContentWrapper = styled.div`
  gap: var(--gap-1);
  flex-direction: column;

  & > h1 {
    color: var(--color-primary);
  }
`