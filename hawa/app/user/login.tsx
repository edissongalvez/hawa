import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { router } from 'expo-router'

import { Notify } from '../../components/Window'
import { Body, Box, Button, ScrollView, Separator, Text, TextField } from '../../components/Themed'
import UserController, { User } from '../../classes/user'
import { useUser } from '../../context/UserContext'

export default function LoginScreen() { 
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const { setUser } = useUser()

    const handleChange = (field: any) => (value: any) => {
        setData((prevData) => ({
          ...prevData, [field]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            const user = await UserController.login(data.username, data.password)

            if (user) {
                setUser(user)
                router.push('/')
                Notify({ title: 'Autenticado', desc: 'Bienvenido' })
            } else {
                Notify({ title: 'No autenticado', desc: 'Revise las credenciales' })
            }
            
        } catch (error) {
            Notify({ title: 'Error en la autenticación', desc: 'Vuelva a intentarlo' })
        }
    }

    return (
        <Body center>
            <View style={styles.content}>
                <Image source={require('../../assets/images/icon.png')} style={styles.image} />
                <Box>
                    <TextField placeholder='Usuario' value={data.username} onChangeText={handleChange('username')} />
                    <Separator />
                    <TextField placeholder='Ingrese contraseña' value={data.password} onChangeText={handleChange('password')} secureTextEntry={true} />
                </Box>
                <View style={styles.buttonGroup}>
                    <Button secondary action='Crear cuenta' onPress={() => router.push('/user/create')} />
                    <Button action='Iniciar sesión' onPress={handleSubmit} />
                </View>
            </View>
        </Body>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        height: '100%',
        justifyContent: 'center'
    },
    content: {
        gap: 16,
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