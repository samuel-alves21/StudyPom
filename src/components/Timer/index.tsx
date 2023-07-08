import { WorkedTime } from './WorkedTime'
import { Counter } from './Counter'
import { CurrentTimerOption } from './CurrentTimerOption'

export const Timer = () => {
  return (
    <div className='timer'>
      <CurrentTimerOption />
      <Counter />
      <WorkedTime />
    </div>
  )
}
