import { CustomizationContextState } from '../../types/types'
import { backgroundArray } from '../../utilities/backgroundArray'
import { soundsArray } from '../../utilities/soundsArray'

export const initialState: CustomizationContextState = {
  background: backgroundArray[0].path,
  blur: '1',
  bright: '1',
  sound: {
    name: soundsArray[0].name,
    start: soundsArray[0].sounds.start,
    end: soundsArray[0].sounds.end,
  },
  volume: '1',
  mainColor: '#ae83ff',
  secundaryColor: '#ae83ff61',
}
