import { State } from './initialState';
import { ActionTypes } from './types';

export type StylesReducer = (
  state: State,
  action: { type: ActionTypes; payload: string }
) => State

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
