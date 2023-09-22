import styled from 'styled-components'
import { limitValues } from '../../../../../utilities/limitValues'
import { secondsToMinutes } from '../../../../../functions/secondsToMinutes'
import { secondsToTime } from '../../../../../functions/secondsToTime'
import { Id } from '../../../../Timer/Counter/CounterOptionsBtn'

interface LimitValuesProps {
  id: Id
}

export const LimitValues = ({ id }: LimitValuesProps) => {
  return (
    <Wrapper>
      <p>
        Min: <strong>{ id === 'cycles' ? limitValues.min[id] : secondsToMinutes(limitValues.min[id])}</strong>
      </p>
      <p>
        Max:{' '}
        <strong>
          {id === 'pomodoro' ? secondsToTime(limitValues.max[id]) : id === 'cycles' ? limitValues.max[id] : secondsToMinutes(limitValues.max[id])}
        </strong>
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
