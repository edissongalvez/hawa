import express from 'express'
import * as productInventoryService from '../services/productInventory'

const router = express.Router()

router.post('/', async (req, res) => {
    const {quantity} = req.body
    const productInventory = await productInventoryService.createProductInventory(quantity)
    res.json(productInventory)
})

router.get('/', async (req, res) => {
    const productInventories = await productInventoryService.getProductInventories()
    res.json(productInventories)
})

router.get(':id', async (req, res) => {
    const productInventory = await productInventoryService.getProductInventory(Number(req.params.id))
    res.json(productInventory)
})

router.put(':id', async (req, res) => {
    const {id, quantity} = req.body
    const productInventory = await productInventoryService.updateProductInventory(Number(req.params.id), quantity)
    res.json(productInventory)
})

router.delete(':id', async (req, res) => {
    await productInventoryService.deleteProductInventory(Number(req.params.id))
    res.status(204).end()
})

export default router