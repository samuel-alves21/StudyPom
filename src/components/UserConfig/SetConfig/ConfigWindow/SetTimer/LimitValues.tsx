import styled from 'styled-components'
import { limitValues } from '../../../../../utilities/limitValues'
import { Id } from '../../../../../types/types'
import { secondsToMinutes } from '../../../../../functions/secondsToMinutes'
import { secondsToTime } from '../../../../../functions/secondsToTime'

interface Props {
  id: Id
}

export const LimitValues = ({ id }: Props) => {
  return (
    <Wrapper>
      <p>
        Min: <strong>{secondsToMinutes(limitValues.min[id])}</strong>
      </p>
      <p>
        Max: <strong>{ id === 'pomodoro' ? secondsToTime(limitValues.max[id]) : secondsToMinutes(limitValues.max[id])}</strong>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & p {
    font-size: 1.3rem;
  }
`
