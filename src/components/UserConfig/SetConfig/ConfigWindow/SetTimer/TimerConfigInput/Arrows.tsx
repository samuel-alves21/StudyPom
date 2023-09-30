import styled from 'styled-components'
import { acrementTime } from '../../../../../../functions/acrementTime'
import { decrementTime } from '../../../../../../functions/decrementTime'
import { Id } from '../../../../../Timer/Counter/CounterOptionsBtn'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { useContext } from 'react'

interface ArrowsProps {
  state: number
  setState: (value: number) => void
  id: Id
}

interface StyledArrows {
  isDisabled: boolean
}

export const Arrows = ({ id, setState, state }: ArrowsProps) => {
  const {
    timeState: { isDefault },
    timeDispatch
  } = useContext(TimerContext) as TimerContextType

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isDefault) return

    const thisElement = e.target as HTMLElement

    if (thisElement.id === 'acrement') {
      setState(acrementTime(state, id))
    } else {
      setState(decrementTime(state, id))
    }
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: true })
  }

  return (
    <ArrowIcon className='flex-all-center' isDisabled={isDefault}>
      <i id='acrement' onClick={(e) => handleClick(e)} className='bi bi-caret-up-fill'></i>
      <i id='decrement' onClick={(e) => handleClick(e)} className='bi bi-caret-down-fill'></i>
    </ArrowIcon>
  )
}

const ArrowIcon = styled.div<StyledArrows>`
  flex-direction: column;
  background-color: var(--color-primary);
  padding: 0 8px;
  font-size: 12px;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
    }

    & .bi-caret-up-fill:hover,
    & .bi-caret-down-fill:hover {
      transform: scale(1.3) !important;
    }
  }
`
