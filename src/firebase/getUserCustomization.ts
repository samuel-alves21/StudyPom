import { get, ref } from 'firebase/database'
import { database } from './config'
import { CustomizationAction } from '../contexts/CustomizationContext/reducer'
import { getBackground } from './getBackground'

export const getUserCustomization = async (uid: string, customizationDispatch: React.Dispatch<CustomizationAction>) => {
  const snapshot = await get(ref(database, `users/${uid}/customization`))
  if (snapshot.exists()) {
    customizationDispatch({ type: 'CHANGE_SOUND', payload: snapshot.val().sound })
    customizationDispatch({ type: 'CHANGE_MAIN_COLOR', payload: snapshot.val().color })
    customizationDispatch({ type: 'CHANGE_VOLUME', payload: snapshot.val().volume })
    customizationDispatch({ type: 'CHANGE_BLUR', payload: snapshot.val().blur })
    customizationDispatch({ type: 'CHANGE_BRIGHT', payload: snapshot.val().bright })
  }

  const url = await getBackground(uid)
  if (url) {
    customizationDispatch({ type: 'CHANGE_BACKGROUND', payload: url })
  }
}
