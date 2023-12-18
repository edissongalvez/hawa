import express from 'express'

import * as orderItemService from '../services/orderItems'

const router = express.Router()

router.post('/', async (req, res) => {
    const {orderId, productId, quantity} = req.body
    const orderItem = await orderItemService.createOrderItem(Number(orderId), Number(productId), Number(quantity))
    res.json(orderItem)
})

router.get('/', async (req, res) => {
    const orderItems = await orderItemService.getOrderItems()
    res.json(orderItems)
})

router.get('/:id', async (req, res) => {
    const orderItem = await orderItemService.getOrderItem(Number(req.params.id))
    res.json(orderItem)
})

router.put('/:id', async (req, res) => {
    const {orderId, productId, quantity} = req.body
    const orderItem = await orderItemService.updateOrderItem(Number(req.params.id), Number(orderId), Number(productId), Number(quantity))
    res.json(orderItem)
})

router.delete('/:id', async (req, res) => {
    await orderItemService.deleteOrderItem(Number(req.params.id))
    res.status(204).end()
})

export default router