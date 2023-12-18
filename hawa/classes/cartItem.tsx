import axios from 'axios'

import Url from '../constants/Url'
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
        const response = await axios.post<CartItem>(`${Url.api}/cartItem`, { sessionId, productId, quantity })
        return response.data
    }

    static async getCartItems(): Promise<CartItem[]> {
        const response = await axios.get<CartItem[]>(`${Url.api}/cartItem`)
        return response.data
    }

    static async getCartItem(id: number): Promise<CartItem> {
        const response = await axios.get<CartItem>(`${Url.api}/cartItem/${id}`)
        return response.data
    }

    static async updateCartItem(id: number, sessionId: number, productId: number, quantity: number): Promise<CartItem> {
        const response = await axios.put<CartItem>(`${Url.api}/cartItem/${id}`, { sessionId, productId, quantity })
        return response.data
    }

    static async deleteCartItem(id: number): Promise<void> {
        await axios.delete(`${Url.api}/cartItem/${id}`)
    } 
}