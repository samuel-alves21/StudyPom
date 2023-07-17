import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { ProgressBarProps, SpanBarSoundProps } from '../../../../../../types/types'

export const ProgressBar = ({
  id,
  startSoundCurrentTime,
  startSoundDuration,
  endSoundCurrentTime,
  endSoundDuration,
}: ProgressBarProps) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (id === 'start') {
      setCurrentTime(startSoundCurrentTime)
      setDuration(startSoundDuration)
    } else {
      setCurrentTime(endSoundCurrentTime)
      setDuration(endSoundDuration)
    }
  }, [endSoundCurrentTime, endSoundDuration, id, startSoundCurrentTime, startSoundDuration])

  return <Span currentTime={currentTime} duration={duration}></Span>
}

const Span = styled.span<SpanBarSoundProps>`
  width: 60%;
  border-radius: 5px;
  height: 7px;
  background-color: white;
  position: relative;

  &::after {
    transition: transform all 0.3s;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    transform-origin: left;
    transform: scaleX(${({ currentTime, duration }) => currentTime / duration});
    border-radius: 5px;
    background-color: var(--color-primary);
  }
`
