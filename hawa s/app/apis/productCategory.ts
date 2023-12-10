import express from 'express'
import * as productCategoryService from '../services/productCategory'

const router = express.Router()

router.post('/', async (req, res) => {
    const {name, desc} = req.body
    const productCategory = await productCategoryService.createProductCategory(name, desc)
    res.json(productCategory)
})

router.get('/', async (req, res) => {
    const productCategories = await productCategoryService.getProductCategories()
    res.json(productCategories)
})

router.get('/:id', async (req, res) => {
    const productCategory = await productCategoryService.getProductCategory(Number(req.params.id))
    res.json(productCategory)
})

router.put('/:id', async (req, res) => {
    const {id, name, desc} = req.body
    const productCategory = await productCategoryService.updateProductCategory(Number(req.params.id), name, desc)
    res.json(productCategory)
})

router.delete('/:id', async (req, res) => {
    await productCategoryService.deleteProductCategory(Number(req.params.id))
    res.status(204).end()
})

export default router