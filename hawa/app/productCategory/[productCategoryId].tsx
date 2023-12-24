import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'

import ProductCategoryController, { ProductCategory } from '../../classes/productCategory'
import { Body, ScrollView, Text, TrailingButton } from '../../components/Themed'
import { VerticalList } from '../../components/List'
import { useUser } from '../../context/UserContext'

export default function CategoryScreen() {
    const { user } = useUser()
    const { productCategoryId } = useLocalSearchParams<{ productCategoryId: string }>()
    const [productCategory, setProductCategory] = useState<ProductCategory>()

    useEffect(() => {
        ProductCategoryController.getProductCategory(Number(productCategoryId)).then(productCategory => setProductCategory(productCategory))
    }, [productCategoryId])

    return productCategory ?
        <>
            <Stack.Screen options={{ title: 'Categoría', presentation: 'card', headerTitleAlign: 'center', headerRight: () => user?.adminUser ? <TrailingButton onPress={() => router.push(`/productCategory/edit/${productCategory.id}`)} label='Editar' /> : null }} />
            <Body>
                <VerticalList title={productCategory.name} desc={productCategory.desc} items={productCategory.products} key={productCategory.id} />
            </Body>
        </>
    :
    <Text>Cargando...</Text>

}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      gap: 16
    }
})