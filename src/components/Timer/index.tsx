import { WorkedTime } from './WorkedTime'
import { Counter } from './Counter'
import { CurrentTimerOption } from './CurrentTimerOption'

export const Timer = () => {
  return (
    <div className='timer' style={{ padding: '0 15px' }} >
      <CurrentTimerOption />
      <Counter />
      <WorkedTime />
    </div>
  )
}
