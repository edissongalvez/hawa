import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { Body, Box, Button, ScrollView, Separator, TextField } from '../../components/Themed'
import { router } from 'expo-router'
import { Notify } from '../../components/Window'
import axios from 'axios'
import { useUser } from '../../context/UserContext'

export default function CreateUserScreen() {
    const [data, setData] = useState({
        username: '',
        password: '',
        image: '',
        firstName: '',
        lastName: ''
    })

    const { user } = useUser()

    const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

    useEffect(() => {
        setData({ username: user?.username || '',  password: '', image: user?.image || '', firstName: user?.firstName || '', lastName: user?.lastName || ''  })
    }, [])

    const handleChange = (field: any) => (value: any) => {
        setData((prevData) => ({
          ...prevData, [field]: value
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

            formData.append('username', data.username)
            formData.append('password', data.password)
            
            const fileName = image?.fileName || user?.image

            if (image?.uri && fileName) {
                const response = await fetch(image?.uri)
                const blob = await response.blob()
                formData.append('image', blob, fileName)
            }

            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)

            await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/user/${user?.id}`, formData, { headers: {'Content-Type': 'multipart/form-data'} })
            router.push('/account')
            Notify ({ title: 'Cuenta actualizada', desc: 'Se han guardado los cambios' })
        } catch (error) {
            Notify({ title: 'Cuenta no actualizada', desc: 'Revise los datos' })
        }
    }

    return (
        <Body center>
            <Box>
                <Image source={image ? { uri: image.uri } : { uri: `${process.env.EXPO_PUBLIC_API_URL}/${data.image.replace(/\\/g, '/')}` } } style={styles.image} />
                <Button action={data.image ? 'Cambiar foto' : 'Seleccionar foto'} onPress={pickImage} secondary/>
                <Separator />
                <TextField placeholder='Ingrese usuario' value={data.username} onChangeText={handleChange('username')} />
                <Separator />
                <TextField placeholder='Ingrese contraseña' value={data.password} onChangeText={handleChange('password')} secureTextEntry={true} />
                <Separator />
                <TextField placeholder='Ingrese nombre' value={data.firstName} onChangeText={handleChange('firstName')} />
                <Separator />
                <TextField placeholder='Ingrese apellido' value={data.lastName} onChangeText={handleChange('lastName')} />
            </Box>
            <View style={styles.buttonGroup}>
                <Button action='Actualizar cuenta' onPress={handleSubmit} />
            </View>
        </Body>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        height: '100%',
        justifyContent: 'center',
        gap: 16
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8
    },
    image: {
        width: 128,
        height: 128,
        borderRadius: 26,
        marginTop: 16,
        alignSelf: 'center'
    }
})