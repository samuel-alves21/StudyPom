import styled from 'styled-components'
import { useMemo, useContext } from 'react'
import { useSounds } from '../../../../../../hooks/useSounds'
import { ProgressBar } from './ProgressBar'
import { SetAudioBtn } from './SetAudioBtn'
import { CustomizationContext, CustomizationContextType } from '../../../../../../contexts/CustomizationContext'

interface Props {
  sounds: {
    name: string
    sounds: {
      start: string
      end: string
    }
  }
}

export const AudioOption = ({
  sounds: {
    name,
    sounds: { start, end },
  },
}: Props) => {
  const startSound = useMemo(() => new Audio(start), [start])
  const endSound = useMemo(() => new Audio(end), [end])

  const {
    customizationState: { volume },
  } = useContext(CustomizationContext) as CustomizationContextType

  const { startSoundDuration, startSoundCurrentTime, endSoundDuration, endSoundCurrentTime } = useSounds(
    endSound,
    startSound
  )

  startSound.volume = Number(volume)
  endSound.volume = Number(volume)

  return (
    <Wrapper>
      <h3>{name}</h3>
      <InputWrapper>
        <div>
          <label htmlFor='start'>start</label>
          <i className='bi bi-play-fill' onClick={() => startSound.play()}></i>
        </div>
        <ProgressBar
          id='start'
          startSoundDuration={startSoundDuration}
          endSoundDuration={endSoundDuration}
          endSoundCurrentTime={endSoundCurrentTime}
          startSoundCurrentTime={startSoundCurrentTime}
        />
      </InputWrapper>
      <InputWrapper>
        <div>
          <label htmlFor='end'>end</label>
          <i className='bi bi-play-fill' onClick={() => endSound.play()}></i>
        </div>
        <ProgressBar
          id='end'
          startSoundDuration={startSoundDuration}
          endSoundDuration={endSoundDuration}
          endSoundCurrentTime={endSoundCurrentTime}
          startSoundCurrentTime={startSoundCurrentTime}
        />
      </InputWrapper>
      <SetAudioBtn sounds={{ start, end, name }} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 150px;
  padding: 10px;
  background-color: var(--color-primary-light);
  border-radius: 5px;

  & > h3 {
    margin-bottom: 15px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;

  & .bi-play-fill {
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  & .bi-play-fill:hover {
    color: var(--color-primary);
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85px;
  }

  & > input[type='range'] {
    width: 60%;
  }
`
