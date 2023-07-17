import { useEffect } from 'react'
import { UseDisplayProps } from '../types/types'

export const useDisplay: UseDisplayProps = (gear, setShouldDisplay, shouldDisplay, optionsWindowRef) => {
  useEffect(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShouldDisplay(false)
    })

    window.addEventListener('click', (event: MouseEvent) => {
      if (optionsWindowRef?.contains(event.target as Node) || event.target === gear) return
      if (shouldDisplay === false) return
      setShouldDisplay(false)
    })

    return () => {
      window.removeEventListener('click', (event: MouseEvent) => {
        if (optionsWindowRef?.contains(event.target as Node) || event.target === gear) return
        if (shouldDisplay === false) return
        setShouldDisplay(false)
      })

      window.removeEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') setShouldDisplay(false)
      })
    }
  }, [setShouldDisplay, gear, shouldDisplay, optionsWindowRef])
}
