import { UserCredential, updateProfile } from 'firebase/auth'
import { get, ref, set } from 'firebase/database'
import { database } from './config'

export const setUserLoggedWithGoogle = async (result: UserCredential | null) => {
  if (result) {
    const snapshot = await get(ref(database, `users/${result.user.uid}`))
    if (snapshot.exists()) {
      await set(ref(database, 'users/' + result.user.uid), {
        username: snapshot.val().username,
        email: result.user.email,
        id: result.user.uid,
      })
    } else {
      await set(ref(database, 'users/' + result.user.uid), {
        username: result.user.displayName,
        email: result.user.email,
        id: result.user.uid,
      })
    }
  }
}
