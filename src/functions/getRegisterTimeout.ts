export const getRegisterTimeout = (timestamp: number) => {
  const dif = Math.round(Date.now() / 1000) - timestamp
  return dif
}
