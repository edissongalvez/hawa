import axios from 'axios'

import Url from '../constants/Url'
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
        const response = await axios.post<PaymentDetail>(`${Url.api}/paymentDetail`, { sessionId, productId, quantity })
        return response.data
    }

    static async getPaymentDetails(): Promise<PaymentDetail[]> {
        const response = await axios.get<PaymentDetail[]>(`${Url.api}/paymentDetail`)
        return response.data
    }

    static async getPaymentDetail(id: number): Promise<PaymentDetail> {
        const response = await axios.get<PaymentDetail>(`${Url.api}/paymentDetail/${id}`)
        return response.data
    }

    static async updatePaymentDetail(id: number, sessionId: number, productId: number, quantity: number): Promise<PaymentDetail> {
        const response = await axios.put<PaymentDetail>(`${Url.api}/paymentDetail/${id}`, { sessionId, productId, quantity })
        return response.data
    }

    static async deletePaymentDetail(id: number): Promise<void> {
        await axios.delete(`${Url.api}/paymentDetail/${id}`)
    }
}