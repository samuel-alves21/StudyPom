import { useEffect, useMemo } from 'react'

export const useFormInputs = (id: string, isLogin: boolean) => {
  //eslint-disable-next-line
  const inputsArray: HTMLInputElement[] = useMemo(() => [], [isLogin])

  useEffect(() => {
    const form = document.getElementById(id) as HTMLFormElement
    form.childNodes.forEach((child) => {
      child.childNodes.forEach((child2) => {
        const element = child2 as HTMLInputElement
        if (element.placeholder) {
          inputsArray.push(element as HTMLInputElement)
        }
      })
    })
  }, [inputsArray, id, isLogin])

  return inputsArray
}
