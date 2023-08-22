import { get, ref } from 'firebase/database'
import { auth, database } from './config'

export const getUsername = async () => {
  const snapshot = await get(ref(database, 'users/' + auth.currentUser?.uid + '/username'))
  return snapshot.val()
}
