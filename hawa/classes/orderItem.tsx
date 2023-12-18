import axios from 'axios'

import Url from '../constants/Url'
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
        const response = await axios.post<OrderItem>(`${Url.api}/orderItem`, { orderId, productId, quantity })
        return response.data
    }

    static async getOrderItems(): Promise<OrderItem[]> {
        const response = await axios.get<OrderItem[]>(`${Url.api}/orderItem`)
        return response.data
    }

    static async getOrderItem(id: number): Promise<OrderItem> {
        const response = await axios.get<OrderItem>(`${Url.api}/orderItem/${id}`)
        return response.data
    }

    static async updateOrderItem(id: number, orderId: number, productId: number, quantity: number): Promise<OrderItem> {
        const response = await axios.put<OrderItem>(`${Url.api}/orderItem/${id}`, { orderId, productId, quantity })
        return response.data
    }

    static async deleteOrderItem(id: number): Promise<void> {
        await axios.delete(`${Url.api}/orderItem/${id}`)
    }
}