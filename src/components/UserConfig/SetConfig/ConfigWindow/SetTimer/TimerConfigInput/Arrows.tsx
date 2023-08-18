import styled from 'styled-components'
import { acrementTime } from '../../../../../../functions/acrementTime'
import { decrementTime } from '../../../../../../functions/decrementTime'
import { Id } from '../../../../../Timer/Counter/CounterOptionsBtn'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { useContext } from 'react'

interface ArrowsProps {
  state: string
  setState: (value: string) => void
  id: Id
}

export const Arrows = ({ id, setState, state }: ArrowsProps) => {
  const { timeState: { isDefault } } = useContext(TimerContext) as TimerContextType


  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isDefault) return

    const thisElement = e.target as HTMLElement

    if (thisElement.id === 'acrement') {
      setState(acrementTime(Number(state), id).toString())
    } else {
      setState(decrementTime(Number(state), id).toString())
    }
  }

  return (
    <ArrowIcon>
      <i id='acrement' onClick={(e) => handleClick(e)} className='bi bi-caret-up-fill'></i>
      <i id='decrement' onClick={(e) => handleClick(e)} className='bi bi-caret-down-fill'></i>
    </ArrowIcon>
  )
}

const ArrowIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  padding: 0 8px;
  font-size: 12px;

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
