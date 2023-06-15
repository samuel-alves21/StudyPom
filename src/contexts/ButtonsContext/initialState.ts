export interface State {
  pomodoro: boolean
  short: boolean
  long: boolean
  wasClicked: boolean
  [key: string]: boolean
}

export const initialState: State = {
  pomodoro: true,
  short: false,
  long: false,
  wasClicked: false,
}