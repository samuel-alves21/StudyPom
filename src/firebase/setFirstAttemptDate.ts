import { ref, set } from "firebase/database"
import { database } from "./config"
import { currentDateInSeconds } from "../functions/currentDateInSeconds"

export const setFirstAttemptDate = async (type: 'login' | 'password' | 'verification', ip: string, values: any) => {
  set(ref(database, `timeouts/${type}/ips/${ip}`), {
    ...values,
    firstAttemptDate: currentDateInSeconds()
  })
}