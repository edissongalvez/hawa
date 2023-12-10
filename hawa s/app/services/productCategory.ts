import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProductCategory = async (name: string, desc: string) => {
    return await prisma.productCategory.create({
        data: {
            name: name,
            desc: desc
        }
    })
}

export const getProductCategories = async () => {
    return await prisma.productCategory.findMany({
        include: {
            products: {
                include: {
                    discount: true
                }
            }
        }
    })
}

export const getProductCategory = async (id: number) => {
    return await prisma.productCategory.findUnique({
        where: {
            id: id
        },
        include: {
            products: {
                include: {
                    discount: true
                }
            }
        }
    })
}

export const updateProductCategory = async (id: number, name: string, desc: string) => {
    return await prisma.productCategory.update({
        where: {
            id: id
        },
        data: {
            name: name,
            desc: desc
        }
    })
}

export const deleteProductCategory = async (id: number) => {
    return await prisma.productCategory.delete({
        where: {
            id: id
        }
    })
}