import { useContext, useEffect } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../contexts/SaveConfigContext'

type UseDisplayProps = (
  gear: HTMLElement,
  setShouldDisplay: (shouldDisplay: boolean) => void,
  shouldDisplay: boolean,
  optionsWindowRef: HTMLDivElement | null
) => void

export const useDisplay: UseDisplayProps = (gear, setShouldDisplay, shouldDisplay, optionsWindowRef) => {
  const { isSaved } = useContext(SaveConfigContext) as SaveConfigContextType
  
  useEffect(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (shouldDisplay && !isSaved) {
          alert('Please save your config before exiting')
          return
        }
        setShouldDisplay(!shouldDisplay)
      }
    })

    window.addEventListener('click', (event: MouseEvent) => {
      if (optionsWindowRef?.contains(event.target as Node) || event.target === gear) return
      if (shouldDisplay === false) return
      if (shouldDisplay && !isSaved) {
        alert('Please save your config before exiting')
        return
      }
    })

    return () => {
      window.removeEventListener('click', (event: MouseEvent) => {
        if (optionsWindowRef?.contains(event.target as Node) || event.target === gear) return
        if (shouldDisplay === false) return
        if (shouldDisplay && !isSaved) {
          alert('Please save your config before exiting')
          return
        }
      })

      window.removeEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          if (shouldDisplay && !isSaved) {
            alert('Please save your config before exiting')
            return
          }
          setShouldDisplay(!shouldDisplay)
        }
      })
    }
  }, [setShouldDisplay, gear, shouldDisplay, optionsWindowRef, isSaved])
}
