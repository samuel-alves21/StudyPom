import styled from 'styled-components'
import { breakpoints } from '../../utilities/breakpoints'

export const Text = () => {
  return (
    <Wrapper>
      <h1>Boost Your Productivity!</h1>
      <p>
        Maximize your <strong>productivity</strong> with our <strong>Pomodoro</strong> app. Focus{' '}
        <strong>better</strong>, work <strong>smarter</strong>, and achieve <strong>more</strong>.
        Sign in to start now!
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > p {
    line-height: 25px;
  }

  & strong,
  & > h1 {
    color: var(--color-primary);
  }

  @media (max-width: ${breakpoints.smallMobile}) {
    & p,
    & h1 {
      display: none;
    }
  }
`
