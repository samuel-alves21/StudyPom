export const getIp = async () => {
  console.log('here')
  const response = await fetch('https://api.ipify.org')
  const ip = (await response.text()).replaceAll('.', '')
  return ip
}
