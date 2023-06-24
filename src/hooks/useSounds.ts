import { useEffect } from 'react'

type UseSounds = (
  endSound: HTMLAudioElement,
  endSoundDuration: number,
  startSound: HTMLAudioElement,
  startSoundDuration: number,
  setStartSoundDuration: React.Dispatch<React.SetStateAction<number>>,
  setStartSoundCurrentTime: React.Dispatch<React.SetStateAction<number>>,
  setEndSoundDuration: React.Dispatch<React.SetStateAction<number>>,
  setEndSoundCurrentTime: React.Dispatch<React.SetStateAction<number>>
) => void

export const useSounds: UseSounds = (
  endSound,
  endSoundDuration,
  startSound,
  startSoundDuration,
  setStartSoundDuration,
  setStartSoundCurrentTime,
  setEndSoundDuration,
  setEndSoundCurrentTime
) => {
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
}
