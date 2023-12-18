import axios from 'axios'

import Url from '../constants/Url'
import { User } from './user'
import { PaymentDetail } from './paymentDetail'
import { OrderItem } from './orderItem'

export interface OrderDetail {
    id: number,
    userId: number,
    total: number,
    paymentId: number,
    createdAt: Date,
    modifiedAt: Date,
    user: User,
    payment: PaymentDetail,
    orderItems: OrderItem[]
}

export default class OrderDetailController {
    static async createOrderDetail(userId: number, total: number, paymentId: number): Promise<OrderDetail> {
        const response = await axios.post<OrderDetail>(`${Url.api}/orderDetail`, { userId, total, paymentId })
        return response.data
    }

    static async getOrderDetails(): Promise<OrderDetail[]> {
        const response = await axios.get<OrderDetail[]>(`${Url.api}/orderDetail`)
        return response.data
    }

    static async getOrderDetail(id: number): Promise<OrderDetail> {
        const response = await axios.get<OrderDetail>(`${Url.api}/orderDetail/${id}`)
        return response.data
    }

    static async updateOrderDetail(id: number, userId: number, total: number, paymentId: number): Promise<OrderDetail> {
        const response = await axios.put<OrderDetail>(`${Url.api}/orderDetail/${id}`, { userId, total, paymentId })
        return response.data
    }

    static async deleteOrderDetail(id: number): Promise<void> {
        await axios.delete(`${Url.api}/orderDetail/${id}`)
    }
}