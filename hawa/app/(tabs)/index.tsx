import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { Body, Text } from '../../components/Themed'
import { HorizontalList } from '../../components/List'
import ProductCategoryController, { ProductCategory } from '../../classes/productCategory'

export default function TabOneScreen() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>()

  useEffect(() => {
    ProductCategoryController.getProductCategories().then(productCategories => setProductCategories(productCategories))
  }, [])

  return (
    <Body>
      {productCategories ? productCategories?.map((productCategory) => (
        <HorizontalList title={productCategory.name} items={productCategory.products} link={'Ver los ' + productCategory.products.length} href={`/productCategory/${productCategory.id}`} key={productCategory.id} />
      )) : <Text>Cargando...</Text>}
    </Body>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  }
});
