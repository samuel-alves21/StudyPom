export const getTimeout = (attempts: number) => {
  const base = 1
  if (attempts <= base) return 0
  return (attempts - base) * 60 * base
}
