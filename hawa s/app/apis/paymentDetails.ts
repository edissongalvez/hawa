import express from 'express'
import multer from 'multer'
import fs from 'fs'

import * as paymentDetailService from '../services/paymentDetails'

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

router.post('/', upload.single('voucher'), async (req, res) => {
    if (req.file) {
        const {orderId, provider, status} = req.body
        const voucherPath = req.file.path
        const paymentDetail = await paymentDetailService.createPaymentDetail(Number(orderId), voucherPath, provider, status)
        res.json(paymentDetail)
    }
})

router.get('/', async (req, res) => {
    const paymentDetails = await paymentDetailService.getPaymentDetails()
    res.json(paymentDetails)
})

router.get('/:id', async (req, res) => {
    const paymentDetail = await paymentDetailService.getPaymentDetail(Number(req.params.id))
    res.json(paymentDetail)
})

router.put('/:id', upload.single('voucher'), async (req, res) => {
    const {orderId, provider, status} = req.body

    const prevPaymentDetail = await paymentDetailService.getPaymentDetail(Number(req.params.id))
    if (!prevPaymentDetail) {
        return res.status(404).json({ error: 'Pago no encontrado' })
    }
    let voucherPath = prevPaymentDetail.voucher ?? ''
    if (req.file) {
        if (voucherPath && fs.existsSync(voucherPath)) {
            fs.unlinkSync(voucherPath)
        }
        voucherPath = req.file.path
    }

    const paymentDetail = await paymentDetailService.updatePaymentDetail(Number(req.params.id), Number(orderId), voucherPath, provider, status)
    res.json(paymentDetail)
})

router.put('/updatePaymentDetailStatus/:id', async (req, res) => {
    const { statusId } = req.body
    const paymentDetail = await paymentDetailService.updatePaymentDetailStatus(Number(req.params.id), Number(statusId))
    res.json(paymentDetail)
})

router.delete('/:id', async (req, res) => {
    await paymentDetailService.deletePaymentDetail(Number(req.params.id))
    res.status(204).end()
})

export default router