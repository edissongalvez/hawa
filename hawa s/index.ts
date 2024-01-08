import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'

import cartItem from './app/apis/cartItem'
import discount from './app/apis/discount'
import orderDetail from './app/apis/orderDetails'
import orderItem from './app/apis/orderItems'
import paymentDetail from './app/apis/paymentDetails'
import product from './app/apis/product'
import productCategory from './app/apis/productCategory'
import productInventory from './app/apis/productInventory'
import shoppingSession from './app/apis/shoppingSession'
import user from './app/apis/user'
import userAddress from './app/apis/userAddress'
import paymentType from './app/apis/paymentType'

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hawa S')
})

app.use('/cartItem', cartItem)
app.use('/discount', discount)
app.use('/orderDetail', orderDetail)
app.use('/orderItem', orderItem)
app.use('/paymentDetail', paymentDetail)
app.use('/product', product)
app.use('/productCategory', productCategory)
app.use('/productInventory', productInventory)
app.use('/shoppingSession', shoppingSession)
app.use('/user', user)
app.use('/userAddress', userAddress)
app.use('/paymentType', paymentType)

app.use('/files', express.static(path.join(__dirname, 'files')))

app.listen(8082, () => {
    console.log('🚀 Hawa S en puerto 8082')
})