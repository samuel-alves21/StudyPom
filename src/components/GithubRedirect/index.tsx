import styled from 'styled-components'
import { breakpoints } from '../../utilities/breakpoints'

export const GithubRedirect = () => {
  return (
    <Wrapper>
      <i className='bi bi-github'></i>
      <p>
        developed by{' '}
        <a href='https://github.com/samuel-alves21' target='_blank' style={{ cursor: 'pointer' }}>
          Samuel Alves
        </a>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${breakpoints.laptop}) {
    position: initial;
    bottom: 0;
  }

  .bi-github {
    font-size: 2rem;
  }
`
