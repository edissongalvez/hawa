import axios from 'axios'

import { OrderDetail } from './orderDetail'
import { Product } from './product'

export interface OrderItem {
    id: number,
    orderId: number,
    productId: number,
    quantity: number,
    createdAt: Date,
    modifiedAt: Date,
    order: OrderDetail,
    product: Product
}

export default class OrderItemController {
    static async createOrderItem(orderId: number, productId: number, quantity: number): Promise<OrderItem> {
        const response = await axios.post<OrderItem>(`${process.env.EXPO_PUBLIC_API_URL}/orderItem`, { orderId, productId, quantity })
        return response.data
    }

    static async getOrderItems(): Promise<OrderItem[]> {
        const response = await axios.get<OrderItem[]>(`${process.env.EXPO_PUBLIC_API_URL}/orderItem`)
        return response.data
    }

    static async getOrderItem(id: number): Promise<OrderItem> {
        const response = await axios.get<OrderItem>(`${process.env.EXPO_PUBLIC_API_URL}/orderItem/${id}`)
        return response.data
    }

    static async updateOrderItem(id: number, orderId: number, productId: number, quantity: number): Promise<OrderItem> {
        const response = await axios.put<OrderItem>(`${process.env.EXPO_PUBLIC_API_URL}/orderItem/${id}`, { orderId, productId, quantity })
        return response.data
    }

    static async deleteOrderItem(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/orderItem/${id}`)
    }
}