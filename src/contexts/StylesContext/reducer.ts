import { State } from './initialState';
import { StylesActionTypes } from './types';

export type StylesReducer = (
  state: State,
  action: { type: StylesActionTypes; payload: string }
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
