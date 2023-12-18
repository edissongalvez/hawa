import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Body, Button, Separator, Text } from '../../components/Themed'
import ShoppingSessionController, { ShoppingSession } from '../../classes/shoppingSession'
import { useUser } from '../../context/UserContext'
import { Notify } from '../../components/Window'
import CartItemController from '../../classes/cartItem'
import ProductController from '../../classes/product'
import Url from '../../constants/Url'

export default function TabThreeScreen() {
    const { user } = useUser()

    const [shoppingSession, setShoppingSession] = useState<ShoppingSession>()
    const [total, setTotal] = useState<number>(0)

    const handleTotal = () => {
        if (shoppingSession && shoppingSession.cartItems) {
            const sumaDePrecios = shoppingSession.cartItems.reduce((acumulador, cartItem) => acumulador + (cartItem.product.price * cartItem.productId * (1 - cartItem.product.discount.discountPercent)), 0)
            setTotal(sumaDePrecios)
        }
    }

    useEffect(() => {
        if (user) {
            ShoppingSessionController.getShoppingSessionForUser(user.id).then(session => setShoppingSession(session))
            handleTotal()
        }
    }, [user, shoppingSession])

    const handleSubmit = async (id: number) => {
        try {
            const cartItem = await CartItemController.getCartItem(id)
            ProductController.updateProduct(cartItem.productId, cartItem.product.name, cartItem.product.desc, cartItem.product.image, cartItem.product.categoryId, cartItem.product.inventory.quantity + cartItem.quantity, cartItem.product.price, cartItem.product.discountId)
            CartItemController.deleteCartItem(cartItem.id)
            Notify({ title: 'Elemento quitado', desc: 'Carrito actualizado' })
        } catch (error) {
            Notify({ title: 'Error al quitar elemento', desc: 'Intente nuevamente' })
        }
    }

    return shoppingSession && shoppingSession.cartItems ?
        <Body>
            <Text style={styles.total}>S/. {total.toString()}</Text>
            { shoppingSession.cartItems.map(cartItem => (
                <View style={styles.content} key={cartItem.id}>
                    <Image style={styles.image} source={{ uri: `${Url.api}/${cartItem.product.image.replace(/\\/g, '/')}` }} />
                    <View style={styles.desc}>
                        <Text>{cartItem.product.name}</Text>
                        <Text style={styles.textSecondary} secondary>Precio unitario: {cartItem.product.price * ( 1 - cartItem.product.discount.discountPercent)}</Text>
                        <Text style={styles.textSecondary} secondary>Cantidad: {cartItem.quantity}</Text>
                        <Text style={styles.textSecondary} secondary>Subtotal: {cartItem.product.price * ( 1 - cartItem.product.discount.discountPercent) * cartItem.quantity}</Text>
                    </View>
                    <Button action='Quitar' onPress={() => handleSubmit(cartItem.id)} tertiary />
                </View>
            )) }
        </Body>
    :
        <Body center>
            <Text secondary style={{ alignSelf: 'center' }}>Sin elementos</Text>
        </Body>
}

const styles = StyleSheet.create({
    total: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    content: {
        flexDirection: 'row',
        gap: 16,
        width: '100%'
    },
    desc: {
        flexGrow: 1
    },
    textSecondary: {
        fontSize: 15
    }
})