import express from 'express'

import * as shoppingSessionService from '../services/shoppingSession'

const router = express.Router()

router.post('/', async (req, res) => {
    const { userId } = req.body
    const shoppingSession = await shoppingSessionService.createShoppingSession(Number(userId))
    res.json(shoppingSession)
})

router.get('/', async (req, res) => {
    const shoppingSessions = await shoppingSessionService.getShoppingSessions()
    res.json(shoppingSessions)
})

//getShoppingSessionForUser
router.get('/getForUser', async (req, res) => {
    const { userId } = req.query
    const shoppingSession = await shoppingSessionService.getShoppingSessionForUser(Number(userId))
    res.json(shoppingSession)
})

router.get('/:id', async (req, res) => {
    const shoppingSession = await shoppingSessionService.getShoppingSession(Number(req.params.id))
    res.json(shoppingSession)
})

router.put('/:id', async (req, res) => {
    const {userId, total} = req.body
    const shoppingSession = await shoppingSessionService.updateShoppingSession(Number(req.params.id), Number(userId), Number(total))
    res.json(shoppingSession)
})

//incrementShoppingSessionTotal
router.put('/incrementTotal/:id', async (req, res) => {
    const { subtotal } = req.body
    const shoppingSession = await shoppingSessionService.incrementShoppingSessionTotal(Number(req.params.id), Number(subtotal))
    res.json(shoppingSession)
})

//decrementShoppingSessionTotal
router.put('/decrementTotal/:id', async (req, res) => {
    const { subtotal } = req.body
    const shoppingSession = await shoppingSessionService.decrementShoppingSessionTotal(Number(req.params.id), Number(subtotal))
    res.json(shoppingSession)
})

router.delete('/:id', async (req, res) => {
    await shoppingSessionService.deleteShoppingSession(Number(req.params.id))
    res.status(204).end()
})

export default router