import axios from 'axios'
import { Product } from './product'

export interface Discount {
    id: number,
    name: string,
    desc: string,
    discountPercent: number,
    active: boolean,
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    products: Product[]
}

export default class DiscountController {
    static async createDiscount(name: string, desc: string, discountPercent: number, active: boolean, products: Product[]): Promise<Discount> {
        const response = await axios.post<Discount>(`${process.env.EXPO_PUBLIC_API_URL}/discount`, { name, desc, discountPercent, active, products })
        return response.data
    }

    static async getDiscounts(): Promise<Discount[]> {
        const response = await axios.get<Discount[]>(`${process.env.EXPO_PUBLIC_API_URL}/discount`)
        return response.data
    }

    static async getDiscount(id: number): Promise<Discount> {
        const response = await axios.get<Discount>(`${process.env.EXPO_PUBLIC_API_URL}/discount/${id}`)
        return response.data
    }

    static async updateDiscount(id: number, name: string, desc: string, discountPercent: number, active: boolean, products: Product[]): Promise<Discount> {
        const response = await axios.put<Discount>(`${process.env.EXPO_PUBLIC_API_URL}/discount/${id}`, { name, desc, discountPercent, active, products })
        return response.data
    }

    static async deleteDiscount(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/discount/${id}`)
    }
}