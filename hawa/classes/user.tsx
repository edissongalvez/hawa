import axios from 'axios'
import { UserAddress } from './userAddress'
import { ShoppingSession } from './shoppingSession'
import { OrderDetail } from './orderDetail'

export interface User {
    id: number,
    username: string,
    password: string,
    image: string,
    firstName: string,
    lastName: string,
    adminUser: boolean,
    createdAt: Date,
    modifiedAt: Date,
    addresses: UserAddress[],
    session: ShoppingSession,
    orders: OrderDetail[]
}

export default class UserController {
    static async login(username: string, password: string): Promise<User> {
        const response = await axios.post<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, { username, password })
        const user = response.data
        return user
    }

    static async createUser(username: string, password: string, image: string, firstName: string, lastName: string): Promise<User> {
        const response = await axios.post<User>(`${process.env.EXPO_PUBLIC_API_URL}/user`, { username, password, image, firstName, lastName })
        return response.data
    }

    static async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${process.env.EXPO_PUBLIC_API_URL}/user`)
        return response.data
    }

    static async getUser(id: number): Promise<User> {
        const response = await axios.get<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/${id}`)
        return response.data
    }

    static async updateUser(id: number, username: string, password: string, image: string, firstName: string, lastName: string): Promise<User> {
        const response = await axios.put<User>(`${process.env.EXPO_PUBLIC_API_URL}/user/${id}`, {username, password, image, firstName, lastName})
        return response.data
    }

    static async deleteUser(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/user/${id}`)
    }
}