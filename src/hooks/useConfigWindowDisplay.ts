import { useContext, useEffect } from 'react'
import { SaveConfigContext, SaveConfigContextType } from '../contexts/SaveConfigContext'
import { UserContext, UserContextType } from '../contexts/UserContext'

type useConfigWindowDisplayProps = (
  setShouldDisplay: (shouldDisplay: boolean) => void,
  shouldDisplay: boolean,
  optionsWindowRef: HTMLDivElement | null
) => void

export const useConfigWindowDisplay: useConfigWindowDisplayProps = (
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

    const handleClick = () => {
      if (!SaveConfigState.isSaved) {
        saveConfigDispatch({ type: 'SET_NOT_SAVED_ALERT' })
      } else {
        setShouldDisplay(!shouldDisplay)
      }
    }
    const filterWindow = document.querySelector('.filter') as HTMLDivElement

    filterWindow.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      filterWindow.removeEventListener('click', handleClick)
    }
  }, [
    setShouldDisplay,
    shouldDisplay,
    optionsWindowRef,
    SaveConfigState.isSaved,
    userState.pendentUser,
    saveConfigDispatch,
  ])
}
