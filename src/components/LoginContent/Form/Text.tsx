import styled from 'styled-components'

export const Text = () => {
  return (
    <Wrapper>
      <h1>Boost Your Productivity!</h1>
      <p>
        Maximize your <strong>productivity</strong> with our <strong>Pomodoro</strong> app. Focus{' '}
        <strong>better</strong>, work <strong>smarter</strong>, and achieve <strong>more</strong>. Sign in to start now!
      </p>
      <h2>Create your account</h2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > p {
    margin-bottom: 10px;
    line-height: 25px;
  }

  & strong,
  & > h1 {
    color: #cc66fc;
  }
`
