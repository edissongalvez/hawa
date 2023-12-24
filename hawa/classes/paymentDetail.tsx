import axios from 'axios'

import { OrderDetail } from './orderDetail'

export interface PaymentDetail {
    id: number,
    orderId: number,
    amount: number,
    provider: string,
    status: string,
    createdAt: Date,
    modifiedAt: Date,
    order: OrderDetail
}

export default class PaymentDetailController {
    static async createPaymentDetail(sessionId: number, productId: number, quantity: number): Promise<PaymentDetail> {
        const response = await axios.post<PaymentDetail>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail`, { sessionId, productId, quantity })
        return response.data
    }

    static async getPaymentDetails(): Promise<PaymentDetail[]> {
        const response = await axios.get<PaymentDetail[]>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail`)
        return response.data
    }

    static async getPaymentDetail(id: number): Promise<PaymentDetail> {
        const response = await axios.get<PaymentDetail>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail/${id}`)
        return response.data
    }

    static async updatePaymentDetail(id: number, sessionId: number, productId: number, quantity: number): Promise<PaymentDetail> {
        const response = await axios.put<PaymentDetail>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail/${id}`, { sessionId, productId, quantity })
        return response.data
    }

    static async deletePaymentDetail(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail/${id}`)
    }
}