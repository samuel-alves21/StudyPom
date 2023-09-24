import { useContext, useEffect } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../contexts/SaveConfigContext'
import { UserContext, UserContextType } from '../contexts/UserContext'

type useConfigWindowDisplayProps = (
  gear: HTMLElement,
  setShouldDisplay: (shouldDisplay: boolean) => void,
  shouldDisplay: boolean,
  optionsWindowRef: HTMLDivElement | null
) => void

export const useConfigWindowDisplay: useConfigWindowDisplayProps = (
  gear,
  setShouldDisplay,
  shouldDisplay,
  optionsWindowRef
) => {
  const { SaveConfigState } = useContext(SaveConfigContext) as SaveConfigContextType
  const { userState } = useContext(UserContext) as UserContextType

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (shouldDisplay && !SaveConfigState.isSaved && !userState.pendentUser) {
          alert('Please save or reset your config before exiting')
          return
        }
        setShouldDisplay(!shouldDisplay)
      }
    }

    const handleClick = (event: MouseEvent) => {
      if (optionsWindowRef?.contains(event.target as Node) || event.target === gear) return
      if (shouldDisplay === false) return
      if (!SaveConfigState.isSaved && !userState.pendentUser) {
        alert('Please save or reset your config before exiting')
        return
      } else {
        setShouldDisplay(!shouldDisplay)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [setShouldDisplay, gear, shouldDisplay, optionsWindowRef, SaveConfigState.isSaved, userState.pendentUser])
}
