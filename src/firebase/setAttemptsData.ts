import { ref, set } from 'firebase/database'
import { getIp } from '../functions/getIp'
import { database } from './config'
import { currentDateInSeconds } from '../functions/currentDateInSeconds'

export const setAttemptsData = async (attempts: number, firstAttemptDate: number, type: 'login' | 'password' | 'verification') => {
  const ip = await getIp()
  console.log(attempts)
  await set(ref(database, `timeouts/${type}/ips/${ip}`), {
    attempts: attempts + 1,
    date: currentDateInSeconds(),
    firstAttemptDate: attempts === 0 ? currentDateInSeconds() : firstAttemptDate
  })
}
