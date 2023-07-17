import styled from 'styled-components'
import { limitValues } from '../../../../../utilities/limitValues'
import { LimitValuesProps } from '../../../../../types/types'
import { secondsToMinutes } from '../../../../../functions/secondsToMinutes'
import { secondsToTime } from '../../../../../functions/secondsToTime'

export const LimitValues = ({ id }: LimitValuesProps) => {
  return (
    <Wrapper>
      <p>
        Min: <strong>{secondsToMinutes(limitValues.min[id])}</strong>
      </p>
      <p>
        Max:{' '}
        <strong>
          {id === 'pomodoro' ? secondsToTime(limitValues.max[id]) : secondsToMinutes(limitValues.max[id])}
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
