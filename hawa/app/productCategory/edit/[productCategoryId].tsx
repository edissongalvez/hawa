import { useEffect, useState } from 'react'
import { Alert, Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { router, useLocalSearchParams } from 'expo-router'

import { Body, Box, Button, ScrollView, Separator, TextField } from '../../../components/Themed'
import ProductCategoryController from '../../../classes/productCategory'
import { Notify } from '../../../components/Window'


export default function EditProductCategoryScreen() {
    const { productCategoryId } = useLocalSearchParams<{ productCategoryId: string }>()

    const [data, setData] = useState({
        name: '',
        desc: ''
    })

    useEffect(() => {
        ProductCategoryController.getProductCategory(Number(productCategoryId)).then(productCategory => setData({ name: productCategory.name, desc: productCategory.desc }))
    }, [])
    

    const handleChange = (field: any) => (value: any) => {
        setData((prevData) => ({
        ...prevData, [field]: value
        }))
    }

    const handleSubmit = () => {
        if (data.name === '' && data.desc === '') {
            Notify({ title: 'Categoría de producto no actualizada', desc: 'Revise los datos' })
        } else {
            ProductCategoryController.updateProductCategory(Number(productCategoryId), data.name, data.desc)
            Notify({ title: 'Categoría de producto actualizada', desc: 'Orden actualizado' })
            router.replace('/')
        }
    }

    return (
        <Body>
            <Box footer='Una vez editada la categoría, podrás agregar productos cuando crees o edites productos.'>
                <TextField placeholder='Ingrese nombre' value={data.name} onChangeText={handleChange('name')} />
                <Separator />
                <TextField placeholder='Ingrese descripción' value={data.desc} onChangeText={handleChange('desc')} multiline={true} numberOfLines={1} />
            </Box>
            <Button action='Actualizar' onPress={handleSubmit} />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </Body>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16
    }
})