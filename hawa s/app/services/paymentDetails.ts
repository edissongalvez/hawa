import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createPaymentDetail = async (orderId: number, voucher: string, typeId: number, statusId: number) => {
    return await prisma.paymentDetails.create({
        data: {
            order: {
                connect: {
                    id: orderId
                }
            },
            voucher,
            type: {
                connect: {
                    id: typeId
                }
            },
            status: {
                connect: {
                    id: statusId
                }
            }
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

export const updatePaymentDetail = async (id: number, orderId: number, voucher: string, typeId: number, statusId: number) => {
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
            voucher,
            type: {
                connect: {
                    id: typeId
                }
            },
            status: {
                connect: {
                    id: statusId
                }
            }
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