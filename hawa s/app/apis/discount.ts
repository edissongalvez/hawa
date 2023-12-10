import express from 'express'
import * as discountService from '../services/discount'
import { Product } from '@prisma/client'

const router = express.Router()

router.post('/', async (req, res) => {
    const {name, desc, discountPercent, active, products} = req.body

    const sanitizedProducts = products.map((product: Product & { checked: boolean }) => {
        const { checked, ...sanitizedProduct } = product
        return sanitizedProduct
    })

    const discount = await discountService.createDiscount(name, desc, discountPercent, active, sanitizedProducts)
    res.json(discount)
})

router.get('/', async (req, res) => {
    const discounts = await discountService.getDiscounts()
    res.json(discounts)
})

router.get('/:id', async (req, res) => {
    const discount = await discountService.getDiscount(Number(req.params.id))
    res.json(discount)
})

router.put('/:id', async (req, res) => {
    const {id, name, desc, discountPercent, active, products} = req.body

    const discount = await discountService.updateDiscount(Number(req.params.id), name, desc, discountPercent, active, products)
    res.json(discount)
})

router.delete('/:id', async (req, res) => {
    await discountService.deleteDiscount(Number(req.params.id))
    res.status(204).end()
})

export default router