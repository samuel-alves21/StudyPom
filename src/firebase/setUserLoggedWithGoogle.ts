import { UserCredential } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { database } from './config'

export const setUserLoggedWithGoogle = async (result: UserCredential | null) => {
  if (result) {
    await set(ref(database, 'users/' + result.user.uid), {
      username: result.user.displayName,
      email: result.user.email,
      id: result.user.uid,
    })
  }
}
