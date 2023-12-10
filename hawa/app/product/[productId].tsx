import { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Link, router, useLocalSearchParams } from 'expo-router'

import { Body, Box, Button, ScrollView, Separator, Text } from '../../components/Themed'
import ProductController, { Product } from '../../classes/product'
import Url from '../../constants/Url'
import { Confirm, Notify } from '../../components/Window'


export default function ProductScreen() {
    const { productId } = useLocalSearchParams<{ productId: string }>()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        ProductController.getProduct(Number(productId)).then(product => setProduct(product))
    }, [])

    const handleDelete = (id: number) => {
        Confirm({ title: '¿Confirma eliminar el producto?', desc: 'Esta acción no se puede deshacer', action: () => {ProductController.deleteProduct(id), Notify({ title: 'Producto eliminado', desc: 'Orden actualizado' }), router.replace('/')} })
    }

    return (
        <Body>
            {product ? (
                <>
                    <ImageBackground source={product.image === '/files/undefined' ? require('../../assets/images/icon.png') : { uri: `${Url.api}/${product.image.replace(/\\/g, '/')}` } } resizeMode='cover' style={styles.imageBackground} imageStyle={styles.image}>
                        <View style={styles.card}>
                            <Text style={{color: 'white', fontSize: 13}}>{product.category.name.toUpperCase()}</Text>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>{product.name}</Text>
                            <Text secondary>{product.desc}</Text>
                        </View>
                    </ImageBackground>
                    <Box>
                        <View style={styles.item}>
                            <Text>Cantidad</Text>
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
                    <View style={styles.bottom}>  
                        <Button action='Eliminar' onPress={() => handleDelete(product.id)} secondary/>
                        <Button action='Editar' onPress={() => router.replace(`/product/edit/${product.id}`)}/>
                    </View>
                    
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
            
        </Body>
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
    }
})