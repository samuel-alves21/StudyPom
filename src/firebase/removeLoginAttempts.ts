import { ref, remove } from "firebase/database"
import { database } from "./config"
import { getIp } from "../functions/getIp"

export const removeLoginAttempts = async () => {
  const ip = await getIp()
  await remove(ref(database, `ips/${ip}`))
}