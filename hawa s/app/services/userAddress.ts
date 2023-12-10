import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createUserAddress = async (userId: number, addressLine: string, city: string, postalCode: string, country: string, telephone: string) => {
    return await prisma.userAddress.create({
        data: {
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            addressLine: addressLine,
            city: city,
            postalCode: postalCode,
            country: country,
            telephone: telephone
        }
    })
}

export const getUserAddresses = async () => {
    return await prisma.userAddress.findMany({
        include: {
            user: true
        }
    })
}

export const getUserAddress = async (id: number) => {
    return await prisma.userAddress.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: true
        }
    })
}

export const updateUserAddress = async (id: number, userId: number, addressLine: string, city: string, postalCode: string, country: string, telephone: string) => {
    return await prisma.userAddress.update({
        where: {
            id: Number(id)
        },
        data: {
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            addressLine: addressLine,
            city: city,
            postalCode: postalCode,
            country: country,
            telephone: telephone
        }
    })
}

export const deleteUserAddress = async (id: number) => {
    return await prisma.userAddress.delete({
        where: {
            id: Number(id)
        }
    })
}