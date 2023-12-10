import axios from 'axios'
import { Product } from './product'

import Url from '../constants/Url'

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
        const response = await axios.post<ProductInventory>(`${Url.api}/productInventory`, { quantity })
        return response.data
    }

    static async getProductInventories(): Promise<ProductInventory[]> {
        const response = await axios.get<ProductInventory[]>(`${Url.api}/productInventory`)
        return response.data
    }

    static async getProductInventory(id: number): Promise<ProductInventory> {
        const response = await axios.get<ProductInventory>(`${Url.api}/productInventory/${id}`)
        return response.data
    }

    static async updateProductInventory(id: number, quantity: number): Promise<ProductInventory> {
        const response = await axios.put<ProductInventory>(`${Url.api}/productInventory/${id}`, { quantity })
        return response.data
    }

    static async deleteProductInventory(id: number): Promise<void> {
        await axios.delete(`${Url.api}/productInventory/${id}`)
    }
}