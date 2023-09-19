import { UserCredential, updateProfile } from 'firebase/auth'
import { get, ref, set } from 'firebase/database'
import { database } from './config'

export const setUserLoggedWithGoogle = async (result: UserCredential | null) => {
  if (result) {
    console.log(result)
    const snapshot = await get(ref(database, `users/${result.user.uid}`))
    if (snapshot.exists()) {
      const username = (await get(ref(database, `users/${result.user.uid}/username`))).val()
      await updateProfile(result.user, {
        displayName: username,
      })
      await set(ref(database, 'users/' + result.user.uid), {
        username: username,
        email: result.user.email,
        id: result.user.uid,
      })
      await set(ref(database, 'username/' + result.user.uid), {
        username: username,
      })
    } else {
      await set(ref(database, 'users/' + result.user.uid), {
        username: result.user.displayName,
        email: result.user.email,
        id: result.user.uid,
      })
      await set(ref(database, 'username/' + result.user.uid), {
        username: result.user.displayName,
      })
    }
  }
}
