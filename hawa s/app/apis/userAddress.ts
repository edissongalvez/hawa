import express from 'express'
import * as userAddressService from '../services/userAddress'

const router = express.Router()

router.post('/', async (req, res) => {
    const {userId, addressLine, city, postalCode, country, telephone} = req.body
    const userAddress = await userAddressService.createUserAddress(userId, addressLine, city, postalCode, country, telephone)
    res.json(userAddress)
})

router.get('/', async (req, res) => {
    const userAddresses = await userAddressService.getUserAddresses()
    res.json(userAddresses)
})

router.get('/:id', async (req, res) => {
    const userAddress = await userAddressService.getUserAddress(Number(req.params.id))
    res.json(userAddress)
})

router.put('/:id', async (req, res) => {
    const { userId, addressLine, city, postalCode, country, telephone } = req.body
    const userAddress = await userAddressService.updateUserAddress(Number(req.params.id), userId, addressLine, city, postalCode, country, telephone)
    res.json(userAddress)
})

router.delete('/:id', async (req, res) => {
    await userAddressService.deleteUserAddress(Number(req.params.id))
    res.status(204).end()
})

export default router