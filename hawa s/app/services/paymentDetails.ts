import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createPaymentDetail = async (orderId: number, amount: number, provider: string, status: string) => {
    return await prisma.paymentDetails.create({
        data: {
            order: {
                connect: {
                    id: orderId
                }
            },
            amount,
            provider,
            status
        }
    })
}

export const getPaymentDetails = async () => {
    return await prisma.paymentDetails.findMany({
        include: {
            order: true
        }
    })
}

export const getPaymentDetail = async (id: number) => {
    return await prisma.paymentDetails.findUnique({
        where: {
            id
        },
        include: {
            order: true
        }
    })
}

export const updatePaymentDetail = async (id: number, orderId: number, amount: number, provider: string, status: string) => {
    return await prisma.paymentDetails.update({
        where: {
            id
        },
        data: {
            order: {
                connect: {
                    id: orderId
                }
            },
            amount,
            provider,
            status
        }
    })
}

export const deletePaymentDetail = async (id: number) => {
    return await prisma.paymentDetails.delete({
        where: {
            id
        }
    })
}