import { useEffect, useState } from 'react'

export type UseSounds = (
  endSound: HTMLAudioElement,
  startSound: HTMLAudioElement
) => {
  startSoundDuration: number
  startSoundCurrentTime: number
  endSoundDuration: number
  endSoundCurrentTime: number
}

export const useSounds: UseSounds = (endSound, startSound) => {
  const [startSoundDuration, setStartSoundDuration] = useState<number>(startSound.duration)
  const [startSoundCurrentTime, setStartSoundCurrentTime] = useState<number>(0)
  const [endSoundDuration, setEndSoundDuration] = useState<number>(endSound.duration)
  const [endSoundCurrentTime, setEndSoundCurrentTime] = useState<number>(0)

  useEffect(() => {
    startSound.onloadedmetadata = () => {
      setStartSoundDuration(startSound.duration)
      setStartSoundCurrentTime(startSound.currentTime)
    }

    startSound.ontimeupdate = () => {
      setStartSoundCurrentTime(startSound.currentTime)
    }

    startSound.onended = () => {
      setStartSoundCurrentTime(startSoundDuration)
      setTimeout(() => {
        setStartSoundCurrentTime(0)
      }, 100)
    }

    endSound.onloadedmetadata = () => {
      setEndSoundDuration(endSound.duration)
      setEndSoundCurrentTime(endSound.currentTime)
    }

    endSound.ontimeupdate = () => {
      setEndSoundCurrentTime(endSound.currentTime)
    }

    endSound.onended = () => {
      setEndSoundCurrentTime(endSoundDuration)
      setTimeout(() => {
        setEndSoundCurrentTime(0)
      }, 100)
    }
  }, [
    endSound,
    endSoundDuration,
    startSound,
    startSoundDuration,
    setEndSoundCurrentTime,
    setStartSoundCurrentTime,
    setEndSoundDuration,
    setStartSoundDuration,
  ])

  return {
    startSoundDuration,
    startSoundCurrentTime,
    endSoundDuration,
    endSoundCurrentTime,
  }
}
