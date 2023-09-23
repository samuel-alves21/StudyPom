import styled from 'styled-components'
import { useContext, useState, useEffect } from 'react'
import { Arrows } from './Arrows'
import { formatConfigInput } from '../../../../../../functions/formatConfigInput'
import { limitValues } from '../../../../../../utilities/limitValues'
import { acrementTime } from '../../../../../../functions/acrementTime'
import { decrementTime } from '../../../../../../functions/decrementTime'
import { useTimerStaged } from '../../../../../../hooks/useTimerStaged'
import { Id } from '../../../../../Timer/Counter/CounterOptionsBtn'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { standardValues } from '../../../../../../utilities/standardValues'

interface TimerConfigInputProps {
  id: Id
  state: string
  setState: (value: string) => void
  isChanged: boolean
  setIsChanged: (value: boolean) => void
}

export const TimerConfigInput = ({ state, setState, id, isChanged, setIsChanged }: TimerConfigInputProps) => {
  const [isOnFocus, setIsOnFocus] = useState(false)

  useTimerStaged(state, id, isChanged)

  const {
    timeState: { isDefault },
  } = useContext(TimerContext) as TimerContextType

  useEffect(() => {
    if (isDefault) {
      setState(standardValues[id].toString())
    }
  }, [id, isDefault, setState])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log('blur')
    const thisElement = e.target as HTMLElement
    setIsOnFocus(false)
    if (!Number(state))
      if (Number(state) < limitValues.min[id] && id === 'cycles') {
        setState(limitValues.min[id].toString())
        return
      }
    if (Number(state) > limitValues.max[id] && id === 'cycles') {
      setState(limitValues.max[id].toString())
      return
    }
    if (id === 'cycles') {
      setState(Number(state).toString())
      return
    }
    if (Number(state) * 60 < limitValues.min[id]) {
      setState(limitValues.min[id].toString())
      return
    }
    if (Number(state) * 60 > limitValues.max[id]) {
      setState(limitValues.max[id].toString())
      return
    }
    setState((Number(state) * 60).toString())
    setIsChanged(true)
    thisElement.blur()
  }

  const handleWhell = (e: React.WheelEvent<HTMLInputElement>) => {
    console.log('scroll')
    if (isDefault) return
    if (isOnFocus) return
    if (e.deltaY < 0) {
      setState(acrementTime(Number(state), id).toString())
    } else {
      setState(decrementTime(Number(state), id).toString())
    }
    setIsChanged(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('keyDown')
    const thisElement = e.target as HTMLElement
    if (e.key === 'Backspace') setState('')
    if (e.key === 'Enter') {
      thisElement.blur()
    }
    if (e.key === 'ArrowUp') {
      setState(acrementTime(Number(state), id).toString())
    }
    if (e.key === 'ArrowDown') {
      setState(decrementTime(Number(state), id).toString())
    }
    if (state.length === 2) return
    if (state.length === 1 && id === 'cycles') return
    if (!/^[0-9]+$/.test(e.key)) return
    setState(state + e.key)
    setIsChanged(true)
  }

  const handleFocus = () => {
    console.log('focus')
    setIsOnFocus(true)
    setState('')
    setIsChanged(true)
  }

  const handleChange = () => {
    return
  }

  return (
    <InputAndArrows>
      <InputField
        onChange={() => handleChange}
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => handleFocus()}
        onBlur={(e) => handleBlur(e)}
        type='text'
        value={isOnFocus ? state : formatConfigInput(Number(state), id)}
        id={id}
        readOnly={false}
        onWheel={(e) => handleWhell(e)}
        disabled={isDefault}
        autoComplete='off'
      />
      <Arrows state={state} setState={setState} id={id} />
    </InputAndArrows>
  )
}

const InputAndArrows = styled.div`
  display: flex;

  & > div {
    border-radius: 0 5px 5px 0;
  }
`

const InputField = styled.input`
  width: 70px;
  border-radius: 5px 0 0 5px;
  height: 35px;
`
