import { Stack, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Body, Box, Button, Picker, PickerItem, TrailingButton } from '../../components/Themed'
import PaymentTypeController, { PaymentType } from '../../classes/paymentType'
import { Notify } from '../../components/Window'
import { useUser } from '../../context/UserContext'
import OrderDetailController from '../../classes/orderDetail'
import ShoppingSessionController, { ShoppingSession } from '../../classes/shoppingSession'

export default function CreatePaymentDetailScreen() {
    const { user, setUser } = useUser()

    const [data, setData] = useState({
        voucher: '',
        paymentTypeId: 1
    })

    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>()

    useEffect(() => {
        PaymentTypeController.getPaymentTypes().then(paymentTypes => setPaymentTypes(paymentTypes))
    }, [])

    const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

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
            Notify({ title: 'Error al subir el voucher', desc: 'Intente nuevamente' })
        }
    }

    const handleChange = (field: keyof typeof data, isNumber?: boolean) => (value: string) => {
        setData(prevData => ({
          ...prevData, [field]: isNumber ? Number(value) : value
        }))
    }

    const handleSubmit = async () => {
        try {
            if (user && image) {
                const formData = new FormData()

                formData.append('userId', user.id.toString())
                formData.append('paymentTypeId', data.paymentTypeId.toString())

                const voucherName = image?.fileName ||'defaultVoucherName.jpg'

                if (image?.uri && voucherName) {
                    const response = await fetch(image?.uri)
                    const blob = await response.blob()
                    formData.append('voucher', blob, voucherName)
                }

                await OrderDetailController.transferCartToOrder(formData)

                const updatedSession = await ShoppingSessionController.getShoppingSessionForUser(user.id)
                console.log(updatedSession)
                setUser({ ...user, session: updatedSession })

                Notify({ title: 'Orden pagada', desc: 'Comprobante de pago enviado' })
                router.replace('/')
            } else {
                Notify({ title: 'Datos inválidos', desc: 'Revise los datos' })
            }
        } catch (error) {
            Notify({ title: 'Orden no pagado', desc: 'Revise los datos' })
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Detalles de pago', presentation: 'formSheet', headerTitleAlign: 'center', headerRight: () => <TrailingButton onPress={handleSubmit} label='Ordenar' /> }} />
            <Body>
                <Box header='MÉTODO DE PAGO' footer='Aceptamos pagos a través de Yape y Plin. Verifique que el propietario de la cuenta esté registrado a nombre de la empresa Bambino.'>
                    <Picker selectedValue={data.paymentTypeId} onValueChange={(selectedValue: unknown) => handleChange('paymentTypeId', true)(selectedValue as string)}>
                        {paymentTypes?.map(paymentType => (
                            <PickerItem label={`${paymentType.paymentType} · ${paymentType.accountNo}`} value={paymentType.id} key={paymentType.id} />
                        ))}
                    </Picker>
                </Box>
                <Box header='COMPROBANTE DE PAGO' footer='Asegúrese de que el comprobante refleje el monto total de la compra, sin reembolsos por exceso ni completar pagos insuficientes.'>
                    <Image source={image ? { uri: image.uri } : require('../../assets/images/payment-receipt.png') } style={styles.image} />
                    <Button action={data.voucher ? 'Cambiar voucher' : 'Seleccionar voucher'} onPress={pickImage} secondary/>
                </Box>
            </Body>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 256,
        borderRadius: 26,
        marginTop: 16,
        alignSelf: 'center'
    }
})