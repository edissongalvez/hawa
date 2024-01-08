import express from 'express'
import * as userPaymentService from '../services/paymentType'

const router = express.Router()

router.post('/', async (req, res) => {
    const { paymentType, provider, accountNo, expiry } = req.body
    const userPayment = await userPaymentService.createPaymentType(paymentType, provider, accountNo, expiry)
    res.json(userPayment)
})

router.get('/', async (req, res) => {
    const userPayments = await userPaymentService.getPaymentTypes()
    res.json(userPayments)
})

router.get('/:id', async (req, res) => {
    const userPayment = await userPaymentService.getPaymentType(Number(req.params.id))
    res.json(userPayment)
})

router.put('/:id', async (req, res) => {
    const { paymentType, provider, accountNo, expiry} = req.body
    const userPayment = await userPaymentService.updatePaymentType(Number(req.params.id), paymentType, provider, accountNo, expiry)
    res.json(userPayment)
})

router.delete('/:id', async (req, res) => {
    await userPaymentService.deletePaymentType(Number(req.params.id))
    res.status(204).end()
})

export default router