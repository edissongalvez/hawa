import axios from 'axios'

import { User } from './user'
import { PaymentDetail } from './paymentDetail'
import { OrderItem } from './orderItem'

export interface OrderDetail {
    id: number,
    userId: number,
    total: number,
    createdAt: Date,
    modifiedAt: Date,
    user: User,
    payment: PaymentDetail,
    orderItems: OrderItem[]
}

export default class OrderDetailController {
    static async createOrderDetail(userId: number, total: number): Promise<OrderDetail> {
        const response = await axios.post<OrderDetail>(`${process.env.EXPO_PUBLIC_API_URL}/orderDetail`, { userId, total })
        return response.data
    }

    static async transferCartToOrder(formData: FormData): Promise<OrderDetail> {
        const response = await axios.post<OrderDetail>(`${process.env.EXPO_PUBLIC_API_URL}/orderDetail/transferCartToOrder`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async getOrderDetails(): Promise<OrderDetail[]> {
        const response = await axios.get<OrderDetail[]>(`${process.env.EXPO_PUBLIC_API_URL}/orderDetail`)
        return response.data
    }

    static async getOrderDetail(id: number): Promise<OrderDetail> {
        const response = await axios.get<OrderDetail>(`${process.env.EXPO_PUBLIC_API_URL}/orderDetail/${id}`)
        return response.data
    }

    static async updateOrderDetail(id: number, userId: number, total: number): Promise<OrderDetail> {
        const response = await axios.put<OrderDetail>(`${process.env.EXPO_PUBLIC_API_URL}/orderDetail/${id}`, { userId, total })
        return response.data
    }

    static async deleteOrderDetail(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/orderDetail/${id}`)
    }
}