export type InitialState = typeof initialState

export const initialState = {
  StagedPomodoroTime: 0,
  StagedShortRestTime: 0,
  StagedLongRestTime: 0,
  StagedCycle: 0,
  shouldUpdateInputValue: true,
  isSaved: true,
  shouldShowSaveAlert: false,
}
