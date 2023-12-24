import axios from 'axios'
import { User } from './user'
import { CartItem } from './cartItem'

export interface ShoppingSession {
    id: number,
    userId: number,
    total: number,
    createdAt: Date,
    modifiedDate: Date,
    user: User,
    cartItems: CartItem[]
}

export default class ShoppingSessionController {
    static async createShoppingSession(userId: number): Promise<ShoppingSession> {
        const response = await axios.post<ShoppingSession>(`${process.env.EXPO_PUBLIC_API_URL}/shoppingSession`, { userId })
        return response.data
    }

    static async getShoppingSessions(): Promise<ShoppingSession[]> {
        const response = await axios.get<ShoppingSession[]>(`${process.env.EXPO_PUBLIC_API_URL}/shoppingSession`)
        return response.data
    }

    static async getShoppingSessionForUser(userId: number): Promise<ShoppingSession> {
        const response = await axios.get<ShoppingSession>(`${process.env.EXPO_PUBLIC_API_URL}/shoppingSession/getForUser`, { params: { userId } })
        return response.data
    }

    static async getShoppingSession(id: number): Promise<ShoppingSession> {
        const response = await axios.get<ShoppingSession>(`${process.env.EXPO_PUBLIC_API_URL}/shoppingSession/${id}`)
        return response.data
    }

    static async updateShoppingSession(id: number, userId: number, total: number): Promise<ShoppingSession> {
        const response = await axios.put<ShoppingSession>(`${process.env.EXPO_PUBLIC_API_URL}/shoppingSession/${id}`, { userId, total })
        return response.data
    }

    static async deleteShoppingSession(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/shoppingSession/${id}`)
    } 
}