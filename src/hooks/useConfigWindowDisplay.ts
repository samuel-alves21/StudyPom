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
  const { SaveConfigState, saveConfigDispatch } = useContext(SaveConfigContext) as SaveConfigContextType
  const { userState } = useContext(UserContext) as UserContextType

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (shouldDisplay && !SaveConfigState.isSaved) {
          saveConfigDispatch({ type: 'SET_NOT_SAVED_ALERT' })
          return
        }
        setShouldDisplay(!shouldDisplay)
      }
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('save-alert')) return
      if (optionsWindowRef?.contains(event.target as Node) || event.target === gear) return
      if (shouldDisplay === false) return
      if (!SaveConfigState.isSaved) {
        saveConfigDispatch({ type: 'SET_NOT_SAVED_ALERT' })
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
  }, [
    setShouldDisplay,
    gear,
    shouldDisplay,
    optionsWindowRef,
    SaveConfigState.isSaved,
    userState.pendentUser,
    saveConfigDispatch,
  ])
}
