import { ref, set } from "firebase/database"
import { database } from "./config"
import { User } from "firebase/auth"

type SetUserConfigFn = (firebaseUser: User, pomodoroTime: number, shortRestTime: number, longRestTime: number, cycles: number) => Promise<void>

export const setUserConfig: SetUserConfigFn = async (firebaseUser, pomodoroTime, shortRestTime, longRestTime, cycles) => {
  await set(ref(database, `users/${firebaseUser.uid}/config`), {
    pomodoroTime: pomodoroTime,
    shortBreakTime: shortRestTime,
    longBreakTime: longRestTime,
    cycles: cycles,
  })
}