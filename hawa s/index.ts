import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'

import discount from './app/apis/discount'
import product from './app/apis/product'
import productCategory from './app/apis/productCategory'
import productInventory from './app/apis/productInventory'
import user from './app/apis/user'
import userAddress from './app/apis/userAddress'
import userPayment from './app/apis/userPayment'

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hawa S')
})

app.use('/discount', discount)
app.use('/product', product)
app.use('/productCategory', productCategory)
app.use('/productInventory', productInventory)
app.use('/user', user)
app.use('/userAddress', userAddress)
app.use('/userPayment', userPayment)

app.use('/files', express.static(path.join(__dirname, 'files')))

app.listen(8082, () => {
    console.log('🚀 Hawa S en puerto 8082')
})