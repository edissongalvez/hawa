import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createOrderItem = async (orderId: number, productId: number, quantity: number) => {
    return await prisma.orderItems.create({
        data: {
            order: {
                connect: {
                    id: orderId
                }
            },
            product: {
                connect: {
                    id: productId
                }
            },
            quantity
        }
    })
}

export const getOrderItems = async () => {
    return await prisma.orderItems.findMany({
        include: {
            order: true,
            product: true
        }
    })
}

export const getOrderItem = async (id: number) => {
    return await prisma.orderItems.findUnique({
        where: {
            id
        },
        include: {
            order: true,
            product: true
        }
    })
}

export const updateOrderItem = async (id: number, orderId: number, productId: number, quantity: number) => {
    return await prisma.orderItems.update({
        where: {
            id
        },
        data: {
            order: {
                connect: {
                    id: orderId
                }
            },
            product: {
                connect: {
                    id: productId
                }
            },
            quantity
        }
    })
}

export const deleteOrderItem = async (id: number) => {
    return await prisma.orderItems.delete({
        where: {
            id
        }
    })
}