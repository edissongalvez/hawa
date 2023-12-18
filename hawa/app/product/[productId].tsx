import { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Link, Stack, router, useLocalSearchParams } from 'expo-router'

import { Body, Box, Button, ScrollView, Separator, Text, TextField, Trailing, TrailingButton } from '../../components/Themed'
import ProductController, { Product } from '../../classes/product'
import Url from '../../constants/Url'
import { Confirm, Notify } from '../../components/Window'
import { useUser } from '../../context/UserContext'
import ShoppingSessionController, { ShoppingSession } from '../../classes/shoppingSession'
import CartItemController from '../../classes/cartItem'


export default function ProductScreen() {
    const { user } = useUser()
    const { productId } = useLocalSearchParams<{ productId: string }>()
    const [product, setProduct] = useState<Product>()
    const [shoppingSession, setShoppingSession] = useState<ShoppingSession>()

    const [quantity, setQuantity] = useState<number>(0)

    useEffect(() => {
        ProductController.getProduct(Number(productId)).then(product => setProduct(product))
        if (user) ShoppingSessionController.getShoppingSessionForUser(user.id).then(shoppingSession => setShoppingSession(shoppingSession))
    }, [product])

    const handleSubmit = async () => {
        try {
            if (product && user && product.inventory.quantity >= quantity) {
                if (!user.session) {
                    await ShoppingSessionController.createShoppingSession(Number(user.id), 0);
                }

                const productId = Number(product.id);

                if (shoppingSession) {
                    const existingCartItem = shoppingSession.cartItems.find(cartItem => cartItem.productId = productId);
          
                    if (existingCartItem) {
                        await CartItemController.updateCartItem(existingCartItem.id, shoppingSession.id, productId, existingCartItem.quantity + quantity)
                    } else {
                        await CartItemController.createCartItem(shoppingSession.id, productId, quantity)
                    }
                }
          
                await ProductController.updateProduct(
                    productId,
                    product.name,
                    product.desc,
                    product.image,
                    product.categoryId,
                    product.inventory.quantity - quantity,
                    product.price,
                    product.discountId
                )
          
                Notify({ title: 'Producto añadido al carrito', desc: 'Carrito actualizado' })
            } else {
                Notify({ title: 'Sin existencias disponibles', desc: 'Revise la cantidad' })
            }
        } catch (error) {
            Notify({ title: 'Error al añadir al carrito', desc: 'Intente nuevamente' })
            console.log(error)
        }
    }

    return product ? (
        <>
            <Stack.Screen options={{ title: 'Producto', presentation: 'formSheet', headerTitleAlign: 'center', headerRight: () => user?.adminUser ? <TrailingButton onPress={() => router.push(`/product/edit/${product.id}`)} label='Editar' /> : null }} /> 
            <Body>
                <ImageBackground source={product.image === '/files/undefined' ? require('../../assets/images/icon.png') : { uri: `${Url.api}/${product.image.replace(/\\/g, '/')}` } } resizeMode='cover' style={styles.imageBackground} imageStyle={styles.image}>
                    <View style={styles.card}>
                        <Text style={{color: 'white', fontSize: 13}}>{product.category.name.toUpperCase()}</Text>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>{product.name}</Text>
                        <Text secondary>{product.desc}</Text>
                    </View>
                </ImageBackground>
                <Box>
                    <View style={styles.item}>
                        <Text>Existencias</Text>
                        <Text secondary>{product.inventory.quantity}</Text>
                    </View>
                    <Separator />
                    <View style={styles.item}>
                        <Text>Precio</Text>
                        <Text secondary>{product.discount.active ? (product.price * (1 - product.discount.discountPercent)).toFixed(2) : Number(product.price).toFixed(2)} soles</Text>
                    </View>
                    <Separator />
                    <View style={styles.item}>
                        <Text>Descuento</Text>
                        {product.discount.active ? <Link href={`/discount/${product.discountId}`}><Text tint>{product.discount.name}</Text></Link> : <Text secondary>Ninguno</Text>}
                    </View>
                </Box>
                {user ? <Box>
                        <TextField placeholder='Cantidad' inputMode='numeric' value={quantity.toString()} onChangeText={value => setQuantity(Number(value))} />
                        <Button action='Comprar' onPress={handleSubmit} />
                    </Box> 
                : <Text style={styles.textNull} secondary>Para realizar compras, inicie sesión.</Text>}
            </Body>
        </> ) : (
            <Text>Cargando...</Text>
        )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      gap: 16
    },
    imageBackground: {
        borderRadius: 10,
        width: '100%',
        height: 260,
        justifyContent: 'flex-end'
    },
    image: {
        borderRadius: 16
    },
    card: {
        padding: 16,
        backgroundColor: 'linear-gradient(blue, pink)'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 44,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    bottom: {
        gap: 16,
        flexDirection: 'row'
    },
    textNull: {
        alignSelf: 'center'
    }
})