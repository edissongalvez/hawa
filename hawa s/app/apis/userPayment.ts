import express from 'express'
import * as userPaymentService from '../services/userPayment'

const router = express.Router()

router.post('/', async (req, res) => {
    const {userId, paymentType, provider, accountNo, expiry} = req.body
    const userPayment = await userPaymentService.createUserPayment(userId, paymentType, provider, accountNo, expiry)
    res.json(userPayment)
})

router.get('/', async (req, res) => {
    const userPayments = await userPaymentService.getUserPayments()
    res.json(userPayments)
})

router.get('/:id', async (req, res) => {
    const userPayment = await userPaymentService.getUserPayment(Number(req.params.id))
    res.json(userPayment)
})

router.put('/:id', async (req, res) => {
    const {id, userId, paymentType, provider, accountNo, expiry} = req.body
    const userPayment = await userPaymentService.updateUserPayment(Number(req.params.id), userId, paymentType, provider, accountNo, expiry)
    res.json(userPayment)
})

router.delete('/:id', async (req, res) => {
    await userPaymentService.deleteUserPayment(Number(req.params.id))
    res.status(204).end()
})

export default router