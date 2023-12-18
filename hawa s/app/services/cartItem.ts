import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createCartItem = async (sessionId: number, productId: number, quantity: number) => {
    return await prisma.cartItem.create({
        data: {
            session: {
                connect: {
                    id: sessionId
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

export const getCartItems = async () => {
    return await prisma.cartItem.findMany({
        include: {
            session: true, 
            product: {
                include: {
                    discount: true,
                    inventory: true
                }
            }
        }
    })
}

export const getCartItem = async (id: number) => {
    return await prisma.cartItem.findUnique({
        where: {
            id
        },
        include: {
            session: true, 
            product: {
                include: {
                    discount: true,
                    inventory: true
                }
            }
        }
    })
}

export const updateCartItem = async (id: number, sessionId: number, productId: number, quantity: number) => {
    return await prisma.cartItem.update({
        where: {
            id
        },
        data: {
            session: {
                connect: {
                    id: sessionId
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

export const deleteCartItem = async (id: number) => {
    return await prisma.cartItem.delete({
        where: {
            id
        }
    })
}