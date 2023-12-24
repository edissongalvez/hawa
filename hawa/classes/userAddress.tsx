import axios from 'axios'
import { User } from './user'

export interface UserAddress {
    id: number,
    userId: number,
    addressLine: string,
    city: string,
    postalCode: string,
    country: string,
    telephone: string,
    user: User
}

export default class UserAddressController {
    static async createUserAddress(userId: number, addressLine: string, city: string, postalCode: string, country: string, telephone: string): Promise<UserAddress> {
        const response = await axios.post<UserAddress>(`${process.env.EXPO_PUBLIC_API_URL}/userAddress`, {userId, addressLine, city, postalCode, country, telephone})
        return response.data
    }

    static async getUserAddresses(): Promise<UserAddress[]> {
        const response = await axios.get<UserAddress[]>(`${process.env.EXPO_PUBLIC_API_URL}/userAddress`)
        return response.data
    }

    static async getUserAddress(id: number): Promise<UserAddress> {
        const response = await axios.get<UserAddress>(`${process.env.EXPO_PUBLIC_API_URL}/userAddress/${id}`)
        return response.data
    }

    static async updateUserAddress(id: number, userId: number, addressLine: string, city: string, postalCode: string, country: string, telephone: string): Promise<UserAddress> {
        const response = await axios.put<UserAddress>(`${process.env.EXPO_PUBLIC_API_URL}/userAddress/${id}`, { id, userId, addressLine, city, postalCode, country, telephone})
        return response.data
    }

    static async deleteUserAddress(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/userAddress/${id}`)
    }
}