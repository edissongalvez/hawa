import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createShoppingSession = async (userId: number, total: number) => {
    const existingSession = await prisma.shoppingSession.findUnique({
        where: {
          userId: userId,
        },
    })
      
    if (existingSession) {
        return existingSession
    }

    return await prisma.shoppingSession.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            total
        }
    })
}

export const getShoppingSessions = async () => {
    return await prisma.shoppingSession.findMany({
        include: {
            user: true,
            cartItems: {
                include: {
                    product: {
                        include: {
                            discount: true
                        }
                    }
                }
            }
        }
    })
}

export const getShoppingSession = async (id: number) => {
    return await prisma.shoppingSession.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            cartItems: {
                include: {
                    product: {
                        include: {
                            discount: true
                        }
                    }
                }
            }
        }
    })
}

export const getShoppingSessionForUser = async (userId: number) => {
    return await prisma.shoppingSession.findUnique({
        where: {
            userId,
        },
        include: {
            user: true,
            cartItems: {
                include: {
                    product: {
                        include: {
                            discount: true
                        }
                    }
                }
            }
        }
    })
}

export const updateShoppingSession = async (id: number, userId: number, total: number) => {
    return await prisma.shoppingSession.update({
        where: {
            id
        },
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            total
        }
    })
}

export const deleteShoppingSession = async (id: number) => {
    return await prisma.shoppingSession.delete({
        where: {
            id
        }
    })
}