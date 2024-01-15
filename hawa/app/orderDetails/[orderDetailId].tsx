import { Stack, useLocalSearchParams } from 'expo-router'
import OrderDetailController, { OrderDetail } from '../../classes/orderDetail'
import { useEffect, useState } from 'react'
import { Body, Box, Text, Trailing, TrailingButton } from '../../components/Themed'
import { Image, StyleSheet, View } from 'react-native'
import PaymentDetailController from '../../classes/paymentDetail'
import { Notify } from '../../components/Window'
import { useUser } from '../../context/UserContext'

export default function OrderDetailScreen() {
    const {user} = useUser()
    const { orderDetailId } = useLocalSearchParams<{ orderDetailId: string }>()
    const [orderDetail, setOrderDetail] = useState<OrderDetail>()

    useEffect(() => {
        OrderDetailController.getOrderDetail(Number(orderDetailId)).then(orderDetail => setOrderDetail(orderDetail))
    }, [orderDetailId])

    const handleSubmit = async () => {
        try {
            if (orderDetail?.payment)
                PaymentDetailController.updatePaymentDetailStatus(orderDetail.payment.id, 3)
            else
                Notify({ title: 'Error al aceptar pago', desc: 'Intente nuevamente más tarde' })
        } catch (error) {
            Notify({ title: 'Error al aceptar pago', desc: 'Intente nuevamente más tarde' })
        }
    }

    const handleDecline = async () => {
        try {
            if (orderDetail?.payment)
                PaymentDetailController.updatePaymentDetailStatus(orderDetail.payment.id, 2)
            else
                Notify({ title: 'Error al aceptar pago', desc: 'Intente nuevamente más tarde' })
        } catch (error) {
            Notify({ title: 'Error al aceptar pago', desc: 'Intente nuevamente más tarde' })
        }
    }

    return orderDetail ?
        <>
            <Stack.Screen options={{ title: 'Detalles de orden', presentation: 'card', headerTitleAlign: 'center', headerRight: () => { return orderDetail.payment.statusId === 1 && user?.adminUser ? <Trailing> <TrailingButton onPress={handleDecline} label='Rechazar' /> <TrailingButton onPress={handleSubmit} label='Aceptar' /> </Trailing> : null} }}/>
            <Body>
                <Text>Total: {Number(orderDetail.total).toFixed(2)}</Text>
                <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${orderDetail.payment.voucher.replace(/\\/g, '/')}` }} style={styles.image} />
                <Box header='CLIENTE'>
                    <View style={styles.item}>
                        <Text >Nombre</Text>
                        <Text secondary>{orderDetail.user.firstName} {orderDetail.user.lastName}</Text>
                    </View>
                    
                        { orderDetail.user.addresses.map(address => (
                            <View key={address.id}>
                                <View style={styles.item}>
                                    <Text >Dirección</Text>
                                    <Text secondary>{address.addressLine}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text>Ciudad</Text>
                                    <Text secondary>{address.city}</Text>
                                </View>
                                <View style={styles.item}>
                                    <Text>Teléfono</Text>
                                    <Text secondary>{address.telephone}</Text>
                                </View>
                            </View>
                            
                        )
                        )
                        }
                        
                    
                </Box>
                <Box header='PRODUCTOS'>
                    {orderDetail.orderItems.map(orderItem => (
                        <View style={styles.item} key={orderItem.id}>
                            <Text >{orderItem.product.name}</Text>
                            <Text secondary>{orderItem.quantity}</Text>
                        </View>
                    ))}
                </Box>
                
            </Body>
        </>
    : <Text tertiary>Cargando...</Text> 
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 44,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    title: {
        fontSize: 28
    },
    image: {
        height: 256,
        width: 128,
        borderRadius: 26
    }
})