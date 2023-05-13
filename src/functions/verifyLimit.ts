import { Id } from '../types/types'
import { limitValues } from '../utilities/limitValues'

export const verifyLimit = (value: number, id: Id) => {
  if (value > limitValues.max[id]) {
    return limitValues.max[id]
  }
  if (value < limitValues.min[id]) {
    return limitValues.min[id]
  }

  return value
}
