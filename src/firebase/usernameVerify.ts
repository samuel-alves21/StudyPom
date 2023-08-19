import { get, ref } from "firebase/database"
import { database } from "./config"
import { FormReducerAction } from "../contexts/FormContext/reducer"

export const usernameVerify = (data: { [key: string]: string } , spinner: HTMLDivElement, formDispatch: (value: FormReducerAction) => void) => {
  const usernamePromise = new Promise<boolean>((resolve) => {
    const usernames = [] as string[]

    get(ref(database, 'username/')).then((snapshot) => {
      const usernamesData = snapshot.val() as { [key: string]: { username: string } }
      for (const value of Object.values(usernamesData)) {
        usernames.push(value.username)
      }
      const usernameExists = usernames.includes(data.username)
      if (usernameExists) {
        formDispatch({ type: 'SET_USERNAME_ERROR', payload: { setHasError: true, setCurrentError: 'exists' } })
        spinner.style.display = 'none'
      }
    })
    .then(() => resolve(false)).catch((error) => console.log(error))
  })

  return usernamePromise
}