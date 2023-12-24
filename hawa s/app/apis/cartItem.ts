import express from 'express'

import * as cartItemService from '../services/cartItem'

const router = express.Router()

router.post('/', async (req, res) => {
    const {sessionId, productId, quantity} = req.body
    const cartItem = await cartItemService.createCartItem(Number(sessionId), Number(productId), Number(quantity))
    res.json(cartItem)
})

router.get('/', async (req, res) => {
    const cartItems = await cartItemService.getCartItems()
    res.json(cartItems)
})

router.get('/:id', async (req, res) => {
    const cartItem = await cartItemService.getCartItem(Number(req.params.id))
    res.json(cartItem)
})

// getCartItemForSessionAndProduct
router.get('/getForSessionAndProduct', async (req, res) => {
    const { sessionId, productId } = req.body
    const cartItem = await cartItemService.getCartItemForSessionAndProduct(Number(sessionId), Number(productId))
    res.json(cartItem)
})

router.put('/:id', async (req, res) => {
    const {sessionId, productId, quantity} = req.body
    const cartItem = await cartItemService.updateCartItem(Number(req.params.id), Number(sessionId), Number(productId), Number(quantity))
    res.json(cartItem)
})

//incrementCartItemQuantity
router.put('/incrementQuantity/:id', async (req, res) => {
    const { quantity } = req.body
    const cartItem = await cartItemService.incrementCartItemQuantity(Number(req.params.id), Number(quantity))
    res.json(cartItem)
})

//decrementCartItemQuantity
router.put('/decrementQuantity/:id', async (req, res) => {
    const { quantity } = req.body
    const cartItem = await cartItemService.decrementCartItemQuantity(Number(req.params.id), Number(quantity))
    res.json(cartItem)
})

router.delete('/:id', async (req, res) => {
    await cartItemService.deleteCartItem(Number(req.params.id))
    res.status(204).end()
})

export default router