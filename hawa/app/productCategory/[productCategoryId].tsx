import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import ProductCategoryController, { ProductCategory } from '../../classes/productCategory'
import { Body, ScrollView, Text } from '../../components/Themed'
import { VerticalList } from '../../components/List'

export default function CategoryScreen() {
    const { productCategoryId } = useLocalSearchParams<{ productCategoryId: string }>()
    const [productCategory, setProductCategory] = useState<ProductCategory>()

    useEffect(() => {
        ProductCategoryController.getProductCategory(Number(productCategoryId)).then(productCategory => setProductCategory(productCategory))
    }, [])

    return (
        <Body>
            {productCategory ?
                <VerticalList title={productCategory.name} desc={productCategory.desc} items={productCategory.products} link='Editar' href={`/productCategory/edit/${productCategory.id}`} key={productCategory.id} />
            :
                <Text>Cargando...</Text>
            }
        </Body>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      gap: 16
    }
})