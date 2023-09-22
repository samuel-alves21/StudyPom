import { ref, set } from 'firebase/database'
import { database } from './config'

type SetUserConfigFn = (
  firebaseUser: string,
  pomodoroTime: number,
  shortRestTime: number,
  longRestTime: number,
  cycles: number
) => Promise<void>

export const setUserConfig: SetUserConfigFn = async (uid, pomodoroTime, shortRestTime, longRestTime, cycles) => {
  await set(ref(database, `users/${uid}/config`), {
    pomodoroTime: pomodoroTime,
    shortBreakTime: shortRestTime,
    longBreakTime: longRestTime,
    cycles: cycles,
  })
}
