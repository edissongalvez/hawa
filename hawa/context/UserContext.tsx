import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../classes/user'

interface UserContextProps {
    user: User | null
    setUser: (user: User | null) => void
}

interface UserProviderProps {
    children: ReactNode
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('Hawa perdió UserProvider')
    }
    return context
}