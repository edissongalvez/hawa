import { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Link, Stack, router, useLocalSearchParams } from 'expo-router'

import { Body, Box, Button, Icon, Separator, Text, TextField, TrailingButton } from '../../components/Themed'
import ProductController, { Product } from '../../classes/product'
import { Confirm, Notify } from '../../components/Window'
import { useUser } from '../../context/UserContext'
import ShoppingSessionController, { ShoppingSession } from '../../classes/shoppingSession'
import CartItemController from '../../classes/cartItem'

export default function ProductScreen() {
    const { user, setUser } = useUser()
    const { productId } = useLocalSearchParams<{ productId: string }>()
    const [product, setProduct] = useState<Product>()

    const [quantity, setQuantity] = useState<number>(0)

    useEffect(() => {
        ProductController.getProduct(Number(productId)).then(product => setProduct(product))
    }, [user, productId])

    const handleSubmit = async () => {
        try {
            if (user && quantity > 0) {
                let createdSession = user.session
                if (!createdSession) {
                    createdSession = await ShoppingSessionController.createShoppingSession(user.id)
                    setUser({...user, session: createdSession})
                }
                await CartItemController.createCartItem(createdSession.id, Number(productId), quantity)
                // Notify({ title: 'Añadido al carrito', desc: 'Carrito actualizado' })

                Confirm({ title: 'Añadido al carrito', desc: 'Carrito actualizado. ¿Ver carrito?', action: () => router.replace('/cart') })

                const updatedSession = await ShoppingSessionController.getShoppingSessionForUser(user.id)
                setUser({ ...user, session: updatedSession })
            }
        } catch (error) {
            Notify({ title: 'Error al añadir al carrito', desc: 'Intente nuevamente' })
        }
    }

    return product ? (
        <>
            <Stack.Screen options={{ title: 'Producto', presentation: 'formSheet', headerTitleAlign: 'center', headerRight: () => user?.adminUser ? <TrailingButton onPress={() => router.push(`/product/edit/${product.id}`)} label='Editar' /> : null }} /> 
            <Body>
                <ImageBackground source={product.image === '/files/undefined' ? require('../../assets/images/icon.png') : { uri: `${process.env.EXPO_PUBLIC_API_URL}/${product.image.replace(/\\/g, '/')}` } } resizeMode='cover' style={styles.imageBackground} imageStyle={styles.image}>
                </ImageBackground>
                <View style={styles.card}>
                    <Text style={{fontSize: 13}}>{product.category.name.toUpperCase()}</Text>
                    <Text style={{fontWeight: 'bold'}}>{product.name}</Text>
                    <Text secondary>{product.desc}</Text>
                </View>
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
                        <Button action='Agregar al carrito' onPress={handleSubmit} />
                    </Box> 
                : <>
                    <Icon name='person-circle-outline' />
                    <Text style={styles.textNull}>Para realizar compras, <Link href={'/user/login'}><Text tint>inicie sesión</Text></Link>.</Text>
                </>}
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