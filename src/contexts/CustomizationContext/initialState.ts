import { backgroundArray } from '../../utilities/backgroundArray'
import { soundsArray } from '../../utilities/soundsArray'

export interface State {
  background: string
  blur: string
  bright: string
  sound: SoundObject
}

export interface SoundObject {
  name: string
  start: string
  end: string
}

export const initialState = {
  background: backgroundArray[0].path,
  blur: '1',
  bright: '1',
  sound: {
    name: soundsArray[0].name,
    start: soundsArray[0].sounds.start,
    end: soundsArray[0].sounds.end,
  },
}
