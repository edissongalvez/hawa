import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createPaymentType = async (paymentType: string, provider: string, accountNo: string, expiry: Date) => {
    return await prisma.paymentType.create({
        data: {
            paymentType: paymentType,
            provider: provider,
            accountNo: accountNo,
            expiry: expiry
        }
    })
}

export const getPaymentTypes = async () => {
    return await prisma.paymentType.findMany({
        include: {
            paymentDetails: true
        }
    })
}

export const getPaymentType = async (id: number) => {
    return await prisma.paymentType.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            paymentDetails: true
        }
    })
}

export const updatePaymentType = async (id: number, paymentType: string, provider: string, accountNo: string, expiry: Date) => {
    return await prisma.paymentType.update({
        where: {
            id: Number(id)
        },
        data: {
            paymentType: paymentType,
            provider: provider,
            accountNo: accountNo,
            expiry: expiry
        }
    })
}

export const deletePaymentType = async (id: number) => {
    return await prisma.paymentType.delete({
        where: {
            id: Number(id)
        }
    })
}