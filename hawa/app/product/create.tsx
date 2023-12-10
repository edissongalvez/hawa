import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Body, Box, Button, Picker, PickerItem, ScrollView, Separator, TextField } from '../../components/Themed'
import ProductCategoryController, { ProductCategory } from '../../classes/productCategory'
import DiscountController, { Discount } from '../../classes/discount'
import { router } from 'expo-router'
import { Notify } from '../../components/Window'
import axios from 'axios'
import Url from '../../constants/Url'

export default function CreateProductScreen() {
    const [categories, setCategories] = useState<ProductCategory[]>()
    const [discounts, setDiscounts] = useState<Discount[]>()
    const [data, setData] = useState({
        name: '',
        desc: '',
        image: '',
        categoryId: 1,
        quantity: 0,
        price: 0,
        discountId: 1
    })

    const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

    useEffect(() => {
        ProductCategoryController.getProductCategories().then(categories => setCategories(categories))
        DiscountController.getDiscounts().then(discounts => setDiscounts(discounts))
    }, [])

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: string) => {
        setData(prevData => ({
          ...prevData, [field]: isNumber ? Number(value) : value
        }))
    }

    const pickImage = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })

            if (!response.canceled) {
                setImage(response.assets[0])
            }
        } catch (error) {
            Notify({ title: 'Error al subir la imagen', desc: 'Intente nuevamente' })
        }
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()

            formData.append('name', data.name)
            formData.append('desc', data.desc)

            const fileName = image?.fileName || 'defaultImageFileName.jpg'

            if (image?.uri && fileName) {
                const response = await fetch(image?.uri)
                const blob = await response.blob()
                formData.append('image', blob, fileName)
            }

            formData.append('categoryId', data.categoryId.toString())
            formData.append('quantity', data.quantity.toString())
            formData.append('price', data.price.toString())
            formData.append('discountId', data.discountId.toString())

            await axios.post(`${Url.api}/product`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

            Notify({ title: 'Producto registrado', desc: 'Orden actualizado' })
            router.replace('/')
        } catch (error) {
            Notify({ title: 'Producto no registrado', desc: 'Revise los datos' })
        }
    }
 
    return (
        <Body>
            <Box header='PRODUCTO' footer='Identifica y presenta tu producto de manera clara y atractiva.'>
                <Image source={image ? { uri: image.uri } : require('../../assets/images/icon.png') } style={styles.image} />
                <Button action={data.image ? 'Cambiar imagen' : 'Seleccionar imagen'} onPress={pickImage} secondary/>
                <Separator />
                <TextField placeholder='Ingrese nombre' value={data.name} onChangeText={handleChange('name')} />
                <Separator />
                <TextField placeholder='Ingrese descripción' value={data.desc} onChangeText={handleChange('desc')} />
                <Separator />
                <TextField placeholder='Ingrese precio' inputMode='decimal' value={data.price > 0 ? data.price.toString() : ''} onChangeText={handleChange('price', true)} />
            </Box>
            <Box header='INVENTARIO' footer='Maneja la disponibilidad física del producto en el inventario.'>
                <TextField placeholder='Ingrese cantidad' inputMode='numeric' value={data.quantity > 0 ? data.quantity.toString() : ''} onChangeText={handleChange('quantity', true)} />
            </Box>
            <Box header='CATEGORÍA' footer='Facilita la búsqueda y navegación organizando productos en categorías.'>
                <Picker selectedValue={data.categoryId} onValueChange={(selectedValue: unknown) => handleChange('categoryId', true)(selectedValue as string)}>
                    {categories?.map((category) => (
                        <PickerItem label={category.name} value={category.id} key={category.id} />
                    ))}
                </Picker>
            </Box>
            <Box header='DESCUENTO' footer='Aplica descuentos especiales al producto si es necesario.'>
                <Picker selectedValue={data.discountId} onValueChange={(selectedValue: unknown) => handleChange('discountId', true)(selectedValue as string)}>
                    {discounts?.map((discount) => (
                        <PickerItem label={discount.name} value={discount.id} key={discount.id} />
                    ))}
                </Picker>
            </Box>
            <Button action='Guardar' onPress={handleSubmit} />
        </Body>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      gap: 16
    },
    image: {
        width: 128,
        height: 128,
        borderRadius: 26,
        marginTop: 16,
        alignSelf: 'center'
    }
})