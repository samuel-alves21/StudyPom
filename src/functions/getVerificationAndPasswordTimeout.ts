import { verificationAndPasswordTimeout } from '../utilities/verificationAndPasswordTimeout'

export const getVerificationAndPasswordTimeout = (attempts: number) => {
  switch (attempts) {
    case 1:
      return verificationAndPasswordTimeout.oneClick
    case 2:
      return verificationAndPasswordTimeout.twoClicks
    case 3:
      return verificationAndPasswordTimeout.threeClicksOrMore
    case 0:
      return 0
    default:
      return 0
  }
}
