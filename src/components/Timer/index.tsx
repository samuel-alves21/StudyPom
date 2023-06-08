import { TimerDetails } from "./TimerDetails"
import { Counter } from "./Counter"
import { CurrentTimerOption } from "./CurrentTimerOption"

export const Timer = () => {
  return (
    <div>
      <CurrentTimerOption />
      <Counter />
      <TimerDetails />
    </div>  
  )
}