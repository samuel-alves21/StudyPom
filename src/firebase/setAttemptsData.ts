import { ref, set } from 'firebase/database'
import { getIp } from '../functions/getIp'
import { database } from './config'

export const setAttemptsData = async (attempts: number, type: 'login' | 'password' | 'verification') => {
  const ip = await getIp()

  await set(ref(database, `timeouts/${type}/ips/${ip}`), {
    attempts: attempts + 1,
    date: Math.round(Date.now() / 1000),
  })
}
