import { Image, StyleSheet, View } from 'react-native'

import { Body, Box, Button, Separator, Text } from '../../components/Themed'
import { useUser } from '../../context/UserContext'
import { Link, router } from 'expo-router'
import { BoxItem } from '../../components/List'
import Header from '../../components/Header'
import Url from '../../constants/Url'

export default function TabThreeScreen() {
    const { user } = useUser()

    return (
        <Body>
            {user ? 
                <>
                    <Header title={`Hola, ${user.firstName} ${user.lastName}`} />
                    <Image style={styles.image} source={{ uri: `${Url.api}/${user.image.replace(/\\/g, '/')}` }} />
                    <Box>
                        <BoxItem name='Usuario' value={user.username} />
                        <Separator />
                        <BoxItem name='Nombre' value={user.firstName} />
                        <Separator />
                        <BoxItem name='Apellido' value={user.lastName} />
                    </Box>
                    <Button secondary action='Editar cuenta' onPress={() => router.push('/user/edit')}/>

                    <Box header='MÉTODOS DE PAGO' footer='Se aceptan tarjetas de crédito, débito y otras formas seguras de pago para realizar transacciones en la aplicación.'>
                        { user.payments ? user.payments.map(payment => <View key={payment.id}><BoxItem  name={`${payment.paymentType} - ${payment.provider}`} value={payment.accountNo} /><Separator /></View>) : null }
                    </Box>
                    <Button secondary action='Agregar método de pago'/>
                    <Box header='DIRECCIONES' footer='Indica las direcciones donde deseas recibir tus pedidos, asegurándote de proporcionar la ubicación más conveniente para garantizar una entrega eficiente.'>
                        { user.addresses ? user.addresses.map(address => <View key={address.id}><BoxItem name={`${address.addressLine} - ${address.telephone}`} value={address.postalCode} /><Separator /></View>) : null }
                    </Box>

                    <Button secondary action='Agregar dirección'/>
                    
                </>  
            :
                <Text>Para usar Hawa, <Link href={'/user/login'}><Text tint>inicie sesión</Text></Link></Text>
            }
            
        </Body>
    )
}

const styles = StyleSheet.create({
    groupedButton: {
        flexDirection: 'row',
        gap: 16
    },
    image: {
        height: 128,
        width: 128,
        borderRadius: 64,
        alignSelf: 'center'
    }
})