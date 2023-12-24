import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Link, Stack, router, useLocalSearchParams } from 'expo-router'

import DiscountController, { Discount } from '../../classes/discount'
import { Body, Button, Text, TrailingButton } from '../../components/Themed'
import { useUser } from '../../context/UserContext'

export default function DiscountScreen() {
    const { user } = useUser()
    const { discountId } = useLocalSearchParams<{ discountId: string }>()
    const [discount, setDiscount] = useState<Discount>()

    useEffect(() => {
      DiscountController.getDiscount(Number(discountId)).then(discount => setDiscount(discount))
    }, [discountId])

    return discount ?
        <>
            <Stack.Screen options={{ title: 'Descuento', presentation: 'card', headerTitleAlign: 'center', headerRight: () => user?.adminUser ? <TrailingButton onPress={() => router.push(`/discount/edit/${discount.id}`)} label='Editar' /> : null }} />
            <Body>
                        {/* { discount.id != 1 ? 
                            <Link style={{ textAlign: 'right' }} href={`/discount/edit/${discount.id}`}>
                                <Text tint>Editar</Text>
                            </Link> 
                        : null } */}
                <View>
                    <Text style={styles.title}>{ discount.name }</Text>
                    <Text style={styles.desc} secondary>{ discount.desc }</Text>
                </View>
                { discount.products.length > 0 ? discount.products.map(product => (
                    <View style={styles.itemContent} key={product.id}>
                        <View style={styles.item}>
                            <Image source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${product.image.replace(/\\/g, '/')}` }} style={discount.active ? styles.image : styles.imageFilter} />
                            <View>
                                <Text secondary>{ product.categoryId }</Text>
                                <Text>{ product.name }</Text>
                            </View>
                        </View>
                        
                        <Button tertiary action={ `S/. ${ discount.active ? (product.price * (1 - discount.discountPercent)).toFixed(2) : Number(product.price).toFixed(2)}` } onPress={() => router.replace(`/product/${product.id}`)} />
                    </View>
                )) : <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}><Text tertiary>Sin productos</Text></View> }
            </Body>
        </>
    : <Text tertiary>Cargando...</Text> 
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16
    },
    desc: {
        textAlign: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 10
    },
    imageFilter: {
        height: 48,
        width: 48,
        borderRadius: 10,
        filter: 'grayscale(100%)'
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        gap: 8
    }
})