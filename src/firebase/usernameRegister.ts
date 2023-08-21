import { push, ref, set } from 'firebase/database'
import { database } from './config'

export const usernameRegister = (username: string) => {
  const createUsername = new Promise<void>((resolve) => {
    set(push(ref(database, 'username/')), {
      username
    }).then(() => resolve())
  })

  return createUsername
}
