import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Body, Button, Icon, Separator, Text } from '../../components/Themed'
import ShoppingSessionController, { ShoppingSession } from '../../classes/shoppingSession'
import { useUser } from '../../context/UserContext'
import { Notify } from '../../components/Window'
import CartItemController from '../../classes/cartItem'
import { Ionicons } from '@expo/vector-icons'

export default function TabThreeScreen() {
    const { user, setUser } = useUser()
    const sessionRef = useRef(user?.session)

    const [shoppingSession, setShoppingSession] = useState<ShoppingSession>()

    useEffect(() => {
        if (user) {
            ShoppingSessionController.getShoppingSessionForUser(user.id).then(session => {
                if (session ! == sessionRef.current) {
                    setUser({ ...user, session })
                    sessionRef.current = session
                }    
            })
        }
    }, [])

    const handleSubmit = async (id: number) => {
        try {
            if (user) {
                CartItemController.deleteCartItem(id)
                Notify({ title: 'Quitado del carrito', desc: 'Carrito actualizado' })

                const updatedSession = await ShoppingSessionController.getShoppingSessionForUser(user.id)
                setUser({ ...user, session: updatedSession })
            } else {
                Notify({ title: 'Sin usuario', desc: 'Inicie sesión para realizar compras' })
            }
            
        } catch (error) {
            Notify({ title: 'Error al quitar elemento', desc: 'Intente nuevamente' })
        }
    }

    return user && user.session && user.session.cartItems ?
        <Body>
            <Text style={styles.total}>S/. {user.session.total}</Text>
            { user.session.cartItems.map(cartItem => (
                <View style={styles.content} key={cartItem.id}>
                    <Image style={styles.image} source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${cartItem.product.image.replace(/\\/g, '/')}` }} />
                    <View style={styles.desc}>
                        <Text>{cartItem.product.name}</Text>
                        <Text style={styles.textSecondary} secondary>Precio unitario: S/. {(cartItem.product.price * ( 1 - cartItem.product.discount.discountPercent)).toFixed(2)}</Text>
                        <Text style={styles.textSecondary} secondary>Cantidad: {cartItem.quantity}</Text>
                        <Text style={styles.textSecondary} secondary>Subtotal: S/. {(cartItem.product.price * ( 1 - cartItem.product.discount.discountPercent) * cartItem.quantity).toFixed(2)}</Text>
                    </View>
                    <Button action='Quitar' onPress={() => handleSubmit(cartItem.id)} tertiary />
                </View>
            )) }
        </Body>
    :
        <Body center>
            <Icon secondary name='cart-outline' />
            <Text secondary style={{ alignSelf: 'center' }}>Sin productos</Text>
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