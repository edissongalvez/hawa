import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createOrderDetail = async (userId: number, total: number) => {
    return await prisma.orderDetails.create({
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

export const transferCartToOrder = async (userId: number, paymentTypeId: number, voucher: string) => {
    try {
        const shoppingSession = await prisma.shoppingSession.findFirst({
            where: { userId },
            include: { cartItems: true }
        })

        if (!shoppingSession) {
            throw new Error('Sin carrito')
        }

        const orderDetail = await prisma.orderDetails.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                total: shoppingSession.total,
                orderItems: {
                    create: shoppingSession.cartItems.map(cartItem => ({
                        productId: cartItem.productId,
                        quantity: cartItem.quantity
                    }))
                },
                payment: {
                    create: {
                        voucher,
                        typeId: paymentTypeId,
                        statusId: 1
                    }
                }
            },
            include: { orderItems: true }
        })

        // Eliminar los elementos del carrito
        await prisma.cartItem.deleteMany({
            where: { sessionId: shoppingSession.id }
        })
  
        // Ahora que los elementos del carrito se han eliminado, podemos eliminar la sesión de compras
        await prisma.shoppingSession.delete({
            where: { userId }
        })

        return orderDetail
    } catch (error) {
        console.log(error)
    }
}

export const getOrderDetails = async () => {
    return await prisma.orderDetails.findMany({
        include: {
            user: true,
            payment: {
                include: {
                    status: true,
                    type: true
                }
            },
            orderItems: {
                include: {
                    product: true
                }
            }
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
            payment: {
                include: {
                    status: true,
                    type: true
                }
            },
            orderItems: {
                include: {
                    product: true
                }
            }
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