import axios from 'axios'
import { User } from './user'

import Url from '../constants/Url'

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
        const response = await axios.post<UserAddress>(`${Url.api}/userAddress`, {userId, addressLine, city, postalCode, country, telephone})
        return response.data
    }

    static async getUserAddresses(): Promise<UserAddress[]> {
        const response = await axios.get<UserAddress[]>(`${Url.api}/userAddress`)
        return response.data
    }

    static async getUserAddress(id: number): Promise<UserAddress> {
        const response = await axios.get<UserAddress>(`${Url.api}/userAddress/${id}`)
        return response.data
    }

    static async updateUserAddress(id: number, userId: number, addressLine: string, city: string, postalCode: string, country: string, telephone: string): Promise<UserAddress> {
        const response = await axios.put<UserAddress>(`${Url.api}/userAddress/${id}`, { id, userId, addressLine, city, postalCode, country, telephone})
        return response.data
    }

    static async deleteUserAddress(id: number): Promise<void> {
        await axios.delete(`${Url.api}/userAddress/${id}`)
    }
}