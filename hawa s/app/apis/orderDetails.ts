import express from 'express'
import multer from 'multer'
import fs from 'fs'

import * as orderDetailService from '../services/orderDetails'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/vouchers/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/', async (req, res) => {
    const {userId, total} = req.body
    const orderDetail = await orderDetailService.createOrderDetail(Number(userId), Number(total))
    res.json(orderDetail)
})

router.post('/transferCartToOrder', upload.single('voucher'), async (req, res) => {
    if (req.file) {
        const { userId, paymentTypeId } = req.body
        const voucherPath = req.file.path
        const orderDetail = await orderDetailService.transferCartToOrder(Number(userId), Number(paymentTypeId), voucherPath)
        res.json(orderDetail)
    }
})

router.get('/', async (req, res) => {
    const orderDetails = await orderDetailService.getOrderDetails()
    res.json(orderDetails)
})

router.get('/:id', async (req, res) => {
    const orderDetail = await orderDetailService.getOrderDetail(Number(req.params.id))
    res.json(orderDetail)
})

router.put('/:id', async (req, res) => {
    const {userId, total, paymentId} = req.body
    const orderDetail = await orderDetailService.updateOrderDetail(Number(req.params.id), Number(userId), Number(total), Number(paymentId))
    res.json(orderDetail)
})

router.delete('/:id', async (req, res) => {
    await orderDetailService.deleteOrderDetail(Number(req.params.id))
    res.status(204).end()
})

export default router