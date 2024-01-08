import axios from 'axios'

import { OrderDetail } from './orderDetail'
import { PaymentType } from './paymentType'
import { PaymentStatus } from './paymentStatus'

export interface PaymentDetail {
    id: number,
    orderId: number,
    voucher: string,
    typeId: number,
    statusId: number,
    createdAt: Date,
    modifiedAt: Date,
    order: OrderDetail,
    type: PaymentType,
    status: PaymentStatus
}

export default class PaymentDetailController {
    // static async createPaymentDetail(orderId: number, productId: number, quantity: number): Promise<PaymentDetail> {
    //     const response = await axios.post<PaymentDetail>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail`, { orderId, productId, quantity })
    //     return response.data
    // }

    static async createPaymentDetail(formData: FormData): Promise<PaymentDetail> {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

    // static async updatePaymentDetail(id: number, orderId: number, productId: number, quantity: number): Promise<PaymentDetail> {
    //     const response = await axios.put<PaymentDetail>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail/${id}`, { orderId, productId, quantity })
    //     return response.data
    // }

    static async updatePaymentDetail(id: number, formData: FormData): Promise<PaymentDetail> {
        const response = await axios.put<PaymentDetail>(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async deletePaymentDetail(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/paymentDetail/${id}`)
    }
}