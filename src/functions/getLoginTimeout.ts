export const getLoginTimeout = (attempts: number) => {
  const base = 5
  if (attempts <= base) return 0
  return (attempts - base) * 60 * base
}
