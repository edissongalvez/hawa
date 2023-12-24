import axios from 'axios'
import { User } from './user'

export interface UserPayment {
    id: number,
    userId: number,
    paymentType: string,
    provider: string,
    accountNo: string,
    expiry: Date,
    user: User
}

export default class UserPaymentController {
    static async createUserPayment(userId: number, paymentType: string, provider: string, accountNo: string, expiry: Date): Promise<UserPayment> {
        const response = await axios.post<UserPayment>(`${process.env.EXPO_PUBLIC_API_URL}/userPayment`, {userId, paymentType, provider, accountNo, expiry})
        return response.data
    }

    static async getUserPayments(): Promise<UserPayment[]> {
        const response = await axios.get<UserPayment[]>(`${process.env.EXPO_PUBLIC_API_URL}/userPayment`)
        return response.data
    }

    static async getUserPayment(id: number): Promise<UserPayment> {
        const response = await axios.get<UserPayment>(`${process.env.EXPO_PUBLIC_API_URL}/userPayment/${id}`)
        return response.data
    }

    static async updateUserPayment(id: number, userId: number, paymentType: string, provider: string, accountNo: string, expiry: Date): Promise<UserPayment> {
        const response = await axios.put<UserPayment>(`${process.env.EXPO_PUBLIC_API_URL}/userPayment/${id}`, { id, userId, paymentType, provider, accountNo, expiry })
        return response.data
    }

    static async deleteUserPayment(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/userPayment/${id}`)
    }
}