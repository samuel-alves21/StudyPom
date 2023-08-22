import { push, ref, set } from 'firebase/database'
import { database } from './config'

export const usernameRegister = async (username: string) => {
  set(push(ref(database, 'username/')), {
    username,
  })
}
