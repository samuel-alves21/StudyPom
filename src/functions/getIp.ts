export const getIp = async () => {
  const response = await fetch('https://api.ipify.org')
  const ip = await response.text()
  return ip
}
