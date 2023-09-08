import { ref, set } from 'firebase/database'
import { auth, database } from './config'

export const setRegisterData = async (clicks: number | undefined, reset = false) => {
  if (clicks === undefined) return
  if (reset) {
    set(ref(database, 'users/' + auth.currentUser?.uid + '/register'), {
      clicks: clicks,
      date: Math.round(Date.now() / 1000),
    })
  } else {
    set(ref(database, 'users/' + auth.currentUser?.uid + '/register'), {
      clicks: clicks + 1,
      date: Math.round(Date.now() / 1000),
    })
  }
}
