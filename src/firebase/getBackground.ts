import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from './config'

export const getBackground = async (id: string) => {
  try {
    const url = await getDownloadURL(ref(storage, `background/users/${id}/selected.png`))
    return url
    //eslint-disable-next-line
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      const url = await getDownloadURL(ref(storage, `background/default-bg.jpg`))
      return url
    } else {
      console.error(error)
    }
  }
}
