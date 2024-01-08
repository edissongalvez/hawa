import { useEffect, useState } from 'react'
import OrderDetailController, { OrderDetail } from '../classes/orderDetail'
import { useUser } from '../context/UserContext'
import { Body, Text, View } from '../components/Themed'
import { Image, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Notify } from '../components/Window'

export default function OrderDetailScreen() {
    const { user } = useUser()

    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>()
    
    useEffect(() => {
        // OrderDetailController.getOrderDetails().then(orderDetails => setOrderDetails(orderDetails))
        const fetchData = async () => {
            try {
              const fetchedOrderDetails = await OrderDetailController.getOrderDetails()
        
              if (!user?.adminUser) {
                const filteredOrderDetails = fetchedOrderDetails.filter(
                  (orderDetail) => orderDetail.userId === user?.id
                )
                setOrderDetails(filteredOrderDetails)
              } else {
                setOrderDetails(fetchedOrderDetails)
              }
            } catch (error) {
              Notify({ title: 'Error de servidor', desc: 'Intente nuevamente más tarde' })
            }
          }
        
          fetchData()
    }, [])

    return orderDetails ?
        <>
            <Stack.Screen options={{ title: 'Historial de ordenes', presentation: 'card', headerTitleAlign: 'center' }} />
            <Body>
                {orderDetails.map(orderDetail => (
                    <View key={orderDetail.id} lightColor='#FFFFFF' darkColor='#1C1C1E' style={styles.container}>
                        <View style={styles.item}>
                            <Text tint style={styles.title}>S/. {orderDetail.total}</Text>
                            <Text secondary>{new Date(orderDetail.createdAt).toLocaleDateString()}</Text>
                            {orderDetail.orderItems.map(orderItem => (
                                <Text key={orderItem.id}>{orderItem.product.name} · {orderItem.quantity}</Text>
                            ))}
                        </View>
                        <View style={styles.item}>
                            <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${orderDetail.payment.voucher.replace(/\\/g, '/')}` }} style={styles.image} />
                            <Text>{orderDetail.payment.status.name}</Text>
                            <Text secondary>{orderDetail.payment.type.provider}</Text>
                        </View>
                    </View>
                ))}
            </Body>
        </>
    :
        <Body center>
            <Text style={{alignSelf: 'center'}} secondary>Sin historial de compras</Text>
        </Body>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 28
    },
    image: {
        height: 128,
        width: 64,
        borderRadius: 26
    }
})