export interface AccessStateType {
  attempts: number
  date: number
}

export const initialState: AccessStateType = {
  attempts: 0,
  date: 0,
}
