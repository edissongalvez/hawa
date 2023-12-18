import express from 'express'

import * as paymentDetailService from '../services/paymentDetails'

const router = express.Router()

router.post('/', async (req, res) => {
    const {orderId, amount, provider, status} = req.body
    const paymentDetail = await paymentDetailService.createPaymentDetail(Number(orderId), Number(amount), provider, status)
    res.json(paymentDetail)
})

router.get('/', async (req, res) => {
    const paymentDetails = await paymentDetailService.getPaymentDetails()
    res.json(paymentDetails)
})

router.get('/:id', async (req, res) => {
    const paymentDetail = await paymentDetailService.getPaymentDetail(Number(req.params.id))
    res.json(paymentDetail)
})

router.put('/:id', async (req, res) => {
    const {orderId, amount, provider, status} = req.body
    const paymentDetail = await paymentDetailService.updatePaymentDetail(Number(req.params.id), Number(orderId), Number(amount), provider, status)
    res.json(paymentDetail)
})

router.delete('/:id', async (req, res) => {
    await paymentDetailService.deletePaymentDetail(Number(req.params.id))
    res.status(204).end()
})

export default router