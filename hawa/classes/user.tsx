import axios from 'axios'

import Url from '../constants/Url'
import { useUser } from '../context/UserContext'
import { UserAddress } from './userAddress'
import { UserPayment } from './userPayment'
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
    payments: UserPayment[],
    session: ShoppingSession,
    orders: OrderDetail[]
}

export default class UserController {
    static async login(username: string, password: string): Promise<User> {
        const response = await axios.post<User>(`${Url.api}/user/login`, { username, password })
        const user = response.data
        return user
    }

    static async createUser(username: string, password: string, image: string, firstName: string, lastName: string): Promise<User> {
        const response = await axios.post<User>(`${Url.api}/user`, { username, password, image, firstName, lastName })
        return response.data
    }

    static async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${Url.api}/user`)
        return response.data
    }

    static async getUser(id: number): Promise<User> {
        const response = await axios.get<User>(`${Url.api}/user/${id}`)
        return response.data
    }

    static async updateUser(id: number, username: string, password: string, image: string, firstName: string, lastName: string): Promise<User> {
        const response = await axios.put<User>(`${Url.api}/user/${id}`, {username, password, image, firstName, lastName})
        return response.data
    }

    static async deleteUser(id: number): Promise<void> {
        await axios.delete(`${Url.api}/user/${id}`)
    }
}