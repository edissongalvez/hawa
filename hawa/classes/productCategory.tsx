import axios from 'axios'
import { Product } from './product'

import Url from '../constants/Url'

export interface ProductCategory {
    id: number,
    name: string,
    desc: string,
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
    products: Product[]
}

export default class ProductCategoryController {
    static async createProductCategory(name: string, desc: string): Promise<ProductCategory> {
        const response = await axios.post<ProductCategory>(`${Url.api}/productCategory`, { name, desc })
        return response.data
    }

    static async getProductCategories(): Promise<ProductCategory[]> {
        const response = await axios.get<ProductCategory[]>(`${Url.api}/productCategory`)
        return response.data
    }

    static async getProductCategory(id: number): Promise<ProductCategory> {
        const response = await axios.get<ProductCategory>(`${Url.api}/productCategory/${id}`)
        return response.data
    }

    static async updateProductCategory(id: number, name: string, desc: string): Promise<ProductCategory> {
        const response = await axios.put<ProductCategory>(`${Url.api}/productCategory/${id}`, { name, desc })
        return response.data
    }

    static async deleteProductCategory(id: number): Promise<void> {
        await axios.delete(`${Url.api}/productCategory/${id}`)
    }
}