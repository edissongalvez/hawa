import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProduct = async (name: string, desc: string, image: string, categoryId: number, quantity: number, price: number, discountId?: number) => {
    return await prisma.product.create({
        data: {
            name: name,
            desc: desc,
            image: image,
            category: {
                connect: {
                    id: Number(categoryId)
                }
            },
            inventory: {
                create: {
                    quantity: Number(quantity)
                }
            },
            price: price,
            discount: {
                connect: {
                    id: Number(discountId)
                }
            }
        }
    })
}

export const getProducts = async () => {
    return await prisma.product.findMany({
        include: {
            category: true,
            inventory: true,
            discount: true
        }
    })
}

export const getProduct = async (id: number) => {
    return await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            category: true,
            inventory: true,
            discount: true
        }
    })
}

export const updateProduct = async (id: number, name: string, desc: string, image: string, categoryId: number, quantity: number, price: number, discountId?: number) => {
    return await prisma.product.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name,
            desc: desc,
            image: image,
            category: {
                connect: {
                    id: Number(categoryId)
                }
            },
            inventory: {
                update: {
                    quantity: Number(quantity)
                }
            },
            price: Number(price),
            discount: {
                connect: {
                    id: Number(discountId)
                }
            }
        }
    })
}

export const deleteProduct = async (id: number) => {
    return await prisma.product.delete({
        where: {
            id: id
        }
    })
}