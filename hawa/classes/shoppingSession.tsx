import axios from 'axios'

import Url from '../constants/Url'
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
    static async createShoppingSession(userId: number, total: number): Promise<ShoppingSession> {
        const response = await axios.post<ShoppingSession>(`${Url.api}/shoppingSession`, { userId, total })
        return response.data
    }

    static async getShoppingSessions(): Promise<ShoppingSession[]> {
        const response = await axios.get<ShoppingSession[]>(`${Url.api}/shoppingSession`)
        return response.data
    }

    static async getShoppingSession(id: number): Promise<ShoppingSession> {
        const response = await axios.get<ShoppingSession>(`${Url.api}/shoppingSession/${id}`)
        return response.data
    }

    static async getShoppingSessionForUser(id: number): Promise<ShoppingSession> {
        const response = await axios.get<ShoppingSession>(`${Url.api}/shoppingSession/getShoppingSession/${id}`)
        return response.data
    }

    static async updateShoppingSession(id: number, userId: number, total: number): Promise<ShoppingSession> {
        const response = await axios.put<ShoppingSession>(`${Url.api}/shoppingSession/${id}`, { userId, total })
        return response.data
    }

    static async deleteShoppingSession(id: number): Promise<void> {
        await axios.delete(`${Url.api}/shoppingSession/${id}`)
    } 
}