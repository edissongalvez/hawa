import { PrismaClient } from '@prisma/client'
import { decrementShoppingSessionTotal, incrementShoppingSessionTotal } from './shoppingSession'
import { decrementProductInventoryQuantity, getProduct, incrementProductInventoryQuantity } from './product'

const prisma = new PrismaClient()

export const createCartItem = async (sessionId: number, productId: number, quantity: number) => {
    const existingCartItem = await getCartItemForSessionAndProduct(sessionId, productId)

    if (existingCartItem) {
        const updateCartItem = await incrementCartItemQuantity(existingCartItem.id, quantity)

        await incrementShoppingSessionTotal(sessionId, Number(updateCartItem.product.price) * quantity)

        return updateCartItem
    }

    const product = await getProduct(productId)

    if (!product) {
        throw new Error('Producto no encontrado')
    }

    if (product.inventory.quantity < quantity) {
        throw new Error('Existencias insuficiente')
    }

    const newCartItem = await prisma.cartItem.create({
        data: {
            sessionId,
            productId,
            quantity
        },
        include: {
            session: true,
            product: {
                include: {
                    discount: true
                }
            },
        }
    })

    await incrementShoppingSessionTotal(sessionId, Number(newCartItem.product.price) * (1 - Number(newCartItem.product.discount?.discountPercent)) * quantity)

    await decrementProductInventoryQuantity(productId, quantity)

    return newCartItem
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

export const getCartItemForSessionAndProduct = async (sessionId: number, productId: number) => {
    return await prisma.cartItem.findUnique({
        where: {
            sessionId_productId: {
                sessionId,
                productId
            }
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

export const incrementCartItemQuantity = async (id: number, quantity: number) => {
    return await prisma.cartItem.update({
        where: {
            id
        },
        data: {
            quantity: {
                increment: quantity
            }
        },
        include: {
            session: true,
            product: true
        }
    })
}

export const decrementCartItemQuantity = async (id: number, quantity: number) => {
    return await prisma.cartItem.update({
        where: {
            id
        },
        data: {
            quantity: {
                decrement: quantity
            }
        },
        include: {
            session: true,
            product: true
        }
    })
}

export const deleteCartItem = async (id: number) => {
    const cartItem = await getCartItem(id)

    if (!cartItem) {
        throw new Error('Producto no encontrado en el carrito')
    }

    await prisma.cartItem.delete({
        where: {
            id
        }
    })

    await decrementShoppingSessionTotal(cartItem.sessionId, Number(cartItem.product.price) * (1 - Number(cartItem.product.discount?.discountPercent)) * cartItem.quantity)

    await incrementProductInventoryQuantity(cartItem.productId, cartItem.quantity)

    return { success: true }
}