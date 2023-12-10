import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import ProductController, { Product } from '../../../classes/product'
import { router, useLocalSearchParams } from 'expo-router'
import { Confirm, Notify } from '../../../components/Window'
import DiscountController from '../../../classes/discount'
import { Body, Box, Button, Picker, PickerItem, ScrollView, Separator, Text, TextField, Toggle } from '../../../components/Themed'
import Url from '../../../constants/Url'

export default function EditDiscountScreen() {
    const { discountId } = useLocalSearchParams<{ discountId: string }>()
    const [products, setProducts] = useState<(Product & { checked?: boolean })[]>([])
    const [data, setData] = useState({
        name: '',
        desc: '',
        discountPercent: 0,
        active: false
    })

    useEffect(() => {
        DiscountController.getDiscount(Number(discountId)).then(discount => setData({ name: discount.name, desc: discount.desc, discountPercent: discount.discountPercent, active: discount.active }))
        ProductController.getProducts().then(products => {
            const productsChecked = products.map(product => ({ ...product, checked: product.discountId === Number(discountId) ? true : false }))
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

    const handleDelete = async () => {
        Confirm({ title: '¿Confirma eliminar el descuento?', desc: 'Esta acción no se puede deshacer', action: () => {DiscountController.deleteDiscount(Number(discountId)), Notify({ title: 'Descuento eliminado', desc: 'Descuentos actualizados' }), router.replace('/offers')} })
    }

    const handleSubmit = async () => {
        const selectedProducts = products.filter(product => product.checked)

        try {
            DiscountController.updateDiscount(Number(discountId), data.name, data.desc, data.discountPercent, data.active, selectedProducts)
            Notify({ title: 'Descuento actualizado', desc: 'Descuentos actualizados' })
            router.replace('/offers')
        } catch (error) {
            Notify({ title: 'Descuento no actualizado', desc: 'Revise los datos' })
        }
    }

    return (
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
            <Box header='PRODUCTOS' footer='Aplique el descuento en los productos seleccionados. Si el producto ya tiene un descuento, se reemplazará con este descuento a aplicar.'>
                {products ? products.map(product => (
                    <View key={product.id}>
                        <View style={styles.listItem} >
                            <View style={styles.itemProd}>
                                <Image style={styles.image} source={{ uri: `${Url.api}/${product.image.replace(/\\/g, '/')}` }} />
                                <View>
                                    <Text>{product.name}</Text>
                                    {product.discountId > 1 ? <Text style={styles.desc} tint>{product.discountId === Number(discountId) ? 'Con este descuento' : 'Con otro descuento'}</Text> : <Text style={styles.desc} secondary>Sin descuento</Text>}
                                </View>
                                
                            </View>
                            <Toggle value={product.checked} onValueChange={() => handleToggleChange(product.id)}  />
                        </View>
                        <Separator />
                    </View>
                )) : <Text>Cargando...</Text>}
            </Box>
            <View style={styles.buttonGrouped}>
                <Button secondary action='Eliminar' onPress={handleDelete} />
                <Button action='Guardar' onPress={handleSubmit}/>
            </View>
            
        </Body>
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
    },
    buttonGrouped: {
        flexDirection: 'row',
        gap: 16
    }
})