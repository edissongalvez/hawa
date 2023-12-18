import { createContext, useEffect, useContext, useState, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

    useEffect(() => {
        const loadAndSaveUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user')
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            } catch (error) {
                console.error('Hawa no puede recordar al usuario')
            }
        }

        loadAndSaveUser()
    }, [])

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