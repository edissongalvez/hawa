import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const login = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { username }, include: { addresses: true, session: { include: { cartItems: { include: { product: { include: { discount: true } } } } } } } })

    if (user && bcrypt.compareSync(password, user.password)) {
        return user
    }
}

export const createUser = async (username: string, password: string, image: string, firstName: string, lastName: string) => {
    const hashedPassword = bcrypt.hashSync(password, 10)

    return await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            image: image,
            firstName: firstName,
            lastName: lastName
        }
    })
}

export const getUsers = async () => {
    return await prisma.user.findMany({
        include: {
            addresses: true,
            session: true
        }
    })
}

export const getUser = async (id: number) => {
    return await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            addresses: true,
            session: true
        }
    })
}

export const updateUser = async (id: number, username: string, password: string, image: string, firstName: string, lastName: string) => {
    return await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            username: username,
            password: password,
            image: image,
            firstName: firstName,
            lastName: lastName
        }
    })
}

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
}