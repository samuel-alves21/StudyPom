import styled from 'styled-components'
import { Arrows } from './Arrows'
import { formatConfigInput } from '../../../../../../functions/formatConfigInput'
import { limitValues } from '../../../../../../utilities/limitValues'
import { acrementTime } from '../../../../../../functions/acrementTime'
import { decrementTime } from '../../../../../../functions/decrementTime'
import { Id } from '../../../../../../types/types'
import { useTimerConfig } from '../../../../../../hooks/useTimerConfig'
import { useState } from 'react'

interface Props {
  id: Id
  state: string
  setState: (value: string) => void
}

export const Input = ({ state, setState, id }: Props) => {
  const [isOnFocus, setIsOnFocus] = useState(false)

  useTimerConfig(state, id)

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const thisElement = e.target as HTMLElement
    setIsOnFocus(false)
    if (Number(state) < limitValues.min[id]) {
      setState(limitValues.min[id].toString())
      return
    }
    if (Number(state) > limitValues.max[id]) {
      setState(limitValues.max[id].toString())
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
    thisElement.blur()
  }

  const handleWhell = (e: React.WheelEvent<HTMLInputElement>) => {
    if (e.deltaY < 0) {
      setState(acrementTime(Number(state), id).toString())
    } else {
      setState(decrementTime(Number(state), id).toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  }

  const handleFocus = () => {
    setIsOnFocus(true)
    setState('')
  }

  return (
    <InputAndArrows>
      <InputField
        onKeyDown={(e) => handleKeyDown(e)}
        onFocus={() => handleFocus()}
        onBlur={(e) => handleBlur(e)}
        type='text'
        value={isOnFocus ? state : formatConfigInput(Number(state), id)}
        id={id}
        readOnly={false}
        onWheel={(e) => handleWhell(e)}
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
