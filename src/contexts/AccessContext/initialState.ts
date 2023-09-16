export interface AccessStateType {
  attempts: number
  date: number
  firstAttemptDate: number
}

export const initialState: AccessStateType = {
  attempts: 0,
  date: 0,
  firstAttemptDate: 0
}
