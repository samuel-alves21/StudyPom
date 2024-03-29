import { soundsArray } from '../../utilities/soundsArray'

export const initialState = {
  background: '',
  blur: '1',
  bright: '1',
  sound: {
    name: soundsArray[0].name,
    start: soundsArray[0].sounds.start,
    end: soundsArray[0].sounds.end,
  },
  volume: '1',
  mainColor: '#ae83ff',
  needSave: false,
}

export type CustomizationState = typeof initialState
