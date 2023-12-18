import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createOrderDetail = async (userId: number, total: number, paymentId: number) => {
    return await prisma.orderDetails.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            total,
            paymentId
        }
    })
}

export const getOrderDetails = async () => {
    return await prisma.orderDetails.findMany({
        include: {
            user: true,
            payment: true,
            orderItems: true
        }
    })
}

export const getOrderDetail = async (id: number) => {
    return await prisma.orderDetails.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            payment: true,
            orderItems: true
        }
    })
}

export const updateOrderDetail = async (id: number, userId: number, total: number, paymentId: number) => {
    return await prisma.orderDetails.update({
        where: {
            id
        },
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            total,
            payment: {
                connect: {
                    id: paymentId
                }
            }
        }
    })
}

export const deleteOrderDetail = async (id: number) => {
    return await prisma.orderDetails.delete({
        where: {
            id
        }
    })
}