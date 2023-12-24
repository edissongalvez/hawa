import axios from 'axios'
import { Product } from './product'

export interface ProductInventory {
    id: number,
    quantity: number,
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    product: Product
}

export default class ProductInventoryController {
    static async createProductInventory(quantity: number): Promise<ProductInventory> {
        const response = await axios.post<ProductInventory>(`${process.env.EXPO_PUBLIC_API_URL}/productInventory`, { quantity })
        return response.data
    }

    static async getProductInventories(): Promise<ProductInventory[]> {
        const response = await axios.get<ProductInventory[]>(`${process.env.EXPO_PUBLIC_API_URL}/productInventory`)
        return response.data
    }

    static async getProductInventory(id: number): Promise<ProductInventory> {
        const response = await axios.get<ProductInventory>(`${process.env.EXPO_PUBLIC_API_URL}/productInventory/${id}`)
        return response.data
    }

    static async updateProductInventory(id: number, quantity: number): Promise<ProductInventory> {
        const response = await axios.put<ProductInventory>(`${process.env.EXPO_PUBLIC_API_URL}/productInventory/${id}`, { quantity })
        return response.data
    }

    static async deleteProductInventory(id: number): Promise<void> {
        await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/productInventory/${id}`)
    }
}