import { registerTimeouts } from '../utilities/registerTimeouts'

export const getRegisterWaitTime = (clicks: number) => {
  switch (clicks) {
    case 1:
      return registerTimeouts.oneClick
    case 2:
      return registerTimeouts.twoClicks
    case 3:
      return registerTimeouts.threeClicksOrMore
    case 0:
      return 0
    default:
      return 0
  }
}
