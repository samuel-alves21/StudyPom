import { createContext, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
} 

export interface UserContextType {
  user: string | false | 'pending';
  setUser: (user: string | false | 'pending') => void;
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<string | false | 'pending'>(false)

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  )
}