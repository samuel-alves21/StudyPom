import { createContext, useState } from "react";

interface SaveConfigProviderProps {
  children: React.ReactNode
}

export interface SaveConfigContextType {
  isSaved: boolean
  setIsSaved: (value: boolean) => void
}

export const SaveConfigContext = createContext<SaveConfigContextType | null>(null)

export const SaveConfigProvider = ({ children }: SaveConfigProviderProps) => {
  const [isSaved, setIsSaved] = useState(true)

  return <SaveConfigContext.Provider value={{ isSaved, setIsSaved }}>{children}</SaveConfigContext.Provider>
}