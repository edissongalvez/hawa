import { useState } from 'react'
import { Alert, Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { Body, Box, Button, ScrollView, Separator, TextField } from '../../components/Themed'
import ProductCategoryController from '../../classes/productCategory'

export default function CreateProductCategoryScreen() {
  const [data, setData] = useState({
    name: '',
    desc: ''
  })

  const handleChange = (field: any) => (value: any) => {
    setData((prevData) => ({
      ...prevData, [field]: value
    }))
  }

  const handleSubmit = () => {
    if (data.name === '' && data.desc === '') {
      Platform.OS === 'web' ? alert('Categoría no creada') : Alert.alert('Categoría no registrada', 'Revise los datos')
    } else {
      ProductCategoryController.createProductCategory(data.name, data.desc)
      Platform.OS === 'web' ? confirm('Categoría registrada') : Alert.alert('Categoría registrada', 'Puede verlo en Orden')
    }
  }

  return (
    <Body>
      <Box footer='Una vez creada la categoría, podrás agregar productos cuando crees o edites productos.'>
        <TextField placeholder='Ingrese nombre' value={data.name} onChangeText={handleChange('name')} />
        <Separator />
        <TextField placeholder='Ingrese descripción' value={data.desc} onChangeText={handleChange('desc')} multiline={true} numberOfLines={1} />
      </Box>
      <Button action='Guardar' onPress={handleSubmit} />

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