import { SoundObject, State } from './initialState'
import { CustomizationActionTypes } from './types'

export type CustomizationReducer = (
  state: State,
  action: { type: CustomizationActionTypes; payload: string | SoundObject }
) => State

export const reducer: CustomizationReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      if (typeof action.payload !== 'string') return state
      return {
        ...state,
        background: action.payload,
      }
    case 'CHANGE_BLUR':
      if (typeof action.payload !== 'string') return state
      return {
        ...state,
        blur: action.payload,
      }
    case 'CHANGE_BRIGHT':
      if (typeof action.payload !== 'string') return state
      return {
        ...state,
        bright: action.payload,
      }
    case 'CHANGE_SOUND':
      return {
        ...state,
        sound: action.payload as SoundObject,
      }
    case 'CHANGE_MAIN_COLOR':
      if (typeof action.payload !== 'string') return state
      return {
        ...state,
        mainColor: action.payload,
      }
      case 'CHANGE_SECUNDARY_COLOR':
        if (typeof action.payload !== 'string') return state
        return {
          ...state,
          secundaryColor: action.payload,
        }
    default:
      return state
  }
}
