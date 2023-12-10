import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUserPayment = async (userId: number, paymentType: string, provider: string, accountNo: string, expiry: Date) => {
    return await prisma.userPayment.create({
        data: {
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            paymentType: paymentType,
            provider: provider,
            accountNo: accountNo,
            expiry: expiry
        }
    })
}

export const getUserPayments = async () => {
    return await prisma.userPayment.findMany({
        include: {
            user: true
        }
    })
}

export const getUserPayment = async (id: number) => {
    return await prisma.userPayment.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: true
        }
    })
}

export const updateUserPayment = async (id: number, userId: number, paymentType: string, provider: string, accountNo: string, expiry: Date) => {
    return await prisma.userPayment.update({
        where: {
            id: Number(id)
        },
        data: {
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            paymentType: paymentType,
            provider: provider,
            accountNo: accountNo,
            expiry: expiry
        }
    })
}

export const deleteUserPayment = async (id: number) => {
    return await prisma.userPayment.delete({
        where: {
            id: Number(id)
        }
    })
}