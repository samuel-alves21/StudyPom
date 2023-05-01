import styled from 'styled-components'
import { acrementTime } from '../functions/acrementTime'
import { decrementTime } from '../functions/decrementTime'
import { Id } from './ConfigsOptions'

interface Props {
  pomodoroConfigTime: string
  setPomodoroConfigTime: React.Dispatch<React.SetStateAction<string>>
  id: Id
}

export const ConfigArrows = (props: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const thisElement = e.target as HTMLElement

    if (thisElement.id === 'acrement') {
      props.setPomodoroConfigTime(
        acrementTime(Number(props.pomodoroConfigTime), props.id).toString()
      )
    } else {
      props.setPomodoroConfigTime(
        decrementTime(Number(props.pomodoroConfigTime), props.id).toString()
      )
    }
  }

  return (
    <>
      <Arrows>
        <i
          id='acrement'
          onClick={(e) => handleClick(e)}
          className='bi bi-caret-up-fill'
        ></i>
        <i
          id='decrement'
          onClick={(e) => handleClick(e)}
          className='bi bi-caret-down-fill'
        ></i>
      </Arrows>
    </>
  )
}

const Arrows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  padding: 0 8px;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }

  & .bi-caret-up-fill:hover,
  & .bi-caret-down-fill:hover {
    transform: scale(1.3) !important;
  }
`
