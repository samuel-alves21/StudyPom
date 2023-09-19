import { get, ref } from 'firebase/database'
import { database } from './config'
import { User } from 'firebase/auth'
import { TimerReducerAction } from '../contexts/TimerContext/reducer'

type getUserConfigFn = (firebaseUser: User, timeDispatch: React.Dispatch<TimerReducerAction>) => Promise<void>

export const getUserConfig: getUserConfigFn = async (firebaseUser, timeDispatch) => {
  const snapshot = await get(ref(database, `users/${firebaseUser.uid}/config`))
  if (snapshot.exists()) {
    console.log(snapshot.val())
    timeDispatch({ type: 'CONFIG_POMODORO_TIME', payload: snapshot.val().pomodoroTime })
    timeDispatch({ type: 'CONFIG_SHORT_TIME', payload: snapshot.val().shortBreakTime })
    timeDispatch({ type: 'CONFIG_LONG_TIME', payload: snapshot.val().longBreakTime })
    timeDispatch({ type: 'CONFIG_CYCLES', payload: snapshot.val().cycles })
  }
}
