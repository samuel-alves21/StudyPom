import { useContext } from "react"
import { SaveConfigContext, SaveConfigContextType } from "../../../../contexts/SaveConfigContext"
import { setUserConfig } from "../../../../firebase/setUserConfig"
import { TimerContext, TimerContextType } from "../../../../contexts/TimerContext"
import { UserContext, UserContextType } from "../../../../contexts/UserContext"

export const SaveConfigBtn = () => {
  const { isSaved, setIsSaved } = useContext(SaveConfigContext) as SaveConfigContextType
  const { timeState: { cycles, pomodoroTime, shortRestTime, longRestTime } } = useContext(TimerContext) as TimerContextType
  const { userState } = useContext(UserContext) as UserContextType

  const handleClick = () => {
    setIsSaved(true)
    setUserConfig(userState.id, pomodoroTime, shortRestTime, longRestTime, cycles)
  }

  return (
    <button disabled={isSaved} onClick={handleClick} className={isSaved ? "disabled" : "" }>
      Save
    </button>
  )
}
