import { backgroundArray } from '../../utilities/backgroundArray'

export type StylesReducer = (
  state: typeof initialState,
  action: { type: 'CHANGE_BACKGROUND'; payload: string }
) => typeof initialState

export const initialState = {
  background: backgroundArray[0],
}

export const reducer: StylesReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      return {
        ...state,
        background: action.payload,
      }
    default:
      return state
  }
}
