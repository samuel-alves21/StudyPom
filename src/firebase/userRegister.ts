import { ref, set } from 'firebase/database'
import { database } from './config'
import { FormData } from '../functions/formSubmit'
import { User } from 'firebase/auth'

export const userRegister = (firebaseUser: User, formData: FormData) => {
  const createUser = new Promise<void>((resolve) => {
    set(ref(database, 'users/' + firebaseUser.uid), {
      username: formData.username,
      email: formData.email,
      id: firebaseUser.uid,
    }).then(() => resolve())
  })

  return createUser
}
