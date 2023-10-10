import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from './config'

export const getDefaultBackground = async () => {
  const url = await getDownloadURL(ref(storage, 'background/default/default-bg.jpg'))
  return url
}
