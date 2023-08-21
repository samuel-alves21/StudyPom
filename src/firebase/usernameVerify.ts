import { get, ref } from 'firebase/database'
import { database } from './config'

export const usernameVerify = async (data: { [key: string]: string }) => {
  const usernamePromise = new Promise<boolean>((resolve) => {
    const usernames = [] as string[]

    get(ref(database, 'username/')).then((snapshot) => {
      if (snapshot.exists()) {
        const usernamesData = snapshot.val() as { [key: string]: { username: string } }
        for (const value of Object.values(usernamesData)) {
          usernames.push(value.username)
        }
        const usernameExists = usernames.includes(data.username)
        resolve(usernameExists)
      } else {
        const usernameExists = false
        resolve(usernameExists)
      }
    })
  })
  return usernamePromise
}
