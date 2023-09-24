import styled from 'styled-components'
import { useContext, useState, useEffect, useCallback } from 'react'
import { Arrows } from './Arrows'
import { formatConfigInput } from '../../../../../../functions/formatConfigInput'
import { limitValues } from '../../../../../../utilities/limitValues'
import { acrementTime } from '../../../../../../functions/acrementTime'
import { decrementTime } from '../../../../../../functions/decrementTime'
import { useTimerStaged } from '../../../../../../hooks/useTimerStaged'
import { Id } from '../../../../../Timer/Counter/CounterOptionsBtn'
import { TimerContext, TimerContextType } from '../../../../../../contexts/TimerContext'
import { standardValues } from '../../../../../../utilities/standardValues'
import { TimerActionTypes } from '../../../../../../contexts/TimerContext/types'

interface TimerConfigInputProps {
  id: Id
}

export const TimerConfigInput = ({ id }: TimerConfigInputProps) => {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const { timeDispatch, timeState } = useContext(TimerContext) as TimerContextType

  const setInputValue = useCallback(
    (payload: number) => {
      timeDispatch({ type: `SET_${id.toUpperCase()}_CONFIG_VALUE_INPUT` as TimerActionTypes, payload: payload })
    },
    [id, timeDispatch]
  )

  const inputValue = timeState[`${id}ConfigValueInput`]

  useTimerStaged(inputValue, id)

  const {
    timeState: { isDefault },
  } = useContext(TimerContext) as TimerContextType

  useEffect(() => {
    if (isDefault) {
      setInputValue(standardValues[id])
    }
  }, [id, isDefault, setInputValue])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const thisElement = e.target as HTMLElement
    setIsOnFocus(false)
    if (!inputValue)
      if (inputValue < limitValues.min[id] && id === 'cycles') {
        setInputValue(limitValues.min[id])
        return
      }
    if (inputValue > limitValues.max[id] && id === 'cycles') {
      setInputValue(limitValues.max[id])
      return
    }
    if (id === 'cycles') {
      setInputValue(inputValue)
      return
    }
    if (inputValue * 60 < limitValues.min[id]) {
      setInputValue(limitValues.min[id])
      return
    }
    if (inputValue * 60 > limitValues.max[id]) {
      setInputValue(limitValues.max[id])
      return
    }
    setInputValue(inputValue * 60)
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: true })
    thisElement.blur()
  }

  const handleWhell = (e: React.WheelEvent<HTMLInputElement>) => {
    if (isDefault) return
    if (isOnFocus) return
    if (e.deltaY < 0) {
      setInputValue(acrementTime(inputValue, id))
    } else {
      setInputValue(decrementTime(inputValue, id))
    }
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: true })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const thisElement = e.target as HTMLElement
    if (e.key === 'Backspace') setInputValue(0)
    if (e.key === 'Enter') {
      thisElement.blur()
    }
    if (e.key === 'ArrowUp') {
      setInputValue(acrementTime(inputValue, id))
    }
    if (e.key === 'ArrowDown') {
      setInputValue(decrementTime(inputValue, id))
    }
    if (inputValue.toString().length === 2) return
    if (inputValue.toString().length === 1 && id === 'cycles') return
    if (!/^[0-9]+$/.test(e.key)) return
    setInputValue(Number(inputValue.toString() + e.key))
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: true })
  }

  const handleFocus = () => {
    setIsOnFocus(true)
    setInputValue(0)
    timeDispatch({ type: 'SET_IS_INPUT_VALUE_CHANGED', payload: true })
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
        value={isOnFocus ? inputValue || '' : formatConfigInput(inputValue, id)}
        id={id}
        readOnly={false}
        onWheel={(e) => handleWhell(e)}
        disabled={isDefault}
        autoComplete='off'
      />
      <Arrows state={inputValue} setState={setInputValue} id={id} />
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
