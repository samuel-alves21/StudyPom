import { useEffect, useMemo } from 'react'

export const useFormInputs = (id: string) => {
  const inputsArray: HTMLInputElement[] = useMemo(() => [], [])

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
  }, [inputsArray, id])

  return inputsArray
}
