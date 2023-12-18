import express from 'express'

import * as shoppingSessionService from '../services/shoppingSession'

const router = express.Router()

router.post('/', async (req, res) => {
    const {userId, total} = req.body
    const shoppingSession = await shoppingSessionService.createShoppingSession(Number(userId), Number(total))
    res.json(shoppingSession)
})

router.get('/', async (req, res) => {
    const shoppingSessions = await shoppingSessionService.getShoppingSessions()
    res.json(shoppingSessions)
})

router.get('/:id', async (req, res) => {
    const shoppingSession = await shoppingSessionService.getShoppingSession(Number(req.params.id))
    res.json(shoppingSession)
})

router.get('/getShoppingSession/:id', async (req, res) => {
    const shoppingSession = await shoppingSessionService.getShoppingSessionForUser(Number(req.params.id))
    res.json(shoppingSession)
})

router.put('/:id', async (req, res) => {
    const {userId, total} = req.body
    const shoppingSession = await shoppingSessionService.updateShoppingSession(Number(req.params.id), Number(userId), Number(total))
    res.json(shoppingSession)
})

router.delete('/:id', async (req, res) => {
    await shoppingSessionService.deleteShoppingSession(Number(req.params.id))
    res.status(204).end()
})

export default router