import { get, ref } from 'firebase/database'
import { database } from './config'

export const usernameVerify = async (data: { [key: string]: string }) => {
  const usernames = [] as string[]
  const snapshot = await get(ref(database, 'username/'))
  if (snapshot.exists()) {
    const usernamesData = snapshot.val() as { [key: string]: { username: string } }
    for (const value of Object.values(usernamesData)) {
      usernames.push(value.username)
    }
    const usernameExists = usernames.includes(data.username)
    return usernameExists
  } else {
    const usernameExists = false
    return usernameExists
  }
}
