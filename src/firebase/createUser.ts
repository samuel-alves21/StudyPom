import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, database } from './config'
import { ref, set } from 'firebase/database'

export const createUser = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(userCredential.user, {
    displayName: username,
  })

  await set(ref(database, 'users/' + userCredential.user.uid), {
    username: username,
    email: email,
    id: userCredential.user.uid,
  })
}
