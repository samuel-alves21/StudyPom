import { SoundObject } from '.'
import { CustomizationState } from './initialState'
import { CustomizationActionTypes } from './types'

export type CustomizationReducer = (
  state: CustomizationState,
  action: { type: CustomizationActionTypes; payload: string | SoundObject | boolean }
) => CustomizationState

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
    case 'CHANGE_VOLUME':
      if (typeof action.payload !== 'string') return state
      return {
        ...state,
        volume: action.payload,
      }
    case 'CHANGE_MAIN_COLOR':
      if (typeof action.payload !== 'string') return state
      return {
        ...state,
        mainColor: action.payload,
      }
    default:
      return state
  }
}
