import axios from 'axios'
import { Product } from './product'
import { ShoppingSession } from './shoppingSession'

export interface CartItem {
    id: number,
    sessionId: number,
    productId: number,
    quantity: number,
    createdAt: Date,
    modifiedAt: Date,
    session: ShoppingSession,
    product: Product
}

export default class CartItemController {
    static async createCartItem(sessionId: number, productId: number, quantity: number): Promise<CartItem> {
        const response = await axios.post<CartItem>(`${process.env.EXPO_PUBLIC_API_URL}/cartItem`, { sessionId, productId, quantity })
        return response.data
    }

    static async getCartItems(): Promise<CartItem[]> {
        const response = await axios.get<CartItem[]>(`${process.env.EXPO_PUBLIC_API_URL}/cartItem`)
        return response.data
    }

    static async getCartItem(id: number): Promise<CartItem> {
        const response = await axios.get<CartItem>(`${process.env.EXPO_PUBLIC_API_URL}/cartItem/${id}`)
        return response.data
    }

    static async updateCartItem(id: number, sessionId: number, productId: number, quantity: number): Promise<CartItem> {
        const response = await axios.put<CartItem>(`${process.env.EXPO_PUBLIC_API_URL}/cartItem/${id}`, { sessionId, productId, quantity })
        return response.data
    }

    static async deleteCartItem(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/cartItem/${id}`)
    } 
}