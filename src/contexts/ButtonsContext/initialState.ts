export interface ButtonsState {
  pomodoro: boolean
  short: boolean
  long: boolean
  wasClicked: boolean
  [key: string]: boolean
}

export const initialState: ButtonsState = {
  pomodoro: true,
  short: false,
  long: false,
  wasClicked: false,
}
