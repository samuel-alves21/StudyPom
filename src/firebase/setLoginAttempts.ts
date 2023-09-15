import { ref, set } from 'firebase/database'
import { getIp } from '../functions/getIp'
import { database } from './config'
import { AccessStateType } from '../contexts/AccessContext/initialState'

export const setLoginAttempts = async (access: AccessStateType) => {
  const ip = await getIp()

  await set(ref(database, `timeouts/login/ips/${ip}`), {
    attempts: access.attempts + 1,
    date: Math.round(Date.now() / 1000),
  })
}
