import axios from 'axios'
import { User } from './user'

import Url from '../constants/Url'

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
        const response = await axios.post<UserPayment>(`${Url.api}/userPayment`, {userId, paymentType, provider, accountNo, expiry})
        return response.data
    }

    static async getUserPayments(): Promise<UserPayment[]> {
        const response = await axios.get<UserPayment[]>(`${Url.api}/userPayment`)
        return response.data
    }

    static async getUserPayment(id: number): Promise<UserPayment> {
        const response = await axios.get<UserPayment>(`${Url.api}/userPayment/${id}`)
        return response.data
    }

    static async updateUserPayment(id: number, userId: number, paymentType: string, provider: string, accountNo: string, expiry: Date): Promise<UserPayment> {
        const response = await axios.put<UserPayment>(`${Url.api}/userPayment/${id}`, { id, userId, paymentType, provider, accountNo, expiry })
        return response.data
    }

    static async deleteUserPayment(id: number): Promise<void> {
        await axios.delete(`${Url.api}/userPayment/${id}`)
    }
}