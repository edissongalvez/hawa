import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProductInventory = async (quantity: number) => {
    return await prisma.productInventory.create({
        data: {
            quantity: quantity
        }
    })
}

export const getProductInventories = async () => {
    return await prisma.productInventory.findMany({
        include: {
            product: true
        }
    })
}

export const getProductInventory = async (id: number) => {
    return await prisma.productInventory.findUnique({
        where: {
            id: id
        },
        include: {
            product: true
        }
    })
}

export const updateProductInventory = async (id: number, quantity: number) => {
    return await prisma.productInventory.update({
        where: {
            id: id
        },
        data: {
            quantity: quantity
        }
    })
}

export const deleteProductInventory = async (id: number) => {
    return await prisma.productInventory.delete({
        where: {
            id: id
        }
    })
}