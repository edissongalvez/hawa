import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Hash password

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function main() {

    // Product management

    const newProductCategories = await prisma.productCategory.createMany({
        data: [
            { name: 'Pizza', desc: 'Plato italiano con base de pan, salsa de tomate y queso' },
            { name: 'Postre', desc: 'Platos dulces servidos al final de una comida' },
            { name: 'Bebida', desc: 'Líquidos para beber, pueden ser calientes o fríos' },
            { name: 'Complemento', desc: 'Elementos adicionales que mejoran una comida' }
        ]
    })

    const newProductInventories = await prisma.productInventory.createMany({
        data: [
            { quantity: 1 },
            { quantity: 7 },
            { quantity: 2 },
            { quantity: 5 },
            { quantity: 4 },
            { quantity: 10 },
            { quantity: 8 },
            { quantity: 11 },
            { quantity: 26 },
            { quantity: 14 },
            { quantity: 22 },
            { quantity: 7 },
            { quantity: 20 },
            { quantity: 8 },
            { quantity: 19 },
            { quantity: 13 }
        ]
    })

    const newDiscounts = await prisma.discount.createMany({
        data: [
            { name: 'Ninguno', desc: 'Precio regular', discountPercent: 0, active: false },
            { name: 'CyberWow 2023', desc: '5 días de super ofertas online', discountPercent: .2, active: true },
            { name: 'Especial de Diciembre', desc: 'Ofertas por Noche Buena y Navidad', discountPercent: .4, active: false }
        ]
    })

    const newProducts = await prisma.product.createMany({
        data: [
            { name: 'Americana', desc: '¡La Pizza preferida de los chicos! Jamón y queso mozzarella', image: 'files\\products\\americana.webp', categoryId: 1, inventoryId: 1, price: 40.9, discountId: 1 },
            { name: 'Pepperoni', desc: 'Sabor incomparable de pepperoni americano y queso mozzarella', image: 'files\\products\\pepperoni.webp', categoryId: 1, inventoryId: 2, price: 45.9, discountId: 1 },
            { name: 'Mozzarella', desc: 'Para los amantes del queso una deliciosa pizza con nuestro queso mozzarella gratinado', image: 'files\\products\\mozzarella.webp', categoryId: 1, inventoryId: 3, price: 45.9, discountId: 3  },
            { name: 'Vegetariana', desc: 'Exquisita combinación de champiñones, aceitunas verdes, pimientos verdes, cebolla roja y queso mozzarella', image: 'files\\products\\vegetariana.webp', categoryId: 1, inventoryId: 4, price: 45.9, discountId: 1 },
            { name: 'Keke de limón', desc: 'Suave bizcochuelo relleno con exquisita crema sabor limón', image: 'files\\products\\kekeLimon.webp', categoryId: 2, inventoryId: 5, price: 10.9, discountId: 1 },
            { name: 'Keke de chocolate', desc: 'Delicioso keke sabor a chocolate con relleno líquido', image: 'files\\products\\kekeChocolate.webp', categoryId: 2, inventoryId: 6, price: 10.9, discountId: 2 },
            { name: 'Tarta de manzana', desc: 'Clásica tarta horneada elaborada a base de masa de hojaldre, rellena de compota de manzana y canela', image: 'files\\products\\tartaManzana.webp', categoryId: 2, inventoryId: 7, price: 10.9, discountId: 3 },
            { name: 'Rolls de manjar', desc: '6 Deliciosos rolls rellenos de manjar', image: 'files\\products\\rollManjar.webp', categoryId: 2, inventoryId: 8, price: 10.9, discountId: 1 },
            { name: 'San Luis', desc: 'Agua San Luis sin gas personal', image: 'files\\products\\aguaSanLuis.webp', categoryId: 3, inventoryId: 9, price: 4.9, discountId: 1 },
            { name: 'Coca Cola', desc: 'Gaseosa Coca Cola sin azucar personal', image: 'files\\products\\gaseosaCocaCola.webp', categoryId: 3, inventoryId: 10, price: 4.9, discountId: 3 },
            { name: 'Inka Cola', desc: 'Gaseosa Inka Cola sin azucar personal', image: 'files\\products\\gaseosaIncaCola.webp', categoryId: 3, inventoryId: 11, price: 4.9, discountId: 2 },
            { name: 'Fanta', desc: 'Gaseosa Fanta sin azucar personal', image: 'files\\products\\gaseosaFanta.webp', categoryId: 3, inventoryId: 12, price: 4.9, discountId: 1 },
            { name: 'Alitas', desc: 'Pack de 9 Alitas', image: 'files\\products\\alitas.webp', categoryId: 4, inventoryId: 13, price: 13.9, discountId: 1 },
            { name: 'Rolls de jamón y queso', desc: '6 Rolls de jamón & queso rociados con queso parmesano y tostados', image: 'files\\products\\rollJamonQueso.webp', categoryId: 4, inventoryId: 14, price: 15.9, discountId: 3 },
            { name: 'Pizza Roll Full Meat', desc: 'Pizza Roll sabor Full Meat', image: 'files\\products\\rollPizza.webp', categoryId: 4, inventoryId: 15, price: 14.9, discountId: 1 },
            { name: 'Pan al ajo especial', desc: 'Pack de pan al ajo especial x4', image: 'files\\products\\panAjo.webp', categoryId: 4, inventoryId: 16, price: 13.9, discountId: 1 }
        ]
    })

    // User management

    const newAdminTypes = await prisma.adminType.createMany({
        data: [
            { adminType: 'Administrador', permissions: 'Administrador del sistema' }
        ]
    })

    const newAdminUsers = await prisma.adminUser.createMany({
        data: [
            { username: 'administrador', password: await hashPassword('contraseña'), image: 'files\\adminUsers\\image.webp', firstName: 'Edisson', lastName: 'Galvez', typeId: 1 }
        ]
    })

    const newUsers = await prisma.user.createMany({
        data: [
            { username: 'administrador', password: await hashPassword('contraseña'), image: 'files\\users\\image.webp', firstName: 'Admin', lastName: 'Istrador', adminUser: true },
            { username: 'annelyon', password: await hashPassword('contraseña'), image: 'files\\users\\image.webp', firstName: 'Anne', lastName: 'Lyon' },
            { username: 'janesmith', password: await hashPassword('contraseña'), image: 'files\\users\\image.webp', firstName: 'Jane', lastName: 'Smith' },
            { username: 'michaeljones', password: await hashPassword('contraseña'), image: 'files\\users\\image.webp', firstName: 'Michael', lastName: 'Jones' },
            { username: 'emilywhite', password: await hashPassword('contraseña'), image: 'files\\users\\image.webp', firstName: 'Emily', lastName: 'White' }
        ]
    })

    const newUserAddresses = await prisma.userAddress.createMany({
        data: [
            { userId: 2, addressLine: '123 Main Street', city: 'Trujillo', postalCode: '12345', country: 'Perú', telephone: '123456789' },
            { userId: 3, addressLine: '456 Oak Avenue', city: 'Trujillo', postalCode: '54321', country: 'Perú', telephone: '987654321' },
            { userId: 4, addressLine: '789 Pine Street', city: 'Trujillo', postalCode: '67890', country: 'Perú', telephone: '201234567' },
            { userId: 5, addressLine: '101 Cedar Lane', city: 'Trujillo', postalCode: '11223', country: 'Perú', telephone: '298765432' },
        ]
    })

    // Shopping process

    const newPaymentTypes = await prisma.paymentType.createMany({
        data: [
            { paymentType: 'Yape', provider: 'BCP', accountNo: '123456789', expiry: '2023-12-31T23:59:59.999Z' },
            { paymentType: 'Plin', provider: 'Interbank', accountNo: '987654321', expiry: '2024-06-30T23:59:59.999Z' },
            { paymentType: 'Yape', provider: 'BCP', accountNo: '201234567', expiry: '2023-10-15T23:59:59.999Z' },
            { paymentType: 'Plin', provider: 'Interbank', accountNo: '298765432', expiry: '2025-03-01T23:59:59.999Z' },
        ]
    })

    const newPaymentStatuses = await prisma.paymentStatus.createMany({
        data: [
            { name: 'Recibido', desc: 'Pago a revisar' },
            { name: 'Rechazado', desc: 'Pago no cubre los gastos' },
            { name: 'Aceptado', desc: 'Pago completado' },
        ]
    })
}

main()
    .then(async () => {
        console.log('📝 Registros creados')
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })