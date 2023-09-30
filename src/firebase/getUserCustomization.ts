import { get, ref } from "firebase/database"
import { database } from "./config"
import { CustomizationAction } from "../contexts/CustomizationContext/reducer"

export const getUserCustomization = async (uid: string, customizationDispatch: React.Dispatch<CustomizationAction>) => {
  const snapshot = await get(ref(database, `users/${uid}/customization`))
  if (snapshot.exists()) {
    customizationDispatch({ type: "CHANGE_SOUND", payload: snapshot.val().sound } )
  }
}