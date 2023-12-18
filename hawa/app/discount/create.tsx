import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Body, Box, Button, Picker, PickerItem, ScrollView, Separator, Text, TextField, Toggle, TrailingButton } from '../../components/Themed'
import ProductController, { Product } from '../../classes/product'
import { Notify } from '../../components/Window'
import DiscountController from '../../classes/discount'
import Url from '../../constants/Url'
import { Stack, router } from 'expo-router'

export default function CreateDiscountScreen() {
    const [products, setProducts] = useState<(Product & { checked?: boolean })[]>([])
    const [data, setData] = useState({
        name: '',
        desc: '',
        discountPercent: 0,
        active: false
    })

    useEffect(() => {
        ProductController.getProducts().then(products => {
            const productsChecked = products.map(product => ({ ...product, checked: false }))
            setProducts(productsChecked)
        })
    }, [])

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: string) => {
        setData(prevData => ({
          ...prevData, [field]: isNumber ? Number(value) : value
        }))
    }

    const handleToggleChange = (productId: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, checked: !product.checked } : product    
            )    
        )
    }

    const handleSubmit = async () => {
        const selectedProducts = products.filter(product => product.checked)

        try {
            DiscountController.createDiscount(data.name, data.desc, data.discountPercent, data.active, selectedProducts)
            router.replace('/offers')
            Notify({ title: 'Descuento guardado', desc: 'Descuentos actualizados' })
        } catch (error) {
            Notify({ title: 'Descuento no guardado', desc: 'Revise los datos' })
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Crear descuento', presentation: 'formSheet', headerTitleAlign: 'center', headerRight: () => <TrailingButton onPress={handleSubmit} label='Guardar' /> }} />
            <Body>
                <Box header='DESCUENTO' footer='Recopila información clave sobre el descuento creado.'>
                    <TextField placeholder='Ingrese nombre' value={data.name} onChangeText={handleChange('name')} />
                    <Separator />
                    <TextField placeholder='Ingrese descripción' value={data.desc} onChangeText={handleChange('desc')} />
                    <Separator />
                    <TextField placeholder='Ingrese porcentaje de descuento' inputMode='decimal' value={data.discountPercent.toString()} onChangeText={handleChange('discountPercent')} />
                    <Separator />
                    <Picker selectedValue={data.active} onValueChange={selectedValue => setData(prevData => ({ ...prevData, active: selectedValue as boolean }))}>
                        <PickerItem label='Inactivo' value={false} />
                        <PickerItem label='Activo' value={true} />
                    </Picker>
                </Box>
                <Box header='PRODUCTOS' footer='Aplique el descuento en los productos seleccionados. Si el producto ya tiene un descuento, se reemplazará con el nuevo descuento a aplicar.'>
                    {products ? products.map(product => (
                        <View key={product.id}>
                            <View style={styles.listItem}>
                                <View style={styles.itemProd}>
                                    <Image style={styles.image} source={{ uri: `${Url.api}/${product.image.replace(/\\/g, '/')}` }} />
                                    <View>
                                        <Text>{product.name}</Text>
                                        {product.discountId > 1 ? <Text style={styles.desc} tint>Con descuento</Text> : <Text style={styles.desc} secondary>Sin descuento</Text>}
                                    </View>
                                    
                                </View>
                                <Toggle value={product.checked} onValueChange={() => handleToggleChange(product.id)}  />
                            </View>
                            <Separator />
                        </View>
                    )) : <Text>Cargando...</Text>}
                </Box>
                {/* <Button action='Guardar' onPress={handleSubmit}/> */}
            </Body>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      gap: 16
    },
    listItem: {
        paddingHorizontal: 16,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemProd: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center'
    },
    image: {
        height: 28,
        width: 28,
        borderRadius: 14
    },
    desc: {
        fontSize: 12
    }
})