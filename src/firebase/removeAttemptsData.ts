import { ref, remove } from 'firebase/database'
import { getIp } from '../functions/getIp'
import { database } from './config'

export const removeAttemptsData = async (type: 'login' | 'password' | 'verification') => {
  const ip = await getIp()
  await remove(ref(database, `timeouts/${type}/ips/${ip}`))
}
