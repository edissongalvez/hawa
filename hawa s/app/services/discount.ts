import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

export const createDiscount = async (name: string, desc: string, discountPercent: number, active: boolean, products: Product[]) => {
    return await prisma.discount.create({
        data: {
            name: name,
            desc: desc,
            discountPercent: discountPercent,
            active: Boolean(active),
            products: {
                connect: products
            }
        }
    })
}

export const getDiscounts = async () => {
    return await prisma.discount.findMany({
        include: {
            products: true
        }
    })
}

export const getDiscount = async (id: number) => {
    return await prisma.discount.findUnique({
        where: {
            id: id
        },
        include: {
            products: true
        }
    })
}

function determineNewDiscount(currentDiscount: number, isChecked: boolean, newDiscount: number) {
    if (currentDiscount === 1 && isChecked) {
        return newDiscount;
    } else if (currentDiscount === 1 && !isChecked) {
        return 1;
    } else if (currentDiscount === newDiscount && isChecked) {
        return newDiscount;
    } else if (currentDiscount === newDiscount && !isChecked) {
        return 1;
    } else if (currentDiscount !== 1 && currentDiscount !== newDiscount && isChecked) {
        return newDiscount;
    } else if (currentDiscount !== 1 && currentDiscount !== newDiscount && !isChecked) {
        return currentDiscount;
    }
    return currentDiscount
}

export const updateDiscount = async (id: number, name: string, desc: string, discountPercent: number, active: boolean, products: Product[]) => {
    const allProducts = await prisma.product.findMany()

    allProducts.map(async currentProduct => {
        const newDiscount = determineNewDiscount(Number(currentProduct.discountId), products.some(product => currentProduct.id === product.id), Number(id))
        await prisma.product.update({
            where: { id: currentProduct.id },
            data: { discount: { connect: { id: newDiscount } } }
        })
    })

    return await prisma.discount.update({
        where: {
            id: id,
        },
        data: {
            name,
            desc,
            discountPercent,
            active
        },
    })
}



export const deleteDiscount = async (id: number) => {
    await prisma.product.updateMany({
        where: {
            discountId: Number(id)
        },
        data: {
            discountId: 1
        }
    })

    return await prisma.discount.delete({
        where: {
            id: Number(id)
        }
    })
}
    