import { ref, set } from 'firebase/database'
import { database } from './config'
import { FormData } from '../functions/formSubmit'
import { User } from 'firebase/auth'

export const userRegister = async (firebaseUser: User, formData: FormData) => {
  set(ref(database, 'users/' + firebaseUser.uid), {
    username: formData.username,
    email: formData.email,
    id: firebaseUser.uid,
  })
}
