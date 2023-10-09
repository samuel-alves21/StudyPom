import { TimerReducerAction } from "../contexts/TimerContext/reducer";
import { get, ref } from "firebase/database";
import { database } from "../firebase/config";

export const getUserProgress = async (id: string, timeDispatch: React.Dispatch<TimerReducerAction>) => {
  const snapshot = await get(ref(database, `users/${id}/progress`))
  if (snapshot.exists()) {
    timeDispatch({ type: "SET_CYCLES_FINISHED", payload: snapshot.val().cyclesFinished})
    timeDispatch({ type: "SET_WORKED_TIME", payload: snapshot.val().workedTime})
    timeDispatch({ type: "RESET_STAGED_WORKED_TIME", payload: snapshot.val().stagedWorkedTime})
  }
}