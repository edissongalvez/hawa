import express from 'express'
import multer from 'multer'
import fs from 'fs'

import * as productService from '../services/product'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
    if (req.file) {
        const {name, desc, categoryId, quantity, price, discountId} = req.body
        const imagePath = req.file.path
        const product = await productService.createProduct(name, desc, imagePath, categoryId, quantity, price, discountId)
        res.json(product)
    }
})

router.get('/', async (req, res) => {
    const products = await productService.getProducts()
    res.json(products)
})

router.get('/:id', async (req, res) => {
    const product = await productService.getProduct(Number(req.params.id))
    res.json(product)
})

router.put('/:id', upload.single('image'), async (req, res) => {
    const {id, name, desc, categoryId, quantity, price, discountId} = req.body

    const prevProduct = await productService.getProduct(id)
    if (!prevProduct) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }
    let imagePath = prevProduct.image
    if (req.file) {
        if (fs.existsSync(prevProduct.image)) {
            fs.unlinkSync(prevProduct.image)
        }
        imagePath = req.file.path
    }

    const product = await productService.updateProduct(id, name, desc, imagePath, categoryId, quantity, price, discountId)
    res.json(product)

})

router.delete('/:id', async (req, res) => {
    const prevProduct = await productService.getProduct(Number(req.params.id))
    if (prevProduct?.image) {
        fs.unlinkSync(prevProduct.image)
    }
    await productService.deleteProduct(Number(req.params.id))
    res.status(204).end()
})

export default router