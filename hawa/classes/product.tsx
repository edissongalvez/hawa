import axios from 'axios'
import { Discount } from './discount'
import { ProductCategory } from './productCategory'
import { ProductInventory } from "./productInventory"

import Url from '../constants/Url'

export interface Product {
    id: number,
    name: string,
    desc: string,
    image: string,
    categoryId: number,
    inventoryId: number,
    price: number,
    discountId: number,
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    category: ProductCategory,
    inventory: ProductInventory,
    discount: Discount
}

export default class ProductController {
    static async createProduct(name: string, desc: string, image: FormData, categoryId: number, quantity: number, price: number, discountId?: number): Promise<Product> {
        const response = await axios.post<Product>(`${Url.api}/product`, { name, desc, image, categoryId, quantity, price, discountId }, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    }

    static async getProducts(): Promise<Product[]> {
        const response = await axios.get<Product[]>(`${Url.api}/product`)
        return response.data
    }

    static async getProduct(id: number): Promise<Product> {
        const response = await axios.get<Product>(`${Url.api}/product/${id}`)
        return response.data
    }

    static async updateProduct(id: number, name: string, desc: string, image: string, categoryId: number, quantity: number, price: number, discountId?: number): Promise<Product> {
        const response = await axios.put(`${Url.api}/product/${id}`, { name, desc, image, categoryId, quantity, price, discountId })
        return response.data
    }

    static async deleteProduct(id: number): Promise<void> {
        await axios.delete(`${Url.api}/product/${id}`)
    }
}