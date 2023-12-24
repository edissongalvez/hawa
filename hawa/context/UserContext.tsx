import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
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

    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user')
            setUser(storedUser ? JSON.parse(storedUser) : null)
        } catch (error) {
            console.error('Error de AsyncStorage', error)
        }
    }

    const saveUser = async () => {
        try {
            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify(user))
            } else {
                await AsyncStorage.removeItem('user')
            }
        } catch (error) {
            console.error('Hawa no puede recordar el usuario', error)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    useEffect(()=> {
        saveUser()
    }, [user])

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