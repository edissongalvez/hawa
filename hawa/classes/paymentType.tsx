import axios from 'axios'
import { User } from './user'

export interface PaymentType {
    id: number,
    paymentType: string,
    provider: string,
    accountNo: string,
    expiry: Date,
    user: User
}

export default class PaymentTypeController {
    static async createPaymentType(paymentType: string, provider: string, accountNo: string, expiry: Date): Promise<PaymentType> {
        const response = await axios.post<PaymentType>(`${process.env.EXPO_PUBLIC_API_URL}/paymentType`, {paymentType, provider, accountNo, expiry})
        return response.data
    }

    static async getPaymentTypes(): Promise<PaymentType[]> {
        const response = await axios.get<PaymentType[]>(`${process.env.EXPO_PUBLIC_API_URL}/paymentType`)
        return response.data
    }

    static async getPaymentType(id: number): Promise<PaymentType> {
        const response = await axios.get<PaymentType>(`${process.env.EXPO_PUBLIC_API_URL}/paymentType/${id}`)
        return response.data
    }

    static async updatePaymentType(id: number, paymentType: string, provider: string, accountNo: string, expiry: Date): Promise<PaymentType> {
        const response = await axios.put<PaymentType>(`${process.env.EXPO_PUBLIC_API_URL}/paymentType/${id}`, { id, paymentType, provider, accountNo, expiry })
        return response.data
    }

    static async deletePaymentType(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/paymentType/${id}`)
    }
}