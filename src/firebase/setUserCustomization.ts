import { ref, set } from 'firebase/database'
import { database } from './config'
import { SoundObject } from '../contexts/CustomizationContext'

export const setUserCustomization = async (uid: string, sound: SoundObject, color: string, volume: string) => {
  set(ref(database, `users/${uid}/customization`), {
    sound,
    color,
    volume
  })
}
